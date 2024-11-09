import React, { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { Box, Button, Checkbox, Typography } from '@mui/material'

import { AvatarWithLabel, LoadingButton } from '../../shared/components'
import { useBulkUpdateMutation } from '../../wms-store/services/userService'

import '../../shared/styles/ThinScrollbarStyles.css'

export const DeleteUsersForm = ({
  selectedUsers,
  handleClose,
  setSelectedUsers
}: {
  selectedUsers: any[]
  handleClose: any
  setSelectedUsers: React.Dispatch<React.SetStateAction<any[]>>
}) => {
  const [bulkUpdate, { isLoading }] = useBulkUpdateMutation()

  const [deleteUsers, setDeleteUserIds] = useState(selectedUsers)

  const handleSelectUser = (event: ChangeEvent<HTMLInputElement>, user: any) => {
    setDeleteUserIds((prevDeleteUsers) => {
      if (event.target.checked) {
        return [...prevDeleteUsers, user]
      } else {
        return prevDeleteUsers.filter((usr) => usr._id !== user._id)
      }
    })
  }

  const handleDeleteMultipleUsers = (userIds: string[]) => {
    bulkUpdate({
      status: 'deleted',
      usersArray: userIds
    })
      .then((res) => {
        handleClose()
        if (res.data?.status === 1 && res.data?.type !== 'error') {
          toast.success('Users deleted successfully')
        } else if (res.data?.type === 'error') {
          toast.error('The selected users could not be deleted')
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
      <Typography variant="body2" mb="8px" color="#353A46">
        The following users will be deleted:
      </Typography>

      <Box id="thin-scroll-bar-id" p="4px" maxHeight="30vh" overflow="auto">
        {selectedUsers?.map((user: any) => (
          <Box display="flex" alignItems="center" mb="8px" gap="8px" key={user._id}>
            <Checkbox
              checked={deleteUsers.some((usr) => usr._id === user._id)}
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
          disabled={isLoading || deleteUsers.length === 0}
          variant="contained"
          color="error"
          onClick={() => handleDeleteMultipleUsers(deleteUsers.map((user) => user._id))}>
          Delete
        </LoadingButton>
      </Box>
    </Box>
  )
}
