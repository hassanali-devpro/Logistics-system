import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Typography
} from '@mui/material'
import { IconAlertTriangle, IconCopy, IconDotsVertical, IconRotateClockwise2, IconTrash } from '@tabler/icons-react'

import { LabelledDropdownInput, LabelledOutlinedInput, PlainTextField, useModalContext } from '../../shared/components'
import { CONFIRMATION_MODAL } from '../../shared/constants'
import { mapObjectsToOptions, sendMessageToDynaMaker } from '../../shared/helpers/applicationHelpers'
import { getAngleFromOrientations } from '../../shared/helpers/warehouseHelpers'
import { RackIcon } from '../../shared/icons'
import { FormTypes, WarehouseSetupSteps } from '../../wms-store/constants'
import {
  setCurrentBayDetails,
  setDetailsNavCurrentIndex,
  setNavigationState
} from '../../wms-store/reducers/warehouseReducer'

import { FormInputStyles } from './styles/FormInputStyles'
import {
  AngleOptions,
  AngleOptionsWithIcons,
  getCreateRackFormInitialState,
  Rack_BayDetailsSchema,
  RackSystemTypes,
  rackValidationSchema
} from './constants'
import { FormSectionHeader } from './FormSectionHeader'

export const CreateRack = () => {
  const dispatch = useDispatch()
  const { handleOpen, handleClose: handleModalClose } = useModalContext()
  const rackModels = useSelector((state: any) => state.warehouse.rackModels)
  const editComponent = useSelector((state: any) => state.warehouse.editComponent)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const rackBays = useSelector(
    (state: any) => state.warehouse.racks.find((rack: any) => rack.id === editComponent?.id)?.bays
  )

  const RackModelOptions = useMemo(() => {
    return mapObjectsToOptions(rackModels, 'id', 'model')
  }, [rackModels])

  const mapEditComponentToRack = (editComponent: any) => {
    return {
      ...editComponent,
      rackModel: RackModelOptions.find((model: any) => model.label === editComponent.modelName)?.value,
      angle: getAngleFromOrientations(editComponent.reverse_orientation, editComponent.vertical)
    }
  }

  const {
    getValues,
    register,
    setValue,
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors, dirtyFields, isDirty }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(editComponent ? rackValidationSchema.concat(Rack_BayDetailsSchema) : rackValidationSchema),
    defaultValues:
      editComponent === undefined
        ? {
            ...getCreateRackFormInitialState(RackModelOptions)
          }
        : {
            ...mapEditComponentToRack(editComponent)
          }
  })

  const handleCreateRack = () => {
    if (editComponent) {
      const values = getValues()
      const payload = {
        name: dirtyFields.name ? values.name : undefined,
        description: dirtyFields.description ? values.description : undefined,
        rackModelId: dirtyFields.rackModel ? values.rackModel : undefined,
        aisleName: dirtyFields.aisleName ? values.aisleName : undefined,
        width: dirtyFields.width ? Number(values.width) : undefined,
        startX: dirtyFields.xPoint ? Number(values.xPoint) * 1000 : undefined,
        startY: dirtyFields.yPoint ? Number(values.yPoint) * 1000 : undefined,
        rackingSystem: dirtyFields.rackType ? values.rackType : undefined,
        vertical: dirtyFields.angle ? values.angle === 90 || values.angle === 270 : undefined,
        reverse_orientation: dirtyFields.angle ? values.angle === 180 || values.angle === 270 : undefined
      }

      sendMessageToDynaMaker({
        payload: {
          id: editComponent?.id,
          ...payload
        },
        action: 'editRack'
      })
    } else {
      const values = getValues()
      sendMessageToDynaMaker({
        payload: {
          rackModelId: values.rackModel,
          aisleName: values.aisleName,
          width: Number(values.width),
          startX: Number(values.xPoint) * 1000,
          startY: Number(values.yPoint) * 1000,
          rackingSystem: values.rackType,
          vertical: values.angle === 90 || values.angle === 270,
          reverse_orientation: values.angle === 180 || values.angle === 270
        },
        action: 'addRack'
      })
    }
  }

  const handleBayClick = (bayDetails: any) => {
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleRackDelete = () => {
    sendMessageToDynaMaker({
      action: 'deleteRack',
      payload: { rackId: editComponent?.id }
    })
  }

  const handleDeleteClick = () => {
    handleClose()
    handleOpen({
      modalType: CONFIRMATION_MODAL,
      modalProps: {
        onConfirmation: handleRackDelete,
        fullscreen: false,
        width: 'sm',
        title: 'Delete this rack?',
        body: `Are you sure you want to delete ${watch('name')}?`,
        handleClose: handleModalClose,
        okBtnText: 'Delete',
        deleteConfirmation: true,
        alertIcon: (
          <Box p="8px" borderRadius="8px" bgcolor="#FFF7E5">
            <IconAlertTriangle size={24} color="#FAA700" />
          </Box>
        )
      }
    })
  }

  useEffect(() => {
    if (editComponent) {
      reset({
        ...mapEditComponentToRack(editComponent)
      })
    } else {
      reset(getCreateRackFormInitialState(RackModelOptions))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editComponent, RackModelOptions])

  return (
    <Box height="100%" display="flex" flexDirection="column" justifyContent="space-between">
      <Box display="flex" flexDirection="column">
        {editComponent ? (
          <Box>
            <Box p="8px 16px">
              <Typography variant="subtitle2">Rack Detail</Typography>
            </Box>

            <Box p="16px" display="flex" flexDirection="column" gap="8px">
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <PlainTextField
                  name="name"
                  register={register}
                  fontSize="18px"
                  lineHeight="24px"
                  fontWeight={600}
                  color="#1A1D23"
                  error={errors?.name?.message}
                />
                <Box>
                  <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
                    <IconDotsVertical color="#8B93A7" size={24} />
                  </IconButton>

                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left'
                    }}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button'
                    }}>
                    <MenuItem key="duplicate-rack" onClick={handleClose}>
                      <IconCopy className="mr-3" color="#353A46" size={20} />
                      <Typography variant="subtitle1" color="#353A46">
                        Duplicate Rack
                      </Typography>
                    </MenuItem>
                    <MenuItem key="delete-rack" onClick={handleDeleteClick}>
                      <IconTrash className="mr-3" color="#F53939" size={20} />
                      <Typography variant="subtitle1" color="#F53939">
                        Delete Rack
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>

              <PlainTextField
                name="description"
                placeholder="Add Description"
                register={register}
                multiline
                fontSize="12px"
                lineHeight="16px"
                fontWeight={400}
              />

              <Typography variant="caption" color="#8B93A7">
                ID: {editComponent?.id}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box p="16px" display="flex" flexDirection="column" gap="8px">
            <Typography variant="h6" className="!font-semibold">
              Rack Generator
            </Typography>

            <Typography variant="caption">
              Add a new rack to your warehouse. Define the starting point, select the racking system, and choose the
              model that will compose this rack.
            </Typography>
          </Box>
        )}

        <Divider />

        <FormSectionHeader heading="1. Bay Model" />

        <Box p="4px 16px">
          <LabelledDropdownInput
            subLabel="Model"
            gap={1.5}
            register={register}
            name="rackModel"
            value={watch('rackModel')}
            disabled={editComponent !== undefined}
            options={RackModelOptions}
            sx={FormInputStyles.dropDownStyles}
          />
        </Box>

        <Divider className="!mt-2" />

        <FormSectionHeader heading="2. Racking system" />

        <Box display="flex" flexDirection="column" gap="8px" p="4px 16px">
          <LabelledDropdownInput
            subLabel="Type"
            gap={1.5}
            value={watch('rackType')}
            options={RackSystemTypes}
            register={register}
            name="rackType"
            sx={FormInputStyles.dropDownStyles}
          />
        </Box>

        <Box display="flex" alignItems="center" justifyContent="space-between" p="4px 16px">
          <Typography variant="caption">Orientation</Typography>

          <Box display="flex" gap="4px">
            {AngleOptionsWithIcons.map(({ angle, Icon }) => (
              <Box
                key={angle}
                onClick={() => setValue('angle', angle)}
                p="4px"
                className={`cursor-pointer border rounded ${watch('angle') === angle ? 'border-[#7AA7FF]' : 'border-[#D1D4DC]'}`}>
                <Icon size={24} color={watch('angle') === angle ? '#1F69FF' : '#354052'} />
              </Box>
            ))}
          </Box>
        </Box>

        <Divider className="!mt-2" />

        <FormSectionHeader heading="3. Aisle" />

        <Box p="4px 16px">
          <LabelledOutlinedInput
            subLabel="Aisle Name"
            register={register}
            name="aisleName"
            gap={1.5}
            error={errors?.aisleName?.message as string}
            sx={FormInputStyles.textfieldStyles}
          />
        </Box>

        <Box p="4px 16px">
          <LabelledOutlinedInput
            subLabel="Width"
            gap={1.5}
            register={register}
            name="width"
            type="number"
            endAdornment="m"
            disabled={editComponent !== undefined}
            error={errors?.width?.message as string}
            sx={{
              ...FormInputStyles.numberInputStyles,
              ...FormInputStyles.widthInputStyles
            }}
          />
        </Box>

        <Divider className="!mt-2" />

        <FormSectionHeader heading="4. Position" />

        <Box display="flex" gap="8px" p="4px 16px">
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
              ),
              endAdornment: (
                <InputAdornment position="start">
                  <Typography className="!font-light" variant="caption">
                    m
                  </Typography>
                </InputAdornment>
              )
            }}
            type="number"
            fullWidth
            disabled={editComponent !== undefined}
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
              ),
              endAdornment: (
                <InputAdornment position="start">
                  <Typography className="!font-light" variant="caption">
                    m
                  </Typography>
                </InputAdornment>
              )
            }}
            fullWidth
            disabled={editComponent !== undefined}
            type="number"
            error={Boolean(errors.yPoint)}
            helperText={errors?.yPoint?.message as string}
          />

          <TextField
            // {...register('angle')}
            sx={{ ...FormInputStyles.dropDownStyles }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconRotateClockwise2 size={16} color="#353A46" />
                </InputAdornment>
              )
            }}
            select
            disabled
            value={watch('angle')}
            fullWidth>
            {AngleOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}&deg;
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {editComponent && (
          <Box>
            <Divider className="!mt-2" />

            <FormSectionHeader heading="5. Area" />

            <Typography className="!mx-4 !my-2" variant="subtitle1">
              Not inside an area
            </Typography>
          </Box>
        )}

        {editComponent && (
          <Box>
            <Divider className="!my-2" />

            <FormSectionHeader heading="6. Bays" />

            <List component="div" disablePadding>
              {rackBays?.map((bay: any, index: number) => (
                <Box key={bay.key}>
                  <ListItemButton
                    key={bay.key}
                    onClick={() => {
                      handleBayClick(bay)
                      dispatch(setDetailsNavCurrentIndex(index))
                    }}>
                    <ListItemIcon>
                      <RackIcon stroke="#353A46" />
                    </ListItemIcon>
                    <ListItemText
                      primary={bay.name}
                      primaryTypographyProps={{
                        color: '#1A1D23 !important'
                      }}
                      secondary={`${bay.model}`}
                      secondaryTypographyProps={{
                        color: '#8B93A7 !important'
                      }}
                    />
                  </ListItemButton>
                </Box>
              ))}
            </List>

            <Button
              onClick={() =>
                sendMessageToDynaMaker({
                  payload: {
                    rackId: editComponent?.id
                  },
                  action: 'addBayToRack'
                })
              }
              variant="text"
              className="!ml-4 !mb-4 !mt-2"
              color="primary">
              + Add Bay
            </Button>
          </Box>
        )}
      </Box>

      <Box p="8px 16px" gap="8px" display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          onClick={() =>
            dispatch(
              setNavigationState({
                step: WarehouseSetupSteps.SetWarehouseComponents,
                isLeftSideBarOpen: true,
                isRightSideBarOpen: false,
                formType: FormTypes.WarehouseDetails
              })
            )
          }>
          Cancel
        </Button>
        <Button variant="contained" disabled={isSubmitting || !isDirty} onClick={handleSubmit(handleCreateRack)}>
          {editComponent ? 'Save' : 'Create'}
        </Button>
      </Box>
    </Box>
  )
}
