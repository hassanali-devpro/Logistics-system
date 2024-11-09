import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Box, Divider, Menu, MenuItem, Typography } from '@mui/material'
import { IconEdit, IconMailForward, IconTrash, IconUserCircle } from '@tabler/icons-react'

import { useModalContext } from '../../shared/components'
import { CONFIRMATION_MODAL } from '../../shared/constants'
import { useDeleteUserMutation, useResendInviteMutation } from '../../wms-store/services/userService'

export const UserActionsMenu = ({
  anchorEl,
  handleMenuClose,
  user
}: {
  anchorEl: HTMLElement | null
  handleMenuClose: () => void
  user: any
}) => {
  const navigate = useNavigate()
  const menuOpen = Boolean(anchorEl)
  const [deleteUser] = useDeleteUserMutation()
  const [resendInvite] = useResendInviteMutation()
  const { handleOpen, handleClose } = useModalContext()

  const handleDeleteUser = () => {
    deleteUser(user._id)
      .then((response) => {
        if (response.data?.status === 1) toast.success('User deleted successfully')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleDeleteClick = () => {
    handleMenuClose()
    if (user.userRole === 'admin') {
      toast.warn('Cannot delete user with admin role')
      return
    }

    handleOpen({
      modalType: CONFIRMATION_MODAL,
      modalProps: {
        onConfirmation: handleDeleteUser,
        fullscreen: false,
        width: 'sm',
        title: 'Delete User',
        deleteConfirmation: true,
        body: 'Do you really want to delete this user? This action cannot be undone',
        handleClose: handleClose,
        okBtnText: 'Delete',
        alertIcon: (
          <Box p="8px" borderRadius="8px" bgcolor="#FEECEC">
            <IconTrash size={24} color="#F53939" />
          </Box>
        )
      }
    })
  }

  const handleOpenProfile = () => {
    handleMenuClose()
    navigate('/settings/users/profile', { state: { userKey: user?._id } })
  }

  const handleResendInvite = () => {
    handleMenuClose()
    resendInvite(user._id)
      .then((response) => {
        if (response.data?.status === 1) toast.success('Invitation sent successfully')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={menuOpen}
      slotProps={{ paper: { sx: { width: '280px', borderRadius: '8px', boxShadow: 1 } } }}
      style={{ padding: '8px 16px' }}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      MenuListProps={{
        'aria-labelledby': 'basic-button'
      }}>
      <MenuItem disableRipple className="!cursor-default hover:!bg-inherit" key="menu">
        <Typography variant="caption" color="#8B93A7">
          More options
        </Typography>
      </MenuItem>

      <MenuItem key="view_profile" onClick={handleOpenProfile}>
        <IconUserCircle className="mr-3" color="#353A46" size={20} />

        <Typography variant="subtitle1" color="#353A46">
          View Profile
        </Typography>
      </MenuItem>

      <MenuItem key="edit_profile" onClick={handleOpenProfile}>
        <IconEdit className="mr-3" color="#353A46" size={20} />

        <Typography variant="subtitle1" color="#353A46">
          Edit Profile
        </Typography>
      </MenuItem>

      <MenuItem key="resend_invite" onClick={handleResendInvite}>
        <IconMailForward className="mr-3" color="#353A46" size={20} />

        <Typography variant="subtitle1" color="#353A46">
          Resend invitation
        </Typography>
      </MenuItem>

      <Divider style={{ marginLeft: 16, marginRight: 16 }} />

      <MenuItem key="delete" onClick={handleDeleteClick}>
        <IconTrash className="mr-3" color="#F53939" size={20} />

        <Typography variant="subtitle1" color="#F53939">
          Delete user
        </Typography>
      </MenuItem>
    </Menu>
  )
}
