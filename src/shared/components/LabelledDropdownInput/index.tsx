/* eslint-disable no-unused-vars */
import { UseFormRegister } from 'react-hook-form'
import { Box, InputBaseComponentProps, MenuItem, SxProps, TextField, Typography } from '@mui/material'
import { IconChevronDown } from '@tabler/icons-react'

import './styles.css'

export type LabelledDropdownInputProps = {
  sx?: SxProps
  inputProps?: InputBaseComponentProps
  label?: string
  subLabel?: string
  onChange?: (event: any) => void
  value?: unknown
  options: { label: string; value: any }[]
  gap?: number
  register?: UseFormRegister<any>
  name?: string
  disabled?: boolean
  inputWidth?: number | string
}

export const LabelledDropdownInput = ({
  sx,
  inputProps,
  label,
  subLabel,
  onChange,
  value,
  options,
  gap,
  register,
  name,
  disabled,
  inputWidth
}: LabelledDropdownInputProps) => {
  const registerProps = register && name ? register(name) : {}

  const DropdownIcon = (e: any) => (
    <Box className={e.className} marginRight="6px">
      <IconChevronDown className={e.className} size={16} color="#353A46" />
    </Box>
  )

  return (
    <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" gap={gap}>
      <Box display="flex" flexDirection="column">
        <Typography noWrap variant="subtitle1">
          {label}
        </Typography>

        <Typography noWrap variant="caption">
          {subLabel}
        </Typography>
      </Box>

      <Box width={inputWidth ?? '100%'} display="flex" alignItems="center" justifyContent="flex-end">
        <TextField
          {...registerProps}
          {...(onChange && { onChange })}
          fullWidth
          value={value}
          select
          inputProps={inputProps}
          disabled={disabled}
          SelectProps={{
            IconComponent: (e) => <DropdownIcon className={e.className} />
          }}
          sx={{
            ...sx,
            '& .MuiSelect-select': {
              paddingRight: '0px !important'
            },
            '& .MuiSelect-icon': {
              position: 'absolute',
              zIndex: 0,
              right: 0,
              marginTop: '2px'
            },
            '& .MuiSelect-iconOpen': {
              display: 'none'
            }
          }}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  )
}
