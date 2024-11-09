import React from 'react'
import { Box, Button, Checkbox, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { IconX } from '@tabler/icons-react'

import './styles.css'

export const CheckboxesFilter = ({
  header,
  label,
  value,
  options,
  handleApply,
  StartIcon
}: {
  header: string
  label: string
  value: any[]
  options: { label: string; value: any }[]
  handleApply: any
  StartIcon?: React.ElementType // Optional icon component
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [selected, setSelected] = React.useState<any[]>(value)
  const open = Boolean(anchorEl)

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget)
    setSelected(value)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClear = () => {
    handleClose()
    setSelected([])
    handleApply([])
  }

  const handleChange = (isSelected: boolean, value: any) => {
    setSelected((prevSelected) => {
      if (!isSelected) {
        return [...prevSelected, value]
      } else {
        return prevSelected.filter((val) => val !== value)
      }
    })
  }

  // Get the labels of the selected options
  const selectedLabels = value.map((selectedValue) => {
    const option = options.find((opt) => opt.value === selectedValue)
    return option?.label || ''
  })

  // Only show the first two selected labels, with a "+x more" if there are more
  const hasMore = selectedLabels.length > 2
  const displayedLabels = selectedLabels.slice(0, 2).join(', ')
  const moreCount = selectedLabels.length - 2

  return (
    <Box>
      <Box
        width="max-content"
        borderRadius="8px"
        p="8px 12px"
        display="flex"
        alignItems="center"
        className="border border-[#D1D4DC] cursor-pointer">
        <Box display="flex" alignItems="center" onClick={handleOpen}>
          {StartIcon && <StartIcon className="mr-2" size={20} color="#4F5668" />}
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle1" color="#4F5668">
              {label}
              {value?.length > 0 ? ': ' : ''}
            </Typography>
            <Box display="flex">
              <Typography variant="subtitle1" color="#1F69FF">
                &nbsp;{displayedLabels}
              </Typography>
              {hasMore && (
                <Typography variant="subtitle1" color="#4F5668" ml={0.5}>
                  +{moreCount} more
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
        {value?.length > 0 && (
          <IconButton className="!p-[1px] !ml-1" onClick={handleClear}>
            <IconX size={18} color="#4F5668" />
          </IconButton>
        )}
      </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        disableAutoFocusItem
        slotProps={{ paper: { sx: { width: '250px', borderRadius: '8px' } } }}
        style={{ padding: '8px 16px', marginLeft: '-12px', marginTop: '14px' }}
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
        <MenuItem disableRipple className="!cursor-default hover:!bg-inherit" key="header">
          <Typography variant="subtitle2" color="#353A46">
            {header}
          </Typography>
        </MenuItem>

        {options?.map((option) => (
          <MenuItem
            className="checkboxes-filter-menu-item"
            onClick={() => handleChange(selected.includes(option.value), option.value)}
            key={option.value}>
            <Checkbox checked={selected.includes(option.value)} />

            <Typography variant="subtitle1" color="#353A46">
              {option.label}
            </Typography>
          </MenuItem>
        ))}

        <MenuItem disableRipple className="!cursor-default hover:!bg-inherit" key="actions">
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent={value?.length > 0 ? 'space-between' : 'flex-end'}>
            {value?.length > 0 && (
              <Button variant="text" onClick={handleClear}>
                Clear
              </Button>
            )}

            <Button
              variant="contained"
              onClick={() => {
                handleClose()
                handleApply(selected)
              }}>
              Apply
            </Button>
          </Box>
        </MenuItem>
      </Menu>
    </Box>
  )
}
