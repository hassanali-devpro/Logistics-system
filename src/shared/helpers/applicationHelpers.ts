import { RgbColor } from 'react-colorful'
import { toast } from 'react-toastify'

import { config } from '../../config'
import { WarehouseSetupSteps } from '../../wms-store/constants'
import {
  addBayToRack,
  addObstacle,
  addRack,
  addZone,
  deleteBayFromRack,
  deleteRack,
  removeObstacle,
  removeZone,
  setNavigationState,
  setRackModels,
  setRacks,
  setSubmittedComponentId,
  updateBay,
  updateObstacle,
  updateRack,
  updateZone
} from '../../wms-store/reducers/warehouseReducer'
import { DYNAMAKER_IFRAME_ID, ResponseType, ToastType } from '../constants'

import { parseBay, parseRack, parseRacks } from './warehouseHelpers'

export const apiHeaders = () => {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('authToken') || ''
  }
}

export const sendMessageToDynaMaker = (payload: object) => {
  const dynamakerIframe = document.getElementById(DYNAMAKER_IFRAME_ID) as HTMLIFrameElement

  dynamakerIframe?.contentWindow?.postMessage(JSON.stringify(payload), config.DYNAMAKER_ORIGIN)
}

interface ToastActionPayload {
  type: ToastType
  message: string
}

export const handleReceiveMessage = (event: any, dispatch: any) => {
  // if (event.origin === config.DYNAMAKER_ORIGIN) {
  const {
    data: { action, message }
  } = event

  switch (action) {
    case 'toast': {
      const { type, message: toastMessage } = message as ToastActionPayload
      return toast[type](toastMessage)
    }

    case 'setRackModels': {
      const { rackModels } = message
      return dispatch(setRackModels(rackModels))
    }

    case 'addZone': {
      const { zone } = message
      return dispatch(addZone(zone))
    }

    case 'removeZone': {
      const { id } = message
      return dispatch(removeZone(id))
    }

    case 'updateZone': {
      const { zone } = message
      return dispatch(updateZone(zone))
    }

    case 'addObstacle': {
      const { obstacle } = message
      return dispatch(addObstacle(obstacle))
    }

    case 'updateObstacle': {
      const { obstacle } = message
      return dispatch(updateObstacle(obstacle))
    }

    case 'removeObstacle': {
      const { id } = message
      return dispatch(removeObstacle(id))
    }

    case 'setRacks': {
      const { racks } = message
      return dispatch(setRacks(parseRacks(racks)))
    }

    case 'addRack': {
      const { rack } = message
      return dispatch(addRack(parseRack(rack)))
    }

    case 'updateRack': {
      const { rack } = message
      return dispatch(updateRack(parseRack(rack)))
    }

    case 'addBayToRack': {
      const { rackId, bay } = message
      return dispatch(addBayToRack({ rackId, bay: parseBay(bay) }))
    }

    case 'deleteBayFromRack': {
      const { rackId, bayId } = message
      return dispatch(deleteBayFromRack({ rackId, bayId }))
    }

    case 'deleteRack': {
      const { rackId } = message
      return dispatch(deleteRack(rackId))
    }

    case 'updateBay': {
      const { rackId, bay } = message
      return dispatch(updateBay({ rackId, bay: parseBay(bay) }))
    }

    case 'setRacksTab': {
      return dispatch(
        setNavigationState({
          step: WarehouseSetupSteps.SetWarehouseComponents,
          isLeftSideBarOpen: true,
          isRightSideBarOpen: false,
          currentTab: 1
        })
      )
    }

    case 'setWarehouseComponentsView': {
      message?.rackModels !== undefined && dispatch(setRackModels(message?.rackModels))

      return dispatch(
        setNavigationState({
          step: WarehouseSetupSteps.SetWarehouseComponents,
          isLeftSideBarOpen: true,
          isRightSideBarOpen: false,
          currentTab: 1
        })
      )
    }

    case 'submissionSuccess': {
      const { id } = message
      return dispatch(setSubmittedComponentId(id))
    }
  }
  // }
}

export const rgbToCssString = (color: RgbColor): string => {
  return `rgb(${color.r}, ${color.g}, ${color.b})`
}

export const mapObjectsToOptions = (
  objectsArray: any[],
  valueKey: string,
  labelKey: string
): { label: string; value: any }[] => {
  return objectsArray?.map((obj) => ({
    label: obj[labelKey],
    value: obj[valueKey]
  }))
}

export const errorsToast = (error: string | string[], type: ResponseType) => {
  if (Array.isArray(error)) {
    error.forEach((err) => toast[type](err))
  } else {
    toast[type](error)
  }
}

export const getTotalItems = () => Number(sessionStorage.getItem('totalItems'))

// Helper function to convert base64 image to File
export const dataURLToFile = (dataUrl: string, filename: string): File => {
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)?.[1] || ''
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return str // If the string is empty, return it as-is
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function capitalizeFirstLetterOnly(str: string): string {
  if (!str) return str // If the string is empty, return it as-is
  return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase()
}
