import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { IconChevronRight, IconStack } from '@tabler/icons-react'

import { PlainTextField } from '../../shared/components'
import { sendMessageToDynaMaker } from '../../shared/helpers/applicationHelpers'
import { FormTypes, WarehouseSetupSteps } from '../../wms-store/constants'
import {
  setCurrentBayDetails,
  setCurrentLevelDetails,
  setDetailsNavBackIndices,
  setDetailsNavCurrentIndex,
  setNavigationState
} from '../../wms-store/reducers/warehouseReducer'

import { BayDetailsMenu } from './BayDetailsMenu'
import { Rack_BayDetailsSchema } from './constants'
import { DetailsTopNavBar } from './DetailsTopNavBar'

export const BayDetails = () => {
  const dispatch = useDispatch()
  const currentBayDetails = useSelector((state: any) => state.warehouse.currentBayDetails)
  const currentRackDetails = useSelector((state: any) => state.warehouse.currentRackDetails)
  const rackBays = useSelector(
    (state: any) => state.warehouse.racks.find((rack: any) => rack.id === currentRackDetails?.id)?.bays
  )
  const currentIndex = useSelector((state: any) => state.warehouse.detailsNavCurrentIndex)

  const {
    getValues,
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(Rack_BayDetailsSchema),
    defaultValues: { name: currentBayDetails.name, description: currentBayDetails.description }
  })

  const handlePrev = () => {
    dispatch(setDetailsNavCurrentIndex(currentIndex - 1))
    dispatch(setCurrentBayDetails(rackBays[currentIndex - 1]))
  }

  const handleNext = () => {
    dispatch(setDetailsNavCurrentIndex(currentIndex + 1))
    dispatch(setCurrentBayDetails(rackBays[currentIndex + 1]))
  }

  const handleBayNameChange = () => {
    sendMessageToDynaMaker({
      action: 'setBayName',
      payload: { rackId: currentRackDetails.id, bayId: currentBayDetails.id, name: getValues('name') }
    })
  }

  const handleBayDescriptionChange = () => {
    sendMessageToDynaMaker({
      action: 'setBayDescription',
      payload: { rackId: currentRackDetails.id, bayId: currentBayDetails.id, description: getValues('description') }
    })
  }

  useEffect(() => {
    reset({ name: currentBayDetails.name, description: currentBayDetails.description })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBayDetails.name, currentBayDetails.description])

  return (
    <Box>
      <DetailsTopNavBar totalItems={rackBays?.length} handlePrev={handlePrev} handleNext={handleNext} />

      <Box p="8px 16px">
        <Typography variant="subtitle2" color="#4F5668">
          Bay Detail
        </Typography>
      </Box>

      <Box p="16px" display="flex" flexDirection="column" gap="8px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <PlainTextField
            name="name"
            register={register}
            onBlur={handleSubmit(handleBayNameChange)}
            onEnterPress={handleSubmit(handleBayNameChange)}
            fontSize="18px"
            lineHeight="24px"
            fontWeight={600}
            color="#1A1D23"
            error={errors?.name?.message}
          />

          <BayDetailsMenu
            rackBays={rackBays}
            currentRackDetails={currentRackDetails}
            currentBayDetails={currentBayDetails}
          />
        </Box>

        <PlainTextField
          name="description"
          placeholder="Add Description"
          register={register}
          onBlur={handleBayDescriptionChange}
          multiline
          fontSize="12px"
          lineHeight="16px"
          fontWeight={400}
        />

        <Typography variant="caption" color="#8B93A7">
          ID: {currentBayDetails.id}
        </Typography>
      </Box>

      <Divider className="text-[#E8E9ED]" />

      <Box p="8px 8px 8px 16px">
        <Typography variant="caption" className="!font-semibold">
          Bay Model
        </Typography>
      </Box>

      <Box p="8px 16px">
        <Typography variant="subtitle1">{currentBayDetails.model}</Typography>
      </Box>

      <Box p="8px 16px" mb="8px" display="flex" flexDirection="column">
        <Typography variant="caption" color="#8B93A7">
          Dimensions (L x W x H)
        </Typography>
        <Typography variant="subtitle1" color="#353A46">
          {`${currentBayDetails.length / 1000} m x ${currentBayDetails.width / 1000} m x ${currentBayDetails.height / 1000} m`}
        </Typography>
      </Box>

      <Divider className="text-[#E8E9ED]" />

      <Box p="8px 8px 8px 16px">
        <Typography variant="caption" className="!font-semibold" color="#4F5668">
          Levels
        </Typography>
      </Box>

      <List>
        {currentBayDetails.levelsArray.map((level: any, levelIndex: number) => (
          <Box key={level.id}>
            <ListItemButton
              key={level.id}
              onClick={() => {
                dispatch(setCurrentLevelDetails(level))
                dispatch(
                  setNavigationState({
                    step: WarehouseSetupSteps.SetWarehouseComponents,
                    isLeftSideBarOpen: true,
                    isRightSideBarOpen: true,
                    formType: FormTypes.LevelDetails
                  })
                )
                dispatch(setDetailsNavCurrentIndex(levelIndex))
                dispatch(setDetailsNavBackIndices({ bayBackIndex: currentIndex }))
              }}>
              <ListItemIcon>
                <IconStack size={16} color="#353A46" />
              </ListItemIcon>
              <ListItemText primary={level.name} secondary={`ID: ${level.id}`} />
              <IconChevronRight size={16} color="#353A46" />
            </ListItemButton>
          </Box>
        ))}
      </List>
    </Box>
  )
}
