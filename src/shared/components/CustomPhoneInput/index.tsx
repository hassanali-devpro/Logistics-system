/* eslint-disable no-unused-vars */
import { UseFormTrigger } from 'react-hook-form'
import PhoneInput from 'react-phone-number-input'
import { Box, Typography } from '@mui/material'
import { E164Number } from 'libphonenumber-js'

import './styles.css'

export interface CustomPhoneInputProps {
  heading?: string
  headingClass?: string
  gap?: string | number
  width?: string | number
  fullWidth?: boolean
  height?: string | number
  paddingLeft?: string
  borderRadius?: string | number
  name?: string
  onChange: (value: any) => void
  value: string | E164Number | undefined
  defaultCountry: any
  isRequired?: boolean
  placeholder?: string
  error?: string
  disabled?: boolean
  mode?: string
  trigger?: UseFormTrigger<any>
}

export const CustomPhoneInput = (props: CustomPhoneInputProps) => {
  const {
    heading,
    headingClass,
    gap,
    width,
    fullWidth,
    height = '48px',
    borderRadius = '8px',
    onChange,
    value,
    defaultCountry,
    isRequired,
    placeholder,
    name,
    error,
    disabled,
    mode = 'all',
    trigger
  } = props

  const borderRadiusClass = `rounded-[${borderRadius}]`

  return (
    <Box display="flex" flexDirection="column" gap={gap ?? '8px'} width={fullWidth ? '100%' : width ? width : '100%'}>
      <Typography variant="body2" className={headingClass}>
        {heading} {isRequired && <span className="text-[#F53939]">*</span>}
      </Typography>

      <PhoneInput
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onBlur={() => {
          if (mode === 'onBlur') {
            trigger && trigger(name)
          }
        }}
        onChange={(value) => {
          onChange(value as E164Number | undefined)
          if (mode !== 'onBlur') {
            trigger && trigger(name)
          }
        }}
        defaultCountry={defaultCountry || 'AU'}
        international
        countryCallingCodeEditable={false}
        style={{
          height: height
        }}
        className={`w-full border ${error ? '!border-[#F53939]' : 'border-[#D1D4DC]'} ${error ? '!outline-[#F53939] !outline-1' : 'outline-0'} ${borderRadiusClass} pl-4 shadow-sm`}
      />

      {error && (
        <Typography mt="3px" mr="14px" color="#d32f2f" variant="caption">
          {error}
        </Typography>
      )}
    </Box>
  )
}
