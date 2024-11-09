import { useDispatch, useSelector } from 'react-redux'
import { Box, Divider, Typography } from '@mui/material'

import { LabelledOutlinedInput } from '../../shared/components'
import { FormTypes, WarehouseSetupSteps } from '../../wms-store/constants'
import {
  setCurrentLocationDetails,
  setDetailsNavCurrentIndex,
  setNavigationState
} from '../../wms-store/reducers/warehouseReducer'

import { DetailsTopNavBar } from './DetailsTopNavBar'

export const LocationDetails = () => {
  const dispatch = useDispatch()
  const currentLevelDetails = useSelector((state: any) => state.warehouse.currentLevelDetails)
  const currentLocationDetails = useSelector((state: any) => state.warehouse.currentLocationDetails)
  const currentIndex = useSelector((state: any) => state.warehouse.detailsNavCurrentIndex)
  const backIndices = useSelector((state: any) => state.warehouse.detailsNavBackIndices)
  const weightFieldStyles = {
    '& .MuiInputBase-root': {
      maxHeight: '28px',
      borderRadius: '4px',
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 400,
      width: '100px',
      minWidth: '100px'
    }
  }

  const handlePrev = () => {
    dispatch(setDetailsNavCurrentIndex(currentIndex - 1))
    dispatch(setCurrentLocationDetails(currentLevelDetails.locationsArray[currentIndex - 1]))
  }

  const handleNext = () => {
    dispatch(setDetailsNavCurrentIndex(currentIndex + 1))
    dispatch(setCurrentLocationDetails(currentLevelDetails.locationsArray[currentIndex + 1]))
  }

  const handleBack = () => {
    dispatch(setDetailsNavCurrentIndex(backIndices.levelBackIndex))
    dispatch(
      setNavigationState({
        step: WarehouseSetupSteps.SetWarehouseComponents,
        isLeftSideBarOpen: true,
        isRightSideBarOpen: true,
        formType: FormTypes.LevelDetails
      })
    )
  }

  return (
    <Box>
      <DetailsTopNavBar
        totalItems={currentLevelDetails.locationsArray?.length}
        handleBack={handleBack}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />

      <Box p="8px 16px">
        <Typography variant="subtitle2" color="#4F5668">
          Location Detail
        </Typography>
      </Box>

      <Box p="16px" display="flex" flexDirection="column" gap="8px">
        <Typography variant="h6" className="!font-semibold">
          {currentLocationDetails.name}
        </Typography>

        <Typography variant="caption" color="#8B93A7">
          ID: {currentLocationDetails.id}
        </Typography>
      </Box>

      <Divider className="text-[#E8E9ED]" />

      <Box p="8px 8px 8px 16px">
        <Typography variant="caption" className="!font-semibold">
          Location Dimensions
        </Typography>
      </Box>

      <Box p="8px 16px" mb="8px" display="flex" flexDirection="column">
        <Typography variant="caption" color="#8B93A7">
          Dimensions (L x W x H)
        </Typography>
        <Typography variant="subtitle1" color="#353A46">
          {`${currentLocationDetails.length / 1000} m x ${currentLocationDetails.width / 1000} m x ${currentLocationDetails.height / 1000} m`}
        </Typography>
      </Box>

      <Box p="8px 16px">
        <LabelledOutlinedInput
          label="Max weight"
          value={currentLocationDetails.weight}
          disabled
          sx={weightFieldStyles}
        />
      </Box>
    </Box>
  )
}
