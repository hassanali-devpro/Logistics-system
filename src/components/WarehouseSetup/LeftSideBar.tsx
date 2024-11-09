import { useSelector } from 'react-redux'
import { Box } from '@mui/material'

import { WarehouseSetupSteps } from '../../wms-store/constants'

import { TOP_NAV_HEIGHT } from './constants'
import { StepOneLeftSideBar } from './StepOneLeftSideBar'

import './styles/LeftSideBarStyles.css'

export const LeftSideBar = () => {
  const { isLeftSideBarOpen, step } = useSelector((state: any) => state.warehouse.navigationState)

  return isLeftSideBarOpen ? (
    <Box
      className="left-sidebar-scrollbar border-r border-[#E8E9ED] overflow-y-auto"
      height={`calc(100vh - ${TOP_NAV_HEIGHT}px)`}
      width="20%">
      <Box p="8px">{step === WarehouseSetupSteps.SetWarehouseComponents ? <StepOneLeftSideBar /> : <></>}</Box>
    </Box>
  ) : (
    <></>
  )
}
