/* eslint-disable no-unused-vars */
import { UseFormRegister } from 'react-hook-form'
import { Box, InputAdornment, InputBaseComponentProps, SxProps, TextField, Typography } from '@mui/material'

import './styles.css'

export type LabelledOutlinedInputProps = {
  sx?: SxProps
  inputProps?: InputBaseComponentProps
  label?: string
  subLabel?: string
  endAdornment?: string
  type?: string
  onChange?: (event: any) => void
  value?: unknown
  gap?: number
  register?: UseFormRegister<any>
  name?: string
  error?: string
  disabled?: boolean
}

export const LabelledOutlinedInput = ({
  sx,
  inputProps,
  label,
  subLabel,
  endAdornment,
  onChange,
  type,
  value,
  gap,
  register,
  name,
  error,
  disabled
}: LabelledOutlinedInputProps) => {
  const registerProps = register && name ? register(name) : {}

  return (
    <Box display="flex" width="100%" alignItems="center" justifyContent="space-between" gap={gap}>
      <Box display="flex" flexDirection="column">
        <Typography noWrap variant="subtitle1">
          {label}
        </Typography>

        <Typography noWrap variant="caption">
          {subLabel}
        </Typography>
      </Box>

      <TextField
        className="labelled-outlined-input"
        {...registerProps}
        {...(onChange && { onChange })}
        value={value}
        type={type}
        inputProps={inputProps}
        fullWidth
        error={!!error}
        disabled={disabled}
        helperText={error}
        sx={{
          ...sx,

          '& input[type=number]': {
            MozAppearance: 'textfield'
          },
          '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Typography variant="caption">{endAdornment}</Typography>
            </InputAdornment>
          )
        }}
      />
    </Box>
  )
}
