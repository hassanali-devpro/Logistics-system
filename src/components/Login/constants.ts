import * as yup from 'yup'

export const LoginSchema = yup.object({
  email: yup.string().email('Please enter a valid email').trim().required('Email is required'),
  password: yup.string().trim().required('Password is required')
  // .min(8, 'Password must be at least 8 characters')
})
