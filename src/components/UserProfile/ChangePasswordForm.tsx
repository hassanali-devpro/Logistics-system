import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '@mui/material'

import {
  CustomOutlinedInput,
  LoadingButton,
  PasswordStrengthIndicator,
  ShowPasswordIcon
} from '../../shared/components'
import { getPasswordStrength } from '../../shared/helpers/authHelpers'
import { useUpdatePasswordMutation } from '../../wms-store/services/authService'

import 'react-datepicker/dist/react-datepicker.css'

export const ChangePasswordForm = ({ handleClose, currentUser }: { handleClose: () => void; currentUser: any }) => {
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation()

  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [currentPasswordError, setCurrentPasswordError] = useState('')
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value
    if (field === 'password1') {
      setPassword1(value)
      setPasswordStrength(getPasswordStrength(value, setPasswordStrengthParams, setErrorMessage))
    } else if (field === 'password2') {
      setPassword2(value)
    }
  }

  const handlePasswordUpdate = () => {
    const data = {
      userKey: currentUser?._id,
      oldPassword: currentPassword,
      newPassword: password1
    }

    updatePassword(data)
      .then((response) => {
        if (response.data.status === 1) {
          toast.success('Password updated successfully')
          handleClose()
        }
      })
      .catch((err) => console.error(err))
  }

  const handleSubmit = () => {
    if (password1 !== password2) {
      setErrorMessage('Passwords do not match')
      return
    }

    if (errorMessage) {
      if (password1 === password2 && errorMessage === 'Passwords do not match') setErrorMessage('')
      else return
    }

    handlePasswordUpdate()
  }

  return (
    <div>
      <div className="space-y-4 mt-2">
        <div className="mb-2">
          <CustomOutlinedInput
            type="password"
            value={currentPassword}
            heading="Current Password"
            error={currentPasswordError}
            onChange={(e) => {
              setCurrentPassword(e.target.value)
              if (!e.target.value) {
                setCurrentPasswordError('Please enter your current password')
              } else {
                setCurrentPasswordError('')
              }
            }}
          />
        </div>

        <div className="mb-2">
          <CustomOutlinedInput
            heading="New Password"
            value={password1}
            onChange={(e) => handlePasswordChange(e, 'password1')}
            type={open1 ? 'text' : 'password'}
            InputProps={{
              endAdornment: <ShowPasswordIcon showPassword={open1} setShowPassword={setOpen1} />
            }}
            error={errorMessage}
          />

          <div className="mt-2">
            <PasswordStrengthIndicator
              password={password1}
              passwordStrength={passwordStrength}
              passwordStrengthParams={passwordStrengthParams}
            />
          </div>
        </div>

        <div>
          <CustomOutlinedInput
            heading="Confirm Password"
            value={password2}
            onChange={(e) => handlePasswordChange(e, 'password2')}
            type={open2 ? 'text' : 'password'}
            InputProps={{
              endAdornment: <ShowPasswordIcon showPassword={open2} setShowPassword={setOpen2} />
            }}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col items-end space-x-2">
        <div className="flex items-center gap-3">
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>

          <LoadingButton
            isLoading={isLoading}
            variant="contained"
            onClick={handleSubmit}
            disabled={Boolean(errorMessage) || isLoading}>
            Save
          </LoadingButton>
        </div>
      </div>
    </div>
  )
}
