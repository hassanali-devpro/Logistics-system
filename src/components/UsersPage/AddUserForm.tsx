import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import { IconKey } from '@tabler/icons-react'

import { CustomOutlinedInput, LoadingButton } from '../../shared/components'
import { InfoIcon } from '../../shared/icons'
import { useCreateUserMutation } from '../../wms-store/services/userService'

import { CreateUserSchema } from './constants'

export const AddUserForm = ({ handleClose, roleOptions }: { handleClose: any; roleOptions: any[] }) => {
  const [createUser, { isLoading }] = useCreateUserMutation()

  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(CreateUserSchema)
  })

  const handleCreateUser = (payload: any) => {
    createUser({
      givenName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      autoGeneratePassword: true,
      password: '',
      type: 'employee',
      role: payload.role
    })
      .then((res) => {
        if (res.data?.status === 1) {
          handleClose()
          toast.success('Invitation sent successfully')
        }
      })
      .catch((err) => console.error(err))
  }

  return (
    <Box className="mb-2">
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <Grid container columnSpacing="16px" rowSpacing="16px">
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap="8px">
              <Box
                width="40px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="40px"
                borderRadius="8px"
                bgcolor="#F3F4F6">
                <InfoIcon size={24} />
              </Box>
              <Typography variant="h6" fontWeight={600} color="#1A1D23">
                User Information
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <CustomOutlinedInput
              name="firstName"
              register={register}
              isRequired
              error={errors.firstName?.message as string}
              heading="First Name"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <CustomOutlinedInput
              heading="Last Name"
              isRequired
              name="lastName"
              register={register}
              error={errors?.lastName?.message as string}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomOutlinedInput
              heading="Email"
              isRequired
              name="email"
              register={register}
              error={errors?.email?.message as string}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ borderBottomWidth: '2px' }} className="!text-[#D1D4DC] !my-3" />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap="8px">
              <Box
                width="40px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="40px"
                borderRadius="8px"
                bgcolor="#F3F4F6">
                <IconKey size={24} color="#4F5668" />
              </Box>
              <Typography variant="h6" fontWeight={600} color="#1A1D23">
                Role & Permissions
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <CustomOutlinedInput
              heading="Role"
              isRequired
              value={watch('role')}
              select
              placeholder="--- Select a role ---"
              name="role"
              register={register}
              options={roleOptions}
              error={errors?.role?.message as string}
            />
          </Grid>
        </Grid>
        <Box display="flex" mt="24px" justifyContent="flex-end" gap="12px">
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>

          <LoadingButton
            isLoading={isSubmitting || isLoading}
            variant="contained"
            disabled={isSubmitting || isLoading}
            type="submit">
            Send invitation
          </LoadingButton>
        </Box>
      </form>
    </Box>
  )
}
