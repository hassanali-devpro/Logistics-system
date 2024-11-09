import { FormState, UseFormRegister, UseFormSetValue, UseFormTrigger, UseFormWatch } from 'react-hook-form'
import { Box, Grid, Typography } from '@mui/material'
import { IconLock } from '@tabler/icons-react'

import { CustomOutlinedInput, CustomPhoneInput } from '../../shared/components'

import { GenderOptions } from './constants'

export const PersonalInformationFields = ({
  register,
  setValue,
  watch,
  trigger,
  errors,
  defaultCountry,
  hideEmail
}: {
  register: UseFormRegister<any>
  setValue: UseFormSetValue<any>
  watch: UseFormWatch<any>
  trigger: UseFormTrigger<any>
  errors: FormState<any>['errors']
  defaultCountry: any
  hideEmail?: boolean
}) => {
  return (
    <Grid container pb="24px" columnSpacing="16px" rowSpacing="24px">
      <Grid item xs={12} sm={12} md={6}>
        <CustomOutlinedInput
          heading="First Name"
          isRequired
          name="firstName"
          register={register}
          error={errors?.firstName?.message as string}
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

      {!hideEmail && (
        <Grid item xs={12}>
          <Box display="flex" flexDirection="column" gap="8px">
            <CustomOutlinedInput backgroundColor="#F3F4F6" disabled heading="Email" name="email" register={register} />

            <Box display="flex" alignItems="center" gap="8px">
              <IconLock color="#8B93A7" size={16} />

              <Typography variant="caption" color="#8B93A7">
                Email cannot be changed and it is use to access your account.
              </Typography>
            </Box>
          </Box>
        </Grid>
      )}

      <Grid item xs={12}>
        <CustomPhoneInput
          onChange={(value: any) => setValue('phone', value, { shouldDirty: true })}
          heading="Phone Number"
          trigger={trigger}
          isRequired
          name="phone"
          value={watch('phone')}
          defaultCountry={defaultCountry}
          error={errors?.phone?.message as string}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
        <CustomOutlinedInput type="date" heading="Date of Birth" name="dateOfBirth" register={register} />
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
        <CustomOutlinedInput
          heading="Gender"
          value={watch('gender')}
          select
          name="gender"
          register={register}
          options={GenderOptions}
        />
      </Grid>
    </Grid>
  )
}
