import { useSelector } from 'react-redux'
import { Box } from '@mui/material'

import { FormTypes, WarehouseSetupSteps } from '../../wms-store/constants'

import { BayDetails } from './BayDetails'
import { CreateObstacle } from './CreateObstacle'
import { CreateRack } from './CreateRack'
import { CreateZone } from './CreateZone'
import { LevelDetails } from './LevelDetails'
import { LocationDetails } from './LocationDetails'
import { WarehouseDetails } from './WarehouseDetails'

export const RightSideBar = () => {
  const { step, isRightSideBarOpen, formType } = useSelector((state: any) => state.warehouse.navigationState)

  const getCurrentForm = (formType: FormTypes) => {
    switch (formType) {
      case FormTypes.CreateZone:
        return <CreateZone />
      case FormTypes.WarehouseDetails:
        return <WarehouseDetails />
      case FormTypes.CreateObstacle:
        return <CreateObstacle />
      case FormTypes.CreateRack:
        return <CreateRack />
      case FormTypes.BayDetails:
        return <BayDetails />
      case FormTypes.LevelDetails:
        return <LevelDetails />
      case FormTypes.LocationDetails:
        return <LocationDetails />
      default:
        return <WarehouseDetails />
    }
  }

  return isRightSideBarOpen ? (
    <Box className="overflow-y-auto border-l border-[#E8E9ED]" height="100%" width="20%">
      {step === WarehouseSetupSteps.SetWarehouseComponents ? getCurrentForm(formType) : <></>}
    </Box>
  ) : (
    <></>
  )
}
