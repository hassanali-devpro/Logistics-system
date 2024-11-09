import { useDispatch, useSelector } from 'react-redux'
import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { IconChevronRight, IconInbox } from '@tabler/icons-react'

import { FormTypes, WarehouseSetupSteps } from '../../wms-store/constants'
import {
  setCurrentLevelDetails,
  setCurrentLocationDetails,
  setDetailsNavBackIndices,
  setDetailsNavCurrentIndex,
  setNavigationState
} from '../../wms-store/reducers/warehouseReducer'

import { DetailsTopNavBar } from './DetailsTopNavBar'

export const LevelDetails = () => {
  const dispatch = useDispatch()
  const currentBayDetails = useSelector((state: any) => state.warehouse.currentBayDetails)
  const currentLevelDetails = useSelector((state: any) => state.warehouse.currentLevelDetails)
  const currentIndex = useSelector((state: any) => state.warehouse.detailsNavCurrentIndex)
  const backIndices = useSelector((state: any) => state.warehouse.detailsNavBackIndices)

  const handlePrev = () => {
    dispatch(setDetailsNavCurrentIndex(currentIndex - 1))
    dispatch(setCurrentLevelDetails(currentBayDetails.levelsArray[currentIndex - 1]))
  }

  const handleNext = () => {
    dispatch(setDetailsNavCurrentIndex(currentIndex + 1))
    dispatch(setCurrentLevelDetails(currentBayDetails.levelsArray[currentIndex + 1]))
  }

  const handleBack = () => {
    dispatch(setDetailsNavCurrentIndex(backIndices.bayBackIndex))
    dispatch(
      setNavigationState({
        step: WarehouseSetupSteps.SetWarehouseComponents,
        isLeftSideBarOpen: true,
        isRightSideBarOpen: true,
        formType: FormTypes.BayDetails
      })
    )
  }

  return (
    <Box>
      <DetailsTopNavBar
        totalItems={currentBayDetails.levels}
        handleBack={handleBack}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />

      <Box p="8px 16px">
        <Typography variant="subtitle2" color="#4F5668">
          Level Detail
        </Typography>
      </Box>

      <Box p="16px" display="flex" flexDirection="column" gap="8px">
        <Typography variant="h6" className="!font-semibold">
          {currentLevelDetails.name}
        </Typography>

        <Typography variant="caption" color="#8B93A7">
          ID: {currentLevelDetails.id}
        </Typography>
      </Box>

      <Divider className="text-[#E8E9ED]" />

      <Box p="8px 8px 8px 16px">
        <Typography variant="caption" className="!font-semibold">
          Level Dimensions
        </Typography>
      </Box>

      <Box p="8px 16px" mb="8px" display="flex" flexDirection="column">
        <Typography variant="caption" color="#8B93A7">
          Dimensions (L x W x H)
        </Typography>
        <Typography variant="subtitle1" color="#353A46">
          {`${currentLevelDetails.length / 1000} m x ${currentLevelDetails.width / 1000} m x ${currentLevelDetails.height / 1000} m`}
        </Typography>
      </Box>

      <Box p="8px 8px 8px 16px">
        <Typography variant="caption" className="!font-semibold" color="#4F5668">
          Locations
        </Typography>
      </Box>

      <List>
        {currentLevelDetails.locationsArray.map((location: any, index: number) => (
          <Box key={location.id}>
            <ListItemButton
              key={location.id}
              onClick={() => {
                dispatch(setCurrentLocationDetails(location))
                dispatch(
                  setNavigationState({
                    step: WarehouseSetupSteps.SetWarehouseComponents,
                    isLeftSideBarOpen: true,
                    isRightSideBarOpen: true,
                    formType: FormTypes.LocationDetails
                  })
                )
                dispatch(setDetailsNavCurrentIndex(index))
                dispatch(setDetailsNavBackIndices({ levelBackIndex: currentIndex }))
              }}>
              <ListItemIcon>
                <IconInbox size={16} color="#353A46" />
              </ListItemIcon>
              <ListItemText primary={location.name} secondary={`ID: ${location.id}`} />
              <IconChevronRight size={16} color="#353A46" />
            </ListItemButton>
          </Box>
        ))}
      </List>
    </Box>
  )
}
