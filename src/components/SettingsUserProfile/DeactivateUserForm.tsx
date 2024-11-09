import { useState } from 'react'
import { toast } from 'react-toastify'
import { Box, Button, Checkbox, Typography } from '@mui/material'
import { IconExclamationCircle } from '@tabler/icons-react'

import { CustomOutlinedInput, LoadingButton } from '../../shared/components'
import { useUpdateUserStatusMutation } from '../../wms-store/services/authService'

import { deactivationReasons } from './constants'

export const DeactivateUserForm = ({ handleClose, currentUser }: { handleClose: any; currentUser: any }) => {
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [reason, setReason] = useState('')

  const [updateUserStatus, { isLoading }] = useUpdateUserStatusMutation()

  const handleDeactivate = () => {
    updateUserStatus({ userKey: currentUser?._id, status: 'deactivated' })
      .then((res) => {
        if (res.data.status === 1) {
          handleClose()
          toast.success('User has been deactivated')
        }
      })
      .catch((err) => console.error(err))
  }

  return (
    <Box>
      <Typography mb="16px" variant="body2" color="#353A46">
        Do you really want to deactivate this user account? This action cannot be undone.
      </Typography>

      <CustomOutlinedInput
        heading="Reason"
        isRequired
        select
        options={deactivationReasons}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      <Box mt="16px" display="flex" gap="8px" alignItems="center">
        <Checkbox value={isConfirmed} onChange={(e) => setIsConfirmed(e.target.checked)} />

        <Typography variant="body2" color="#353A46" fontWeight={600}>
          Yes, want to definitely deactivate this user account
        </Typography>
      </Box>

      <Box mt="16px" display="flex" alignItems="center" justifyContent="flex-end" gap="12px">
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>

        <LoadingButton
          variant="contained"
          color="error"
          onClick={handleDeactivate}
          isLoading={isLoading}
          disabled={isLoading || !isConfirmed || !reason}
          startIcon={<IconExclamationCircle />}>
          Deactivate Account
        </LoadingButton>
      </Box>
    </Box>
  )
}
