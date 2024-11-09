import { isValidPhoneNumber } from 'react-phone-number-input'
import * as yup from 'yup'

export const EmergencyContactSchema = yup.object({
  emergencyName: yup.string().trim().required('Full name is required'),
  emergencyRelationship: yup.string().trim().required('Your relation to this person is required'),
  emergencyPhone: yup
    .string()
    .required('Phone number is required')
    .test('isValidPhoneNumber', 'Phone number is not valid', (value) => isValidPhoneNumber(value || ''))
})

export const UserProfilePersonalInformationSchema = yup.object({
  firstName: yup.string().trim().required('First name is required'),
  lastName: yup.string().trim().required('Last name is required'),
  email: yup.string(),
  phone: yup
    .string()
    .required('Phone number is required')
    .test('isValidPhoneNumber', 'Phone number is not valid', (value) => isValidPhoneNumber(value || '')),
  dateOfBirth: yup.string(),
  gender: yup.string()
})

export const GenderOptions = ['Male', 'Female', 'Non-binary', 'Other'].map((gender) => ({
  value: gender,
  label: gender
}))
