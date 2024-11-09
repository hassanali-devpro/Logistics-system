import React, { useRef } from 'react'
import { TextField } from '@mui/material'

export const PlainTextField = (props: any) => {
  const {
    onChange,
    onBlur,
    onEnterPress,
    register,
    value,
    type = 'text',
    inputProps = {},
    sx,
    error,
    disabled,
    multiline,
    fontSize,
    lineHeight,
    fontWeight,
    color,
    name,
    placeholder
  } = props
  const inputRef = useRef<HTMLInputElement>(null)

  const registerProps = register && name ? register(name) : {}

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (onEnterPress) {
        onEnterPress()
      }

      if (inputRef.current) {
        inputRef.current.blur()
      }
    }
  }

  return (
    <TextField
      {...registerProps}
      {...(onChange && { onChange })}
      {...(onBlur && { onBlur })}
      onKeyDown={handleKeyDown}
      value={value}
      type={type}
      inputRef={inputRef}
      variant="standard"
      multiline={multiline}
      inputProps={inputProps}
      InputProps={{
        disableUnderline: true
      }}
      fullWidth
      placeholder={placeholder}
      error={!!error}
      disabled={disabled}
      helperText={error}
      sx={{
        '& .MuiInput-root': {
          borderBottom: '1px solid transparent',
          fontSize: fontSize ?? '14px',
          lineHeight: lineHeight ?? '20px',
          fontWeight: fontWeight ?? 400,
          color: color ?? '#4F5668'
        },
        '& .MuiInput-root.Mui-focused': {
          borderBottom: '1px solid',
          borderColor: error ? 'red' : 'primary.main'
        },
        '& input[type=number]': {
          MozAppearance: 'textfield'
        },
        '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
          WebkitAppearance: 'none',
          margin: 0
        },

        ...sx
      }}
    />
  )
}
