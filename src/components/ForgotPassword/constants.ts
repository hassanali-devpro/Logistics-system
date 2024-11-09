import * as yup from 'yup'

export const ForgotPasswordSchema = yup.object({
  email: yup.string().email('Please enter a valid email').trim().required('Email is required')
})
