import { createSlice } from '@reduxjs/toolkit'

import { ResponseType } from '../../shared/constants'
import { FormTypes } from '../constants'
import { initialState } from '../initialState'
import { warehouseService } from '../services/warehouseService'

// helpers
const closeRightSideBar = (state: any, deletedComponentId: any, deletedRack?: any) => {
  if (deletedRack) {
    // This is to check the case when deleting the last bay results in the deletion of the rack
    if (deletedRack?.id === deletedComponentId && state.navigationState.formType === FormTypes.BayDetails) {
      state.navigationState.isRightSideBarOpen = false
    }
  } else if (
    state.navigationState.formType === FormTypes.BayDetails &&
    state.currentBayDetails?.id === deletedComponentId
  ) {
    state.navigationState.isRightSideBarOpen = false
  } else if (state.editComponent?.id === deletedComponentId) {
    state.navigationState.isRightSideBarOpen = false
    state.editComponent = undefined
  }
}

export const warehouseSlice = createSlice({
  name: 'warehouse',
  initialState: initialState.warehouse,
  extraReducers: (builder) => {
    builder.addMatcher(warehouseService.endpoints.getWarehouses.matchFulfilled, (state, action) => {
      if ((action.payload?.type as ResponseType) === 'success') {
        state.warehouses = action.payload?.data?.warehouse
        sessionStorage.setItem('totalItems', action.payload.data.totalItems)
      }
    })

    builder.addMatcher(warehouseService.endpoints.getWarehouse.matchFulfilled, (state, action) => {
      if ((action.payload?.type as ResponseType) === 'success') {
        state.currentWarehouse = action.payload?.data
      }
    })

    builder.addMatcher(warehouseService.endpoints.getActiveWarehouses.matchFulfilled, (state, action) => {
      if ((action.payload?.type as ResponseType) === 'success') {
        state.activeWarehouses = action.payload?.data?.warehouse
      }
    })

    builder.addMatcher(warehouseService.endpoints.createWarehouse.matchFulfilled, (state, action) => {
      if ((action.payload?.type as ResponseType) === 'success') {
        state.currentWarehouse = action.payload?.data
      }
    })
  },
  reducers: {
    setNavigationState: (state, action) => {
      const { step, isLeftSideBarOpen, isRightSideBarOpen, formType, currentTab } = action.payload
      state.navigationState['step'] = step ?? state.navigationState.step
      state.navigationState['isLeftSideBarOpen'] = isLeftSideBarOpen ?? state.navigationState.isLeftSideBarOpen
      state.navigationState['isRightSideBarOpen'] = isRightSideBarOpen ?? state.navigationState.isRightSideBarOpen
      state.navigationState['formType'] = formType ?? state.navigationState.formType
      state.navigationState['currentTab'] = currentTab ?? state.navigationState.currentTab
    },
    setRackModels: (state, action) => {
      state.rackModels = action.payload
    },
    addObstacle: (state, action) => {
      state.obstacles.push(action.payload)
    },
    updateObstacle: (state, action) => {
      const index = state.obstacles.findIndex((obstacle) => obstacle.id === action.payload.id)

      if (index !== -1) state.obstacles[index] = action.payload
    },
    removeObstacle: (state, action) => {
      if (action.payload) {
        const index = state.obstacles.findIndex((obstacle) => obstacle.id === action.payload)
        if (index !== -1) {
          state.obstacles.splice(index, 1)

          closeRightSideBar(state, action.payload)
        }
      } else state.obstacles.pop()
    },
    clearObstacles: (state) => {
      state.obstacles = []
    },
    addZone: (state, action) => {
      state.zones.push(action.payload)
    },
    updateZone: (state, action) => {
      const index = state.zones.findIndex((zone) => zone.id === action.payload.id)

      if (index !== -1) state.zones[index] = action.payload
    },
    removeZone: (state, action) => {
      if (action.payload) {
        const index = state.zones.findIndex((zone) => zone.id === action.payload)
        if (index !== -1) {
          state.zones.splice(index, 1)

          closeRightSideBar(state, action.payload)
        }
      } else state.zones.pop()
    },
    clearZones: (state) => {
      state.zones = []
    },
    setRacks: (state, action) => {
      state.racks = action.payload
    },
    addRack: (state, action) => {
      state.racks.push(action.payload)
    },
    updateRack: (state, action) => {
      const index = state.racks.findIndex((rack) => rack.id === action.payload.id)
      if (index !== -1) state.racks[index] = action.payload
    },
    addBayToRack: (state, action) => {
      const rackIndex = state.racks.findIndex((rack) => rack.id === action.payload.rackId)
      if (rackIndex !== -1) state.racks[rackIndex].bays.push(action.payload.bay)
    },
    deleteBayFromRack: (state, action) => {
      const rackIndex = state.racks.findIndex((rack) => rack.id === action.payload.rackId)
      if (rackIndex !== -1) {
        if (action.payload.bayId) {
          const bayIndex = state.racks[rackIndex].bays.findIndex((bay: any) => bay.id === action.payload.bayId)
          if (bayIndex !== -1) {
            state.racks[rackIndex].bays.splice(bayIndex, 1)

            closeRightSideBar(state, action.payload.bayId)
          }
        } else state.racks[rackIndex].bays.pop()
      }
    },
    updateBay: (state, action) => {
      const rackIndex = state.racks.findIndex((rack) => rack.id === action.payload.rackId)
      const bayIndex =
        rackIndex !== -1 && state.racks[rackIndex].bays.findIndex((bay: any) => bay.id === action.payload.bay.id)
      if (rackIndex !== -1 && bayIndex !== -1) state.racks[rackIndex].bays[bayIndex] = action.payload.bay
    },
    deleteRack: (state, action) => {
      if (action.payload) {
        const rackIndex = state.racks.findIndex((rack) => rack.id === action.payload)
        if (rackIndex !== -1) {
          const deletedRacks = state.racks.splice(rackIndex, 1)

          closeRightSideBar(state, action.payload, deletedRacks[0])
        }
      } else state.racks.pop()
    },
    setEditComponent: (state, action) => {
      state.editComponent = action.payload
    },
    setWarehouseDetails: (state, action) => {
      state.currentWarehouse['name'] = action.payload['name']
      state.currentWarehouse['address'] = action.payload['address']
      state.currentWarehouse['description'] = action.payload['description']
    },
    setCurrentRackDetails: (state, action) => {
      state.currentRackDetails = action.payload
    },
    setCurrentBayDetails: (state, action) => {
      state.currentBayDetails = action.payload
    },
    setCurrentLevelDetails: (state, action) => {
      state.currentLevelDetails = action.payload
    },
    setCurrentLocationDetails: (state, action) => {
      state.currentLocationDetails = action.payload
    },
    setDetailsNavCurrentIndex: (state, action) => {
      state.detailsNavCurrentIndex = action.payload
    },
    setDetailsNavBackIndices: (state, action) => {
      state.detailsNavBackIndices = { ...state.detailsNavBackIndices, ...action.payload }
    },
    setSubmittedComponentId: (state, action) => {
      state.submittedComponentId = action.payload
    }
  }
})

export const {
  setNavigationState,
  setRackModels,
  addZone,
  updateZone,
  removeZone,
  clearZones,
  addObstacle,
  updateObstacle,
  removeObstacle,
  clearObstacles,
  setRacks,
  addRack,
  updateRack,
  updateBay,
  deleteRack,
  addBayToRack,
  deleteBayFromRack,
  setWarehouseDetails,
  setCurrentRackDetails,
  setCurrentBayDetails,
  setCurrentLevelDetails,
  setCurrentLocationDetails,
  setEditComponent,
  setDetailsNavCurrentIndex,
  setDetailsNavBackIndices,
  setSubmittedComponentId
} = warehouseSlice.actions

export default warehouseSlice.reducer
