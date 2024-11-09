import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'

import { CustomOutlinedInput, ShowPasswordIcon } from '../../shared/components'
import { useLoginMutation } from '../../wms-store/services/authService'

import { LoginSchema } from './constants'

const Login = () => {
  const [open, setOpen] = useState(false)
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const {
    getValues,
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(LoginSchema)
  })

  const emailError = errors?.email?.message
  const passwordError = errors?.password?.message

  const handleLogin = () => {
    const { email, password } = getValues()

    login({ email, password }).then((response) => {
      if (response.data.status === 1) {
        toast.success('Login successful!')
        navigate('/settings')
      } else if (response.data.status === 2) {
        toast.success('Login successful!')
        navigate('/profile-edit')
      }
    })
  }

  return (
    <div className="2xl:w-[400px] sm:w-[366px] sm:mx-auto  px-5">
      <h3 className="text-[#1A1D23] font-extrabold text-2xl mb-4">Log In to 3DLogistiX</h3>
      <p className="text-[#4F5668] text-lg mb-10">Welcome back!</p>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="mb-5">
          <CustomOutlinedInput heading="Email" name="email" register={register} error={emailError} />
        </div>

        <div className="mb-5">
          <CustomOutlinedInput
            heading={
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link to="/auth/forget-password" className=" text-base text-[#004DE6] hover:underline">
                  Forgot Password?
                </Link>
              </div>
            }
            type={open ? 'text' : 'password'}
            name="password"
            register={register}
            error={passwordError}
            InputProps={{
              endAdornment: <ShowPasswordIcon showPassword={open} setShowPassword={setOpen} />
            }}
          />
        </div>
        <div className="flex items-center mb-5">
          <input type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
          <label className="ml-2  block text-sm text-[#4F5668]">Remember me</label>
        </div>
        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="w-full py-2 px-4 bg-[#1F69FF] text-white font-medium rounded-md shadow-sm hover:bg-[#004DE6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Continue
        </button>
      </form>
      <div className="mt-8 text-center">
        <p className="text-gray-600 text-base">
          Don't have an account?{' '}
          <a href="/" className="text-[#004DE6] hover:underline">
            Create an account
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
