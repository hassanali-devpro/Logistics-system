import { isValidPhoneNumber } from 'react-phone-number-input'
import * as yup from 'yup'

import { UserProfilePersonalInformationSchema } from '../UserProfile/constants'

export const ProfileEditSchema = UserProfilePersonalInformationSchema.shape({
  emergencyName: yup
    .string()
    .trim()
    .when('$showEmergencyContact', (showEmergencyContact, schema) => {
      return showEmergencyContact[0] ? schema.required('Full name is required') : schema.notRequired()
    }),
  emergencyRelationship: yup
    .string()
    .trim()
    .when('$showEmergencyContact', (showEmergencyContact, schema) => {
      return showEmergencyContact[0]
        ? schema.required('Your relation to this person is required')
        : schema.notRequired()
    }),
  emergencyPhone: yup
    .string()
    .trim()
    .when('$showEmergencyContact', (showEmergencyContact, schema) => {
      return showEmergencyContact[0]
        ? schema
            .required('Phone number is required')
            .test('isValidPhoneNumber', 'Phone number is not valid', (value) => isValidPhoneNumber(value || ''))
        : schema.notRequired()
    })
})
