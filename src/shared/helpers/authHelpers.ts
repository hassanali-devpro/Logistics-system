import React from 'react'
import { E164Number, parsePhoneNumber } from 'libphonenumber-js'

export const getPasswordStrength = (
  password: string,
  setPasswordStrengthParams: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean
    }>
  >,
  setPasswordError?: React.Dispatch<React.SetStateAction<string>>
) => {
  if (password === '') {
    return {
      width: '0%',
      color: 'lightgray',
      text: '',
      textColor: 'text-[#8B93A7]'
    }
  }

  const length = password.length
  let strength = 0
  let hasError = false

  if (length >= 8) {
    strength += 1
    setPasswordStrengthParams((prevState) => ({ ...prevState, length: true }))
  } else {
    setPasswordError && setPasswordError('Password has to be at least 8 characters')
    setPasswordStrengthParams((prevState) => ({ ...prevState, length: false }))
    hasError = true
  }

  if (/[A-Z]/.test(password)) {
    strength += 1
    setPasswordStrengthParams((prevState) => ({ ...prevState, capitalLetters: true }))
  } else {
    !hasError && setPasswordError && setPasswordError('Password must contain at least one uppercase letter')
    setPasswordStrengthParams((prevState) => ({ ...prevState, capitalLetters: false }))
    hasError = true
  }

  if (/[a-z]/.test(password)) {
    strength += 1
    setPasswordStrengthParams((prevState) => ({ ...prevState, smallLetters: true }))
  } else {
    !hasError && setPasswordError && setPasswordError('Password must contain at least one lowercase letter')
    setPasswordStrengthParams((prevState) => ({ ...prevState, smallLetters: false }))
    hasError = true
  }

  if (/[0-9]/.test(password)) {
    strength += 1
    setPasswordStrengthParams((prevState) => ({ ...prevState, numbers: true }))
  } else {
    !hasError && setPasswordError && setPasswordError('Password must contain at least one number')
    setPasswordStrengthParams((prevState) => ({ ...prevState, numbers: false }))
    hasError = true
  }

  if (/[^a-zA-Z0-9]/.test(password)) {
    strength += 1
    setPasswordStrengthParams((prevState) => ({ ...prevState, specialCharacters: true }))
  } else {
    !hasError && setPasswordError && setPasswordError('Password must contain at least one special character')
    setPasswordStrengthParams((prevState) => ({ ...prevState, specialCharacters: false }))
    hasError = true
  }

  if (!hasError && setPasswordError) setPasswordError('')

  switch (strength) {
    case 0:
      return {
        width: '0%',
        color: 'lightgray',
        text: 'Very weak',
        textColor: 'gray'
      }
    case 1:
      return { width: '15%', color: '#D1D4DC', text: 'Very Weak', textColor: 'text-[#8B93A7]' }
    case 2:
      return { width: '30%', color: '#F53939', text: 'Weak', textColor: 'text-[#F53939]' }
    case 3:
      return { width: '50%', color: '#FAA700', text: 'Fair', textColor: 'text-[#FAA700]' }
    case 4:
      return { width: '80%', color: '#32CD85', text: 'Good', textColor: 'text-[#32CD85]' }
    case 5:
      return { width: '100%', color: '#28A46A', text: 'Strong', textColor: 'text-[#28A46A]' }
    default:
      return { text: 'Must contain at least 8 characters', textColor: 'text-[#8B93A7]' }
  }
}

export const getFormattedPhone = (phone: {
  cc: string
  number: string
}): { countryCode: string; formattedPhone: E164Number } => {
  if (phone?.cc && phone?.number) {
    const phoneNumber = parsePhoneNumber(`${phone.cc}${phone.number}`)

    if (phoneNumber) {
      return {
        countryCode: phoneNumber.country as string,
        formattedPhone: phoneNumber.number as E164Number
      }
    }
  }

  return { countryCode: '', formattedPhone: '' as E164Number }
}

export const maskEmail = (email: string): string => {
  const [username, domain] = email.split('@')

  if (!username || !domain) {
    return email // Return the email as-is if it doesn't have a proper format
  }

  const maskedUsername = username[0] + '*'.repeat(Math.max(username.length - 2, 1)) + username[username.length - 1]
  const [domainName, domainExtension] = domain.split('.')

  const maskedDomain =
    domainName[0] + '*'.repeat(Math.max(domainName.length - 2, 1)) + domainName[domainName.length - 1]

  return `${maskedUsername}@${maskedDomain}.${domainExtension}`
}
