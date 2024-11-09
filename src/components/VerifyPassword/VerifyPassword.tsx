import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Typography } from '@mui/material'

import {
  CustomOutlinedInput,
  LoadingButton,
  PasswordStrengthIndicator,
  ShowPasswordIcon
} from '../../shared/components'
import { getPasswordStrength } from '../../shared/helpers/authHelpers'
import { useVerifyPasswordMutation } from '../../wms-store/services/authService'

import '../../shared/styles/ScrollbarStyles.css'

const VerifyPassword = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [verifyPassword, { isLoading }] = useVerifyPasswordMutation()

  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [temporaryPasswordError, setTemporaryPasswordError] = useState('')
  const [temporaryPassword, setTemporaryPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState<any>({
    width: '0%',
    color: 'lightgray',
    text: 'Very weak',
    textColor: 'gray'
  })
  const [passwordStrengthParams, setPasswordStrengthParams] = useState<{ [key: string]: boolean }>({
    length: false,
    smallLetters: false,
    capitalLetters: false,
    numbers: false,
    specialCharacters: false
  })

  const searchParams = new URLSearchParams(location.search)
  const userKey = searchParams.get('userKey')

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value
    if (field === 'password1') {
      setPassword1(value)
      setPasswordStrength(getPasswordStrength(value, setPasswordStrengthParams, setErrorMessage))
    } else if (field === 'password2') {
      setPassword2(value)
    }
  }

  const handleVerifyPassword = async () => {
    if (password1 !== password2) {
      setErrorMessage('Passwords do not match')
      return
    } else {
      setErrorMessage('')
    }

    if (!password1) {
      setErrorMessage('Both password fields are required')
      return
    }

    if (!temporaryPassword) {
      setTemporaryPasswordError('Your temporary password is required')
      return
    } else {
      setTemporaryPasswordError('')
    }

    if (errorMessage) {
      if (password1 === password2 && errorMessage === 'Passwords do not match') setErrorMessage('')
      else return
    }

    try {
      const response = await verifyPassword({
        password: temporaryPassword,
        newPassword: password2,
        userKey
      })

      if (response.data.status === 1) {
        toast.success('Password verified successfully')
        navigate('/auth')
      }
    } catch (error) {
      console.error('Reset password error:', error)
    }
  }

  return (
    <div id="scroll-bar-id" className="max-h-screen overflow-y-auto py-3">
      <div className="2xl:w-[400px] sm:w-[366px] sm:mx-auto px-5">
        <Typography variant="h3" mb="16px" fontWeight={700} color="#1A1D23">
          Join your team with your 3DLogistiX account
        </Typography>
        <Typography variant="h6" mb="24px" color="#4F5668">
          To create your account, please enter a password.
        </Typography>
        <form>
          <div className="mb-2">
            <CustomOutlinedInput
              heading="Temporary Password"
              name="temporaryPassword"
              value={temporaryPassword}
              onChange={(e) => {
                setTemporaryPassword(e.target.value)
                if (e.target.value) setTemporaryPasswordError('')
                else setTemporaryPasswordError('Your temporary password is required')
              }}
              error={temporaryPasswordError}
            />
            {!temporaryPasswordError && (
              <Typography mt="8px" variant="subtitle1" color="#8B93A7">
                Enter the temporary password you receive in the email
              </Typography>
            )}
          </div>

          <div className="mb-2">
            <CustomOutlinedInput
              heading="Password"
              value={password1}
              onChange={(e) => handlePasswordChange(e, 'password1')}
              type={open1 ? 'text' : 'password'}
              InputProps={{
                endAdornment: <ShowPasswordIcon showPassword={open1} setShowPassword={setOpen1} />
              }}
              error={errorMessage}
            />
          </div>

          <PasswordStrengthIndicator
            password={password1}
            passwordStrength={passwordStrength}
            passwordStrengthParams={passwordStrengthParams}
          />

          <div className="my-4">
            <CustomOutlinedInput
              heading="Confirm Password"
              type={open2 ? 'text' : 'password'}
              value={password2}
              onChange={(e) => handlePasswordChange(e, 'password2')}
              InputProps={{
                endAdornment: <ShowPasswordIcon showPassword={open2} setShowPassword={setOpen2} />
              }}
            />
          </div>

          <LoadingButton
            isLoading={isLoading}
            type="button"
            variant="contained"
            gap="8px"
            fullWidth
            disabled={isLoading}
            onClick={handleVerifyPassword}>
            Confirm
          </LoadingButton>
        </form>
      </div>
    </div>
  )
}

export default VerifyPassword