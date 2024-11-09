import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import {
  Box,
  InputBaseComponentProps,
  MenuItem,
  OutlinedInputProps,
  SxProps,
  TextField,
  Theme,
  Typography
} from '@mui/material'

export interface CustomOutlinedInputProps {
  sx?: SxProps<Theme>
  inputRef?: React.MutableRefObject<HTMLInputElement | null>
  inputProps?: InputBaseComponentProps
  heading?: React.ReactNode
  headingClass?: string
  gap?: string | number
  width?: string | number
  fullWidth?: boolean
  height?: string | number
  color?: string
  fontSize?: string | number
  lineHeight?: string | number
  fontWeight?: number | string
  padding?: string
  borderRadius?: string | number
  backgroundColor?: string
  InputProps?: Partial<OutlinedInputProps>
  minRows?: number
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  multiline?: boolean
  type?: string
  value?: string | number
  register?: UseFormRegister<any>
  isRequired?: boolean
  placeholder?: string
  select?: boolean
  name?: string
  error?: string
  options?: {
    value: string | number
    label: string
  }[]
  disabled?: boolean
}

export const CustomOutlinedInput = (props: CustomOutlinedInputProps) => {
  const {
    sx,
    inputProps,
    inputRef,
    heading,
    headingClass,
    minRows = 3,
    gap,
    width,
    fullWidth,
    height = '48px',
    color = '#353a46',
    fontSize = '16px',
    lineHeight = '24px',
    fontWeight = 400,
    padding = '16px',
    borderRadius = '8px',
    backgroundColor = 'inherit',
    InputProps,
    onChange,
    multiline,
    type,
    value,
    register,
    isRequired,
    placeholder,
    select,
    name,
    error,
    options,
    disabled,
    ...rest
  } = props

  const registerProps = register && name ? register(name) : {}

  return (
    <Box display="flex" flexDirection="column" gap={gap ?? '8px'} width={fullWidth ? '100%' : width ? width : '100%'}>
      <Typography variant="body2" className={headingClass}>
        {heading} {isRequired && <span className="text-[#F53939]">*</span>}
      </Typography>

      <TextField
        {...registerProps}
        {...(onChange && { onChange })}
        inputRef={inputRef}
        value={value}
        type={type}
        inputProps={inputProps}
        fullWidth={true}
        multiline={multiline}
        placeholder={placeholder}
        minRows={minRows}
        error={!!error}
        disabled={disabled}
        select={select}
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
          '& .MuiInputBase-root': {
            height: multiline ? 'auto' : height,
            color: color,
            fontSize: fontSize,
            fontWeight: fontWeight,
            lineHeight: lineHeight,
            borderRadius: borderRadius,
            padding: '0px',
            backgroundColor: backgroundColor
          },
          '& .MuiOutlinedInput-input': {
            padding: padding
          }
        }}
        InputProps={InputProps}
        {...rest}>
        {select &&
          options?.map((option: { value: any; label: any }) => (
            <MenuItem key={option?.value} value={option?.value}>
              {option?.label}
            </MenuItem>
          ))}
      </TextField>
    </Box>
  )
}
