import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'

import { CustomOutlinedInput } from '../../shared/components'
import { useResetPasswordRequestMutation } from '../../wms-store/services/authService'

import { ForgotPasswordSchema } from './constants'

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate()
  const [resetPasswordRequest, { isLoading }] = useResetPasswordRequestMutation()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(ForgotPasswordSchema)
  })

  const handleFormSubmit = async (values: any) => {
    try {
      const response = await resetPasswordRequest({ email: values.email })
      if (response.data.status === 1) {
        toast.success('Email sent successfully')
        navigate('/auth/check-email', {
          state: { email: values.email }
        })
      }
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <div className="2xl:w-[400px] sm:w-[366px]  sm:mx-auto  px-5">
      <h2 className="font-bold text-2xl mb-4">Forgot Password?</h2>
      <p className="text-[#4F5668] mb-4">
        Enter the email address linked to your account so we can send you instructions on how to reset your password.
      </p>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mb-4">
          <CustomOutlinedInput
            heading="Email"
            name="email"
            register={register}
            error={errors?.email?.message as string}
            headingClass="text-[#353A46]"
          />
        </div>
        <button
          disabled={isSubmitting || isLoading}
          type="submit"
          className="w-full h-11 bg-[#1F69FF] text-white rounded-lg mt-4">
          Send
        </button>
      </form>
      <div className="mt-8 text-center">
        <Link to="/auth" className="text-[#004DE6] hover:underline">
          Back to Log in
        </Link>
      </div>
    </div>
  )
}

export default ForgotPassword
