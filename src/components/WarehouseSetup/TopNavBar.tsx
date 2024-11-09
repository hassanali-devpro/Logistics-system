import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactSVG } from 'react-svg'
import { Box, Button, IconButton, Tab, Tabs, Typography } from '@mui/material'
import { IconArrowBackUp, IconArrowForwardUp, IconBox, IconSquare } from '@tabler/icons-react'

import { sendMessageToDynaMaker } from '../../shared/helpers/applicationHelpers'
import { InfoIcon } from '../../shared/icons'
import { FormTypes, WarehouseSetupSteps } from '../../wms-store/constants'
import { setNavigationState } from '../../wms-store/reducers/warehouseReducer'

import { TopNavBarStyles } from './styles/TopNavBarStyles'
import { TOP_NAV_HEIGHT } from './constants'

import BlackAndWhiteLogo from '/black_and_white_3d_logo.svg'

export const TopNavBar = () => {
  const [view, setView] = useState(0)
  const step = useSelector((state: any) => state.warehouse.navigationState.step)
  const currentWarehouse = useSelector((state: any) => state.warehouse.currentWarehouse)

  const dispatch = useDispatch()

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setView(newValue)

    if (newValue === 0) sendMessageToDynaMaker({ action: 'set2dView' })
    else sendMessageToDynaMaker({ action: 'set3dView' })
  }

  return (
    <Box
      height={TOP_NAV_HEIGHT}
      gap="12px"
      width="100%"
      paddingX="16px"
      display="flex"
      className="border-b border-[#E8E9ED]"
      alignItems="center"
      justifyContent="space-between">
      <Box display="flex" alignItems="center" gap="16px">
        <ReactSVG src={BlackAndWhiteLogo} />

        <Box display="flex" alignItems="center" gap="8px">
          <Typography variant="h6">{currentWarehouse.name}</Typography>

          <InfoIcon />
        </Box>
      </Box>

      <Box display="flex" alignItems="center" gap="12px">
        <Box display="flex" gap="8px">
          <IconButton onClick={() => sendMessageToDynaMaker({ action: 'undo' })}>
            <IconArrowBackUp size={20} color="#353A46" />
          </IconButton>
          <IconButton onClick={() => sendMessageToDynaMaker({ action: 'redo' })}>
            <IconArrowForwardUp size={20} color="#353A46" />
          </IconButton>
        </Box>
        <Tabs
          value={view}
          variant="fullWidth"
          onChange={handleChange}
          style={TopNavBarStyles().tabs}
          TabIndicatorProps={TopNavBarStyles().tabIndicator}>
          <Tab
            icon={<IconSquare className="!mr-0" size={20} color={view === 0 ? '#1F69FF' : '#4F5668'} />}
            iconPosition="start"
            label="2D"
            style={TopNavBarStyles(0, view).tab}
          />
          <Tab
            icon={<IconBox className="!mr-0" size={20} color={view === 1 ? '#1F69FF' : '#4F5668'} />}
            iconPosition="start"
            label="3D"
            style={TopNavBarStyles(1, view).tab}
          />
        </Tabs>
        {step === WarehouseSetupSteps.SetWarehouseBoundary ? (
          <Button
            variant="contained"
            onClick={() => {
              dispatch(
                setNavigationState({
                  step: WarehouseSetupSteps.SetWarehouseComponents,
                  isLeftSideBarOpen: true,
                  isRightSideBarOpen: false,
                  formType: FormTypes.WarehouseDetails
                })
              )
              sendMessageToDynaMaker({ action: 'finishBoundarySetup' })
            }}>
            Done
          </Button>
        ) : step === WarehouseSetupSteps.SetWarehouseComponents ? (
          <Button
            onClick={() =>
              sendMessageToDynaMaker({
                action: 'saveConfig',
                payload: { whKey: currentWarehouse?._id, authToken: localStorage.getItem('authToken') }
              })
            }
            variant="outlined">
            Save
          </Button>
        ) : (
          <Button variant="contained">Save & Publish</Button>
        )}
      </Box>
    </Box>
  )
}
