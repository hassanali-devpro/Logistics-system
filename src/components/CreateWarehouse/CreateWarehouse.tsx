import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { IconArchive, IconCopy, IconDotsVertical, IconEdit, IconPlus } from '@tabler/icons-react'

import { Breadcrumbs, useModalContext } from '../../shared/components'
import { Delay } from '../../shared/components/Delay'
import { FORM_MODAL } from '../../shared/constants'
import { InfoIcon } from '../../shared/icons'
import { initialState } from '../../wms-store/initialState'
import { clearObstacles, clearZones, setNavigationState } from '../../wms-store/reducers/warehouseReducer'
import { useGetWarehousesQuery } from '../../wms-store/services/warehouseService'

import { Warehouse } from './types'
import { WarehouseForm } from './WarehouseForm'
import { WarehouseStatusPill } from './WarehouseStatusPill'

const CreateWarehouse = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isFetching, isLoading } = useGetWarehousesQuery({ page: 1, limit: 100 })
  const { handleOpen, handleClose } = useModalContext()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const warehouses = useSelector((state: any) => state.warehouse.warehouses as Warehouse[])

  const createWarehouse = () => {
    handleOpen({
      modalType: FORM_MODAL,
      modalProps: {
        fullscreen: false,
        width: 'sm',
        form: <WarehouseForm afterSubmit={handleCreateWarehouse} handleClose={handleClose} submitBtnText="Create" />,
        title: 'Create a warehouse'
      }
    })
  }

  const handleCreateWarehouse = () => {
    navigate('/settings/warehouseConfigure')
    dispatch(
      setNavigationState({
        ...initialState.warehouse.navigationState
      })
    )
    dispatch(clearObstacles())
    dispatch(clearZones())
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleEditWarehouse = (id: string) => {
    navigate('/settings/warehouseConfigure', { state: { whKey: id } })
  }

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-6 w-full max-w-7xl mx-auto">
      <Breadcrumbs />

      <div className="flex justify-between items-start sm:items-center mt-4">
        <div>
          <div className="text-2xl font-bold">Warehouses</div>
          <div className="text-gray-500">Add and configure your 3D warehouse</div>
        </div>
        <div
          className="flex mt-4 sm:mt-0 cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg"
          onClick={createWarehouse}>
          <IconPlus className="w-6 h-6 sm:mr-2 flex items-center" />

          <div className="sm:block hidden">New Warehouse</div>
        </div>
      </div>

      {isLoading || isFetching ? (
        <Box minHeight="50vh" display="flex" justifyContent="center" alignItems="center">
          <Delay size="3vw" />
        </Box>
      ) : warehouses?.length === 0 ? (
        <div className="px-4 sm:px-6 lg:px-12 flex-col justify-start items-start gap-2.5 inline-flex w-full">
          <div className="self-stretch grow shrink basis-0 rounded-xl flex-col justify-start items-start flex">
            <div className="self-stretch grow shrink basis-0 flex-col justify-start items-start flex">
              <div className="self-stretch grow shrink basis-0 pb-6 flex-col justify-start items-start flex">
                <div className="self-stretch h-auto py-16 bg-white rounded-lg border-[#d1d4dc] flex-col justify-center items-center gap-6 flex">
                  <div className="w-[150px] sm:w-[200px] h-[150px] sm:h-[200px] bg-[#e8e9ed] rounded-3xl justify-center items-center gap-2 inline-flex">
                    <div className="text-[#353a46] text-xs font-light font-['Outfit'] leading-none">
                      Illustration - Variable SVG
                    </div>
                  </div>
                  <div className="flex-col justify-center items-center w-full sm:w-[600px] gap-6 flex">
                    <div className="h-36 flex-col justify-center items-center gap-2 flex">
                      <div className="w-full text-center text-[#8b93a7] text-[10px] font-semibold font-['Outfit'] uppercase leading-[14px] tracking-wide">
                        configuration required
                      </div>

                      <div className="self-stretch justify-center items-center gap-2.5 inline-flex">
                        <div className="grow shrink basis-0 text-center text-[#1a1d23] text-2xl font-bold font-['Outfit'] leading-loose">
                          Easy build your warehouse
                        </div>
                      </div>

                      <div className="self-stretch justify-center items-start gap-2.5 inline-flex">
                        <div className="grow shrink basis-0 text-center text-[#8b93a7] text-base font-normal font-['Outfit'] leading-normal ">
                          Start building your first warehouse and configure all essential components to manage your
                          daily activities.
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-[#1e69ff] rounded-lg shadow justify-center items-center gap-1 inline-flex">
                      <button
                        onClick={createWarehouse}
                        className="text-center text-gray-100 text-base font-semibold font-['Outfit'] leading-normal">
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Box className="border border-[#D1D4DC] rounded-lg mt-6 sm:mt-4">
          {warehouses.map((warehouse) => (
            <Box
              key={warehouse._id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              className="border-b border-[#D1D4DC] last:border-b-0 p-6 sm:p-4">
              <Box display="flex" flexDirection="column">
                <Box className="mb-2 block sm:hidden">
                  <WarehouseStatusPill status={warehouse.status} />
                </Box>

                <Typography variant="body1" className="!font-semibold" color="#353A46">
                  {warehouse.name}
                </Typography>

                <Typography variant="subtitle1" color="#8B93A7">
                  {warehouse.address}
                </Typography>
              </Box>

              <Box display="flex" gap="12px" alignItems="center">
                <Box className="hidden sm:block">
                  <WarehouseStatusPill status={warehouse.status} />
                </Box>

                <Box>
                  <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleMenuClick}>
                    <IconDotsVertical color="#8B93A7" size={24} />
                  </IconButton>

                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    slotProps={{ paper: { sx: { boxShadow: 1 } } }}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button'
                    }}>
                    <MenuItem disableRipple className="!cursor-default hover:!bg-inherit" key="header">
                      <Typography variant="caption" color="#8B93A7">
                        Actions
                      </Typography>
                    </MenuItem>
                    <MenuItem key="edit-warehouse" onClick={() => handleEditWarehouse(warehouse?._id)}>
                      <IconEdit className="mr-3" color="#353A46" size={20} />
                      <Typography variant="subtitle1" color="#353A46">
                        Edit Warehouse
                      </Typography>
                    </MenuItem>
                    <MenuItem key="details-warehouse" onClick={handleMenuClose}>
                      <Box className="mr-3">
                        <InfoIcon stroke="#4F5668" size={20} />
                      </Box>
                      <Typography variant="subtitle1" color="#353A46">
                        Details
                      </Typography>
                    </MenuItem>
                    <MenuItem key="duplicate-warehouse" onClick={handleMenuClose}>
                      <IconCopy className="mr-3" color="#353A46" size={20} />
                      <Typography variant="subtitle1" color="#353A46">
                        Duplicate Warehouse
                      </Typography>
                    </MenuItem>
                    <MenuItem key="archive-warehouse" onClick={handleMenuClose}>
                      <IconArchive className="mr-3" color="#353A46" size={20} />
                      <Typography variant="subtitle1" color="#353A46">
                        Archive Warehouse
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </div>
  )
}

export default CreateWarehouse
