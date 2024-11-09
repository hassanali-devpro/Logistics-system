import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { IconAlertTriangle, IconCopy, IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react'

import { useModalContext } from '../../shared/components'
import { CONFIRMATION_MODAL, FORM_MODAL } from '../../shared/constants'
import { sendMessageToDynaMaker } from '../../shared/helpers/applicationHelpers'
import { FormTypes, WarehouseSetupSteps } from '../../wms-store/constants'
import {
  setCurrentBayDetails,
  setDetailsNavCurrentIndex,
  setNavigationState
} from '../../wms-store/reducers/warehouseReducer'

import { createNewBayConfigOption } from './constants'
import { EditBayForm } from './EditBayForm'

export const BayDetailsMenu = ({
  rackBays,
  currentRackDetails,
  currentBayDetails
}: {
  rackBays: any[]
  currentRackDetails: any
  currentBayDetails: any
}) => {
  const dispatch = useDispatch()
  const { handleOpen, handleClose: handleModalClose, handleCloseAll } = useModalContext()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleBayDelete = () => {
    if (rackBays?.length > 1) {
      dispatch(setDetailsNavCurrentIndex(rackBays.length - 2))
      dispatch(setCurrentBayDetails(rackBays[rackBays.length - 2]))
    }

    sendMessageToDynaMaker({
      action: 'deleteBay',
      payload: { rackId: currentRackDetails.id, bayId: currentBayDetails.id }
    })
  }

  const handleDeleteClick = () => {
    handleClose()
    handleOpen({
      modalType: CONFIRMATION_MODAL,
      modalProps: {
        onConfirmation: handleBayDelete,
        fullscreen: false,
        width: 'sm',
        title: 'Delete this bay?',
        body: `Are you sure you want to delete ${currentBayDetails.name} from ${currentRackDetails.name}?`,
        handleClose: handleModalClose,
        okBtnText: 'Delete',
        alertIcon: (
          <Box p="8px" borderRadius="8px" bgcolor="#FFF7E5">
            <IconAlertTriangle size={24} color="#FAA700" />
          </Box>
        )
      }
    })
  }

  const handleBayEdit = () => {
    handleCloseAll()
    dispatch(
      setNavigationState({
        step: WarehouseSetupSteps.SetBayConfiguration,
        isLeftSideBarOpen: false,
        isRightSideBarOpen: false,
        formType: FormTypes.WarehouseDetails
      })
    )
    sendMessageToDynaMaker({
      action: 'setBayConfigView',
      payload: { rackId: currentRackDetails.id, bayId: currentBayDetails.id }
    })
  }

  const handleCreateNewBayConfig = () => {
    handleOpen({
      modalType: FORM_MODAL,
      modalProps: {
        fullscreen: false,
        width: 'sm',
        form: <EditBayForm handleFormSubmit={handleBayEdit} handleCancel={handleModalClose} />,
        title: 'Create New Bay Model'
      }
    })
  }

  const handleEditConfigClick = () => {
    handleOpen({
      modalType: CONFIRMATION_MODAL,
      modalProps: {
        onConfirmation: handleBayEdit,
        fullscreen: false,
        width: 'sm',
        title: 'Warning',
        body: `You are about to edit an existing bay model. If you want to continue, click “Continue Editing”, otherwise cancel and create a new bay model.`,
        handleClose: handleModalClose,
        okBtnText: 'Continue Editing',
        alertIcon: (
          <Box p="8px" borderRadius="8px" bgcolor="#FFF7E5">
            <IconAlertTriangle size={24} color="#FAA700" />
          </Box>
        )
      }
    })
  }

  const handleEditBayFormSubmit = (payload: any) => {
    if (payload.model === createNewBayConfigOption.value) {
      handleCreateNewBayConfig()
    } else {
      handleEditConfigClick()
    }
  }

  const handleEditClick = () => {
    handleClose()
    handleOpen({
      modalType: FORM_MODAL,
      modalProps: {
        fullscreen: false,
        width: 'sm',
        form: (
          <EditBayForm
            handleFormSubmit={handleEditBayFormSubmit}
            handleCancel={handleModalClose}
            edit
            model={currentBayDetails.model}
          />
        ),
        title: 'Edit Bay'
      }
    })
  }

  return (
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
        <MenuItem key="edit-bay" onClick={handleEditClick}>
          <IconEdit className="mr-3" color="#353A46" size={20} />
          <Typography variant="subtitle1" color="#353A46">
            Edit Bay
          </Typography>
        </MenuItem>
        <MenuItem key="duplicate-bay" onClick={handleClose}>
          <IconCopy className="mr-3" color="#353A46" size={20} />
          <Typography variant="subtitle1" color="#353A46">
            Duplicate Bay
          </Typography>
        </MenuItem>
        <MenuItem key="delete-bay" onClick={handleDeleteClick}>
          <IconTrash className="mr-3" color="#F53939" size={20} />
          <Typography variant="subtitle1" color="#F53939">
            Delete Bay
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}
