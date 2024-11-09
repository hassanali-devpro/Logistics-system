import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Divider, InputAdornment, MenuItem, TextField, Typography } from '@mui/material'
import { IconRotateClockwise2 } from '@tabler/icons-react'

import { LabelledColorPicker, LabelledDropdownInput, LabelledOutlinedInput } from '../../shared/components'
import { sendMessageToDynaMaker } from '../../shared/helpers/applicationHelpers'
import { mapEditComponentToZone, mapZoneToDynaMakerComponent } from '../../shared/helpers/warehouseHelpers'
import { FormTypes, WarehouseSetupSteps } from '../../wms-store/constants'
import {
  addObstacle,
  setEditComponent,
  setNavigationState,
  setSubmittedComponentId,
  updateObstacle
} from '../../wms-store/reducers/warehouseReducer'

import { FormInputStyles } from './styles/FormInputStyles'
import { AngleOptions, CreateObsFormInitialState, LayerOptions, obstacleValidationSchema } from './constants'
import { FormSectionHeader } from './FormSectionHeader'

export const CreateObstacle = () => {
  const dispatch = useDispatch()
  const editComponent = useSelector((state: any) => state.warehouse.editComponent)
  const totalObs = useSelector((state: any) => state.warehouse.obstacles?.length)
  const submittedComponentId = useSelector((state: any) => state.warehouse.submittedComponentId)

  const {
    getValues,
    control,
    register,
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(obstacleValidationSchema),
    defaultValues: editComponent === undefined ? CreateObsFormInitialState : mapEditComponentToZone(editComponent)
  })

  useEffect(() => {
    if (editComponent) {
      reset(mapEditComponentToZone(editComponent))
    } else {
      reset(CreateObsFormInitialState)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editComponent])

  useEffect(() => {
    if (submittedComponentId) {
      dispatch(
        setNavigationState({
          step: WarehouseSetupSteps.SetWarehouseComponents,
          isLeftSideBarOpen: true,
          isRightSideBarOpen: false
        })
      )
      if (editComponent) {
        dispatch(setEditComponent(undefined))
        dispatch(updateObstacle(mapZoneToDynaMakerComponent({ id: submittedComponentId, ...getValues() })))
      } else dispatch(addObstacle(mapZoneToDynaMakerComponent({ id: submittedComponentId, ...getValues() })))
      dispatch(setSubmittedComponentId(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submittedComponentId, editComponent])

  const handleCreateObstacle = () => {
    const values = getValues()
    sendMessageToDynaMaker({
      payload: {
        obstacleName: values.name,
        color: { ...values.color },
        layer: Number(values.layer),
        width: Number(values.width),
        depth: Number(values.depth),
        startX: Number(values.xPoint),
        startY: Number(values.yPoint),
        id: editComponent ? editComponent.id : totalObs + 1,
        zoneType: values.zoneType,
        angle: Number(values.angle)
      },
      action: editComponent ? 'editObstacle' : 'addObstacle'
    })
  }

  return (
    <Box height="100%" display="flex" flexDirection="column" justifyContent="space-between">
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="column" gap="8px" p="8px 16px">
          <Typography variant="h6" className="!font-semibold">
            {editComponent === undefined ? 'Create Obstacle' : 'Edit Obstacle'}
          </Typography>

          {editComponent === undefined && (
            <Typography variant="caption">[Instructions - What is an obstacle]</Typography>
          )}
        </Box>

        <Divider />

        <FormSectionHeader heading="1. Starting point" />

        <Box display="flex" gap="8px" p="0px 8px">
          <TextField
            {...register('xPoint')}
            sx={{ ...FormInputStyles.textfieldStyles, ...FormInputStyles.numberInputStyles }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography className="!font-light" variant="caption">
                    X
                  </Typography>
                </InputAdornment>
              )
            }}
            type="number"
            fullWidth
            error={Boolean(errors.xPoint)}
            helperText={errors?.xPoint?.message as string}
          />

          <TextField
            {...register('yPoint')}
            sx={{ ...FormInputStyles.textfieldStyles, ...FormInputStyles.numberInputStyles }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography className="!font-light" variant="caption">
                    Y
                  </Typography>
                </InputAdornment>
              )
            }}
            fullWidth
            type="number"
            error={Boolean(errors.yPoint)}
            helperText={errors?.yPoint?.message as string}
          />

          <TextField
            {...register('angle')}
            sx={{ ...FormInputStyles.dropDownStyles }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconRotateClockwise2 size={16} color="#353A46" />
                </InputAdornment>
              )
            }}
            select
            value={watch('angle')}
            fullWidth>
            {AngleOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}&deg;
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Divider className="!mt-2" />

        <FormSectionHeader heading="2. Obstacle Dimensions" />

        <Box display="flex" flexDirection="column" gap="8px" p="4px 16px">
          <LabelledOutlinedInput
            subLabel="Width"
            gap={1.5}
            value={watch('width')}
            register={register}
            name="width"
            type="number"
            endAdornment="m"
            error={errors?.width?.message as string}
            sx={{ ...FormInputStyles.textfieldStyles, ...FormInputStyles.numberInputStyles }}
          />

          <LabelledOutlinedInput
            subLabel="Depth"
            gap={1.5}
            value={watch('depth')}
            register={register}
            name="depth"
            type="number"
            endAdornment="m"
            error={errors?.depth?.message as string}
            sx={{ ...FormInputStyles.textfieldStyles, ...FormInputStyles.numberInputStyles }}
          />
        </Box>

        <Divider className="!mt-2" />

        <FormSectionHeader heading="3. Obstacle info" />

        <Box display="flex" flexDirection="column" gap="8px" p="4px 16px">
          <LabelledOutlinedInput
            subLabel="Name"
            register={register}
            name="name"
            gap={1.5}
            value={watch('name')}
            error={errors?.name?.message as string}
            sx={FormInputStyles.textfieldStyles}
          />

          <Controller
            name="color"
            control={control}
            render={({ field: { value, onChange } }) => (
              <LabelledColorPicker subLabel="Color" value={value} onChange={onChange} />
            )}
          />

          <LabelledDropdownInput
            subLabel="Layer"
            inputWidth="48px"
            value={watch('layer')}
            options={LayerOptions}
            register={register}
            name="layer"
            sx={FormInputStyles.dropDownStyles}
          />
        </Box>
      </Box>

      <Box p="8px 16px" gap="8px" display="flex" justifyContent="space-between">
        <Button
          onClick={() => {
            dispatch(setEditComponent(undefined))
            dispatch(
              setNavigationState({
                step: WarehouseSetupSteps.SetWarehouseComponents,
                isLeftSideBarOpen: true,
                isRightSideBarOpen: false,
                formType: FormTypes.CreateObstacle
              })
            )
          }}
          variant="outlined">
          Cancel
        </Button>
        <Button variant="contained" disabled={isSubmitting || !isDirty} onClick={handleSubmit(handleCreateObstacle)}>
          {editComponent === undefined ? 'Create' : 'Save'}
        </Button>
      </Box>
    </Box>
  )
}
