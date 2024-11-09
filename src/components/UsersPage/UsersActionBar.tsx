import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Box, IconButton, Paper } from '@mui/material'
import { IconEdit, IconTrash, IconX } from '@tabler/icons-react'

import { useModalContext } from '../../shared/components'
import { FORM_MODAL } from '../../shared/constants'
import { mapObjectsToOptions } from '../../shared/helpers/applicationHelpers'
import { drawerWidth } from '../NavigationBar/constants'

import { DeleteUsersForm } from './DeleteUsersForm'
import { EditUsersForm } from './EditUsersForm'

export const UsersActionBar = ({
  selectedUsers,
  setSelectedUsers,
  setAllSelected
}: {
  selectedUsers: any[]
  setSelectedUsers: React.Dispatch<React.SetStateAction<any[]>>
  setAllSelected: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const isNavbarOpen = useSelector((state: any) => state.appNavigation.isNavbarOpen)
  const roles = useSelector((state: any) => state.role.activeRoles.roles)

  const { handleOpen, handleClose } = useModalContext()

  const showFloatingBar = selectedUsers.length > 0

  const RoleOptions = useMemo(() => {
    return mapObjectsToOptions(roles, '_id', 'name')
  }, [roles])

  const handleEditClick = () => {
    handleOpen({
      modalType: FORM_MODAL,
      modalProps: {
        fullscreen: false,
        width: 'sm',
        form: (
          <EditUsersForm
            selectedUsers={selectedUsers}
            handleClose={handleClose}
            roleOptions={RoleOptions}
            setSelectedUsers={setSelectedUsers}
          />
        ),
        title: (
          <Box display="flex" alignItems="center" gap="16px">
            <Box p="8px" borderRadius="8px" bgcolor="#F3F4F6">
              <IconEdit size={24} color="#353A46" />
            </Box>

            <Box>Edit Users</Box>
          </Box>
        )
      }
    })
  }

  const handleDeleteClick = () => {
    handleOpen({
      modalType: FORM_MODAL,
      modalProps: {
        fullscreen: false,
        width: 'sm',
        form: (
          <DeleteUsersForm
            selectedUsers={selectedUsers}
            handleClose={handleClose}
            setSelectedUsers={setSelectedUsers}
          />
        ),
        title: (
          <Box display="flex" alignItems="center" gap="16px">
            <Box p="8px" borderRadius="8px" bgcolor="#FEECEC">
              <IconTrash size={24} color="#F53939" />
            </Box>

            <Box>Delete Users</Box>
          </Box>
        )
      }
    })
  }

  return showFloatingBar ? (
    <Box
      component={Paper}
      elevation={3}
      position="absolute"
      bottom={70} // Adjust this value to place it above pagination
      left={isNavbarOpen ? `calc(49% + ${drawerWidth / 2 - 42}px)` : '49%'}
      sx={{
        transform: 'translateX(-50%)'
      }}
      bgcolor="rgba(232, 233, 237, 0.95)"
      zIndex={10}
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      padding="8px"
      gap={2}
      borderRadius="8px">
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton
          onClick={() => {
            setAllSelected(false)
            setSelectedUsers([])
          }}>
          <IconX color="#4F5668" size={20} />
        </IconButton>
        {selectedUsers.length} selected
      </Box>

      <button
        onClick={handleEditClick}
        className="group flex items-center gap-1 bg-white hover:bg-blue-500 text-[#4F5668] font-semibold hover:text-white h-9 px-3 border border-blue-500 hover:border-transparent rounded-lg">
        <IconEdit size={20} color="#4F5668" className="mr-1 group-hover:stroke-white" />
        Edit
      </button>

      <button
        onClick={handleDeleteClick}
        className="group flex items-center gap-1 bg-white hover:bg-[#F53939] text-[#F53939] font-semibold hover:text-white h-9 px-3 border border-[#F53939] hover:border-transparent rounded-lg">
        <IconTrash size={20} color="#F53939" className="mr-1 group-hover:stroke-white" />
        Delete
      </button>
    </Box>
  ) : (
    <></>
  )
}
