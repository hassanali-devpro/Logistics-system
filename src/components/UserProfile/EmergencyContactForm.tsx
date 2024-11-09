import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button } from '@mui/material'

import { LoadingButton } from '../../shared/components'
import { useUpdateEmergencyContactMutation } from '../../wms-store/services/authService'

import { EmergencyContactSchema } from './constants'
import { EmergencyContactFields } from './EmergencyContactFields'

export const EmergencyContactForm = ({
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
  const [updateEmergencyContact, { isLoading }] = useUpdateEmergencyContactMutation()

  const {
    register,
    setValue,
    trigger,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(EmergencyContactSchema),
    defaultValues: defaultValues
  })

  const handleSaveEmergencyContact = (payload: any) => {
    const data = {
      userKey: currentUser?._id,
      name: payload.emergencyName,
      relationship: payload.emergencyRelationship,
      phoneNumber: payload.emergencyPhone
    }

    updateEmergencyContact(data)
      .then((response) => {
        if (response.data.status === 1) {
          toast.success('Emergency contact updated successfully')
          handleClose()
        }
      })
      .catch((err) => console.error(err))
  }

  return (
    <form className="mt-3" onSubmit={handleSubmit(handleSaveEmergencyContact)}>
      <EmergencyContactFields
        register={register}
        setValue={setValue}
        trigger={trigger}
        watch={watch}
        errors={errors}
        defaultCountry={defaultCountry}
      />

      <Box display="flex" mt="30px" alignItems="center" justifyContent="flex-end" gap="12px">
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
