import React from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button } from '@mui/material'

import { maskEmail } from '../../shared/helpers/authHelpers'
import { useResetPasswordRequestMutation } from '../../wms-store/services/authService'

const CheckEmail: React.FC = () => {
  const location = useLocation()
  const [resetPasswordRequest] = useResetPasswordRequestMutation()

  const state = location.state || { email: '', showToast: false, data: null }
  const { email } = state

  const reSendEmail = async () => {
    try {
      const response = await resetPasswordRequest({ email })
      if (response.data.status === 1) {
        toast.success('Email sent successfully')
      }
    } catch (error) {
      console.error('Email resend failed:', error)
    }
  }

  return (
    <div className="2xl:w-[400px] sm:w-[366px] sm:mx-auto  px-5">
      <h2 className="font-bold text-2xl mb-2 text-[#1A1D23]">Check Your Email</h2>
      <p className="text-[#4F5668] text-lg mb-2 w-[95%]">
        We have sent an email with password reset information to {maskEmail(email)}.
      </p>
      <p className="text-[#8B93A7] mb-4 font-outfit text-sm font-normal leading-[1.42857]">
        Did not receive the email? Check your spam or promotion folder.
      </p>

      <Button variant="contained" fullWidth onClick={reSendEmail}>
        Resend Email
      </Button>
    </div>
  )
}

export default CheckEmail
