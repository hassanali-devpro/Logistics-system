import React, { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { Box, Button, Checkbox, Typography } from '@mui/material'

import { AvatarWithLabel, CustomOutlinedInput, LoadingButton } from '../../shared/components'
import { useBulkUpdateMutation } from '../../wms-store/services/userService'

import { editUserStatusOptions } from './constants'

import '../../shared/styles/ThinScrollbarStyles.css'

export const EditUsersForm = ({
  selectedUsers,
  handleClose,
  roleOptions,
  setSelectedUsers
}: {
  selectedUsers: any[]
  handleClose: any
  roleOptions: any[]
  setSelectedUsers: React.Dispatch<React.SetStateAction<any[]>>
}) => {
  const [bulkUpdate, { isLoading }] = useBulkUpdateMutation()

  const [editUsers, setEditUsers] = useState(selectedUsers)
  const [role, setRole] = useState<string>('')
  const [status, setStatus] = useState<string>('')

  const handleSelectUser = (event: ChangeEvent<HTMLInputElement>, user: any) => {
    setEditUsers((prevEditUsers) => {
      if (event.target.checked) {
        return [...prevEditUsers, user]
      } else {
        return prevEditUsers.filter((usr) => usr._id !== user._id)
      }
    })
  }

  const handleEditMultipleUsers = (payload: any) => {
    bulkUpdate({
      status: payload.status,
      userRole: payload.role,
      usersArray: payload.editUserIds
    })
      .then((res) => {
        handleClose()
        if (res.data?.status === 1 && res.data?.type !== 'error') {
          toast.success('Users updated successfully')
        } else if (res.data?.type === 'error') {
          toast.error('The selected users could not be updated')
          const successfulUsers = res.data?.data?.filter((usr: any) => usr?.success)

          if (successfulUsers?.length) {
            setSelectedUsers((prevSelectedUsers) =>
              prevSelectedUsers.filter((user) => !successfulUsers.some((usr: any) => usr._id === user._id))
            )
          }
        }
      })
      .catch((err) => console.error(err))
  }

  return (
    <Box>
      <Box mb="8px">
        <CustomOutlinedInput
          heading="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          select
          placeholder="--- Select a role ---"
          name="role"
          options={roleOptions}
        />
      </Box>

      <Box mb="8px">
        <CustomOutlinedInput
          heading="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          select
          name="status"
          options={editUserStatusOptions}
        />
      </Box>

      <Typography variant="body2" mb="8px" color="#353A46">
        The following users will be edited:
      </Typography>

      <Box id="thin-scroll-bar-id" p="4px" maxHeight="30vh" overflow="auto">
        {selectedUsers?.map((user: any) => (
          <Box display="flex" alignItems="center" mb="8px" gap="8px" key={user._id}>
            <Checkbox
              checked={editUsers.some((usr) => usr._id === user._id)}
              onChange={(event) => handleSelectUser(event, user)}
            />

            <AvatarWithLabel
              imgSrc={user?.image}
              label={`${user?.givenName} ${user?.lastName}`}
              subLabel={user?.email}
            />
          </Box>
        ))}
      </Box>

      <Box display="flex" mt="16px" justifyContent="flex-end" gap="12px">
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>

        <LoadingButton
          isLoading={isLoading}
          variant="contained"
          disabled={isLoading || editUsers.length === 0 || (!role && !status)}
          onClick={() => handleEditMultipleUsers({ editUserIds: editUsers.map((user) => user._id), role, status })}>
          Confirm
        </LoadingButton>
      </Box>
    </Box>
  )
}
