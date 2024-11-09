import { useForm } from 'react-hook-form'
import { parsePhoneNumber } from 'react-phone-number-input'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button } from '@mui/material'

import { LoadingButton } from '../../shared/components'
import { useUpdateUserProfileMutation } from '../../wms-store/services/authService'

import { UserProfilePersonalInformationSchema } from './constants'
import { PersonalInformationFields } from './PersonalInformationFields'

export const PersonalInformationForm = ({
  handleClose,
  defaultCountry,
  defaultValues,
  currentUser
}: {
  handleClose: any
  defaultCountry: any
  defaultValues: any
  currentUser: any
}) => {
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation()

  const {
    register,
    setValue,
    trigger,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(UserProfilePersonalInformationSchema),
    defaultValues: defaultValues
  })

  const handleProfileUpdate = (payload: any) => {
    const phoneNumber = parsePhoneNumber(payload.phone)

    const data = {
      userKey: currentUser?._id,
      givenName: payload.firstName,
      lastName: payload.lastName,
      phone: {
        cc: phoneNumber ? `+${phoneNumber.countryCallingCode}` : '',
        number: phoneNumber ? phoneNumber.nationalNumber : ''
      },
      password: '',
      deleteImage: false,
      DOB: Date.parse(payload.dateOfBirth),
      gender: payload?.gender
    }

    updateUserProfile(data)
      .then((response) => {
        if (response.data.status === 1) {
          toast.success('Profile updated successfully')
          handleClose()
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <form onSubmit={handleSubmit(handleProfileUpdate)}>
      <PersonalInformationFields
        register={register}
        setValue={setValue}
        trigger={trigger}
        watch={watch}
        errors={errors}
        defaultCountry={defaultCountry}
      />

      <Box display="flex" mt="8px" alignItems="center" justifyContent="flex-end" gap="12px">
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>

        <LoadingButton
          isLoading={isLoading || isSubmitting}
          disabled={isLoading || isSubmitting || !isDirty}
          variant="contained"
          type="submit">
          Save
        </LoadingButton>
      </Box>
    </form>
  )
}
