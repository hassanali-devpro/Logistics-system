import { useSelector } from 'react-redux'
import { Box, Divider, IconButton, Typography } from '@mui/material'
import { createSelector } from '@reduxjs/toolkit'
import { IconAssembly, IconChevronRight, IconEdit } from '@tabler/icons-react'

import { useModalContext } from '../../shared/components'
import { FORM_MODAL } from '../../shared/constants'
import { WarehouseForm } from '../CreateWarehouse/WarehouseForm'

const selectCurrentWarehouse = (state: any) => state.warehouse.currentWarehouse

export const WarehouseDetails = () => {
  const currentWarehouseDetails = createSelector([selectCurrentWarehouse], (currentWarehouse: any) => ({
    name: currentWarehouse.name,
    address: currentWarehouse.address
  }))
  const { name, address } = useSelector(currentWarehouseDetails)
  const { handleOpen, handleClose } = useModalContext()

  return (
    <Box p="8px">
      <Box p="8px 16px">
        <Typography variant="subtitle1" className="!font-semibold">
          Warehouse Details
        </Typography>
      </Box>

      <Divider className="!my-2 text-[#E8E9ED]" />

      <Box p="8px 16px">
        <Typography variant="body1">{name}</Typography>
        <Typography variant="caption">{address}</Typography>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between" gap="8px" p="8px 16px">
        <Box display="flex" alignItems="center" gap="8px">
          <IconEdit size={16} color="#353A46" />
          <Typography variant="subtitle1">Edit information</Typography>
        </Box>

        <IconButton
          onClick={() =>
            handleOpen({
              modalType: FORM_MODAL,
              modalProps: {
                fullscreen: false,
                width: 'sm',
                form: <WarehouseForm handleClose={handleClose} submitBtnText="Save" edit />,
                title: 'Warehouse Details'
              }
            })
          }
          className="ml-2">
          <IconChevronRight size={16} color="#353A46" />
        </IconButton>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between" gap="8px" p="8px 16px">
        <Box display="flex" alignItems="center" gap="8px">
          <IconAssembly size={20} color="#353A46" />
          <Typography variant="subtitle1">Edit Warehouse Boundary</Typography>
        </Box>

        <IconButton className="ml-2">
          <IconChevronRight size={16} color="#353A46" />
        </IconButton>
      </Box>
    </Box>
  )
}
