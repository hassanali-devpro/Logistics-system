import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { IconCaretDown, IconCaretRight } from '@tabler/icons-react'

import { getAngleFromOrientations } from '../../shared/helpers/warehouseHelpers'
import { RackIcon } from '../../shared/icons'
import { FormTypes, WarehouseSetupSteps } from '../../wms-store/constants'
import {
  setCurrentBayDetails,
  setCurrentRackDetails,
  setDetailsNavCurrentIndex,
  setEditComponent,
  setNavigationState
} from '../../wms-store/reducers/warehouseReducer'

import { RackIconsForAngles } from './constants'

import './styles/NestedListStyles.css'

export const NestedList = ({
  racks,
  listStatus,
  setListStatus
}: {
  racks: any[]
  listStatus: { [key: string]: boolean }
  setListStatus: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean
    }>
  >
}) => {
  const dispatch = useDispatch()

  const [selectedComponentKey, setSelectedComponentKey] = useState<any>()

  const handleListItemClick = (key: string) => {
    setListStatus((prevStatus) => ({
      ...prevStatus,
      [key]: !prevStatus[key]
    }))
  }

  const handleBayClick = (bayDetails: any, rackId: number, rackName: string) => {
    setSelectedComponentKey(bayDetails.id)
    dispatch(setCurrentRackDetails({ id: rackId, name: rackName }))
    dispatch(setCurrentBayDetails(bayDetails))
    dispatch(
      setNavigationState({
        step: WarehouseSetupSteps.SetWarehouseComponents,
        isLeftSideBarOpen: true,
        isRightSideBarOpen: true,
        formType: FormTypes.BayDetails
      })
    )
  }

  const handleRackClick = (rack: any) => {
    setSelectedComponentKey(rack.id)
    dispatch(setCurrentRackDetails({ id: rack.id, name: rack.name }))
    dispatch(
      setEditComponent({
        id: rack.id,
        name: rack.name,
        description: rack.description,
        rackType: rack.rackingSystem,
        modelName: rack.bays[0].model,
        aisleName: rack.bays[0].aisleName,
        width: rack.bays[0].width / 1000,
        xPoint: rack.bays[0].xPoint / 1000,
        yPoint: rack.bays[0].yPoint / 1000,
        vertical: rack.vertical,
        reverse_orientation: rack.reverse_orientation
      })
    )
    dispatch(
      setNavigationState({
        step: WarehouseSetupSteps.SetWarehouseComponents,
        isLeftSideBarOpen: true,
        isRightSideBarOpen: true,
        formType: FormTypes.CreateRack
      })
    )
  }

  const getRackIcon = (angle: number, props: any) => {
    const IconComponent = RackIconsForAngles[`${angle}`]

    return IconComponent ? <IconComponent {...props} /> : <RackIcon />
  }

  return (
    <Box px="8px">
      <List disablePadding>
        {racks?.map((rack) => (
          <Box key={rack.id}>
            <ListItemButton
              key={rack.id}
              className={selectedComponentKey === rack.id ? '!bg-blue-100 !text-blue-700 !pl-1' : '!pl-1'}
              onClick={() => {
                handleListItemClick(rack.id)
                handleRackClick(rack)
              }}>
              <ListItemIcon>
                {listStatus[rack.id] && rack?.bays?.length > 0 ? (
                  <IconCaretDown size={12} color="#8B93A7" fill="#8B93A7" />
                ) : (
                  <IconCaretRight size={12} color="#8B93A7" fill="#8B93A7" />
                )}
                {getRackIcon(getAngleFromOrientations(rack.reverse_orientation, rack.vertical), {
                  size: 16,
                  color: selectedComponentKey === rack.id ? '#1F69FF' : '#353A46'
                })}
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  color: selectedComponentKey === rack.id ? '#1F69FF !important' : '#1A1D23 !important'
                }}
                primary={rack.name}
              />
            </ListItemButton>
            <Collapse in={listStatus[rack.id] && rack.bays.length > 0} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {rack?.bays?.map((bay: any, bayIndex: number) => (
                  <Box key={bay.id}>
                    <ListItemButton
                      key={bay.id}
                      className={selectedComponentKey === bay.id ? '!bg-blue-100 !text-blue-700 !pl-7' : '!pl-7'}
                      onClick={() => {
                        handleListItemClick(bay.id)
                        handleBayClick(bay, rack.id, rack.name)
                        dispatch(setDetailsNavCurrentIndex(bayIndex))
                      }}>
                      <ListItemIcon>
                        {listStatus[bay.id] && bay.levelsArray.length > 0 ? (
                          <IconCaretDown size={12} color="#8B93A7" fill="#8B93A7" />
                        ) : (
                          <IconCaretRight size={12} color="#8B93A7" fill="#8B93A7" />
                        )}
                        <RackIcon stroke={selectedComponentKey === bay.id ? '#1F69FF' : '#353A46'} />
                      </ListItemIcon>
                      <ListItemText
                        primary={bay.name}
                        primaryTypographyProps={{
                          color: selectedComponentKey === bay.id ? '#1F69FF !important' : '#1A1D23 !important'
                        }}
                        secondary={`ID: ${bay.id}`}
                        secondaryTypographyProps={{
                          color: selectedComponentKey === bay.id ? '#1F69FF !important' : '#8B93A7 !important'
                        }}
                      />
                    </ListItemButton>
                  </Box>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Box>
  )
}
