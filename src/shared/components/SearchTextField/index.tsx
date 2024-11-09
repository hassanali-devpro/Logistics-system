/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'
import { Box, IconButton, SxProps, TextField, Theme } from '@mui/material'
import { IconSearch, IconX } from '@tabler/icons-react'

export interface SearchTextFieldProps {
  onCancel?: (event: any) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  width?: string | number
  maxHeight?: string | number
  borderRadius?: string | number
  borderColor?: string
  fontSize?: string | number
  lineHeight?: string | number
  fontWeight?: number | string
  borderWidth?: string | number
  hideBorders?: boolean
  placeholder?: string
  paddingLeft?: string | number
  value?: any
  sx?: SxProps<Theme>
  inputRef?: React.RefObject<HTMLInputElement>
  startAdornment?: React.JSX.Element
}

const SearchTextField = (props: SearchTextFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { onCancel } = props

  const onCancelClick = (event: any) => {
    if (inputRef.current !== null) {
      inputRef.current.value = ''

      if (onCancel) {
        onCancel(event)
      }
    }
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = props

    if (onChange) {
      onChange(event)
    }
  }

  return (
    <Box width={props.width ?? '100%'}>
      <TextField
        fullWidth
        InputProps={{
          startAdornment: props.startAdornment ?? <IconSearch className="mr-2" size={16} color="#8B93A7" />,
          endAdornment:
            onCancel && inputRef.current?.value ? (
              <IconButton disableRipple disableFocusRipple onClick={onCancelClick} size="large">
                <IconX onClick={onCancelClick} size={16} color="#8B93A7" />
              </IconButton>
            ) : null
        }}
        sx={{
          ...props.sx,
          '& .MuiInputBase-root': {
            maxHeight: props.maxHeight ?? '36px',
            borderRadius: props.borderRadius ?? '8px',
            borderColor: props.borderColor ?? '#D1D4DC',
            paddingRight: '2px',
            paddingLeft: props.paddingLeft ?? '12px',
            fontSize: props.fontSize ?? '14px',
            lineHeight: props.lineHeight ?? '20px',
            fontWeight: props.fontWeight ?? 400
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: props.borderWidth ?? '1px',
            ...(props.hideBorders && { border: 'none', outline: 'none' })
          }
        }}
        {...props}
        inputRef={inputRef}
        onChange={onChange}
      />
    </Box>
  )
}

export default SearchTextField
