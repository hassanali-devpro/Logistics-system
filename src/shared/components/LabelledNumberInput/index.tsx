/* eslint-disable no-unused-vars */
import { Box, IconButton, InputAdornment, InputBaseComponentProps, SxProps, TextField, Typography } from '@mui/material'
import { IconMinus, IconPlus } from '@tabler/icons-react'

import './styles.css'

export type LabelledNumberInputProps = {
  sx?: SxProps
  inputProps?: InputBaseComponentProps
  label?: string
  subLabel?: string
  minValue?: number
  maxValue?: number
  onChange: (event: any) => void
  value: number
  error?: string
}

export const LabelledNumberInput = ({
  sx,
  inputProps,
  label,
  subLabel,
  minValue,
  maxValue,
  onChange,
  value,
  error
}: LabelledNumberInputProps) => {
  const handleIncrement = () => {
    const newValue = value + 1
    if (maxValue === undefined) onChange(newValue)
    else if (newValue <= maxValue) onChange(newValue)
  }

  const handleDecrement = () => {
    const newValue = value - 1
    if (minValue === undefined) onChange(newValue)
    else if (newValue >= minValue) onChange(newValue)
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" flexDirection="column">
        <Typography noWrap variant="subtitle1">
          {label}
        </Typography>

        <Typography noWrap variant="caption">
          {subLabel}
        </Typography>
      </Box>

      <TextField
        onChange={(event) => {
          onChange && onChange(Number(event.target.value))
        }}
        value={value}
        className="!pl-1 !pr-1"
        type="number"
        inputProps={inputProps}
        error={!!error}
        helperText={error}
        sx={{
          ...sx,

          '& input[type=number]': {
            MozAppearance: 'textfield'
          },
          '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0
          },
          '& .MuiOutlinedInput-root': {
            paddingX: '4px'
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleDecrement}>
                <IconMinus size={16} color="#4F5668" />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleIncrement}>
                <IconPlus size={16} color="#4F5668" />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </Box>
  )
}
