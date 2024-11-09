import { FormState, UseFormRegister, UseFormSetValue, UseFormTrigger, UseFormWatch } from 'react-hook-form'
import { Grid } from '@mui/material'

import { CustomOutlinedInput, CustomPhoneInput } from '../../shared/components'

export const EmergencyContactFields = ({
  register,
  setValue,
  watch,
  trigger,
  errors,
  defaultCountry
}: {
  register: UseFormRegister<any>
  setValue: UseFormSetValue<any>
  watch: UseFormWatch<any>
  trigger: UseFormTrigger<any>
  errors: FormState<any>['errors']
  defaultCountry: any
}) => {
  return (
    <Grid container rowSpacing="24px" columnSpacing="16px">
      <Grid item xs={12} sm={12} md={6}>
        <CustomOutlinedInput
          heading="Full Name"
          isRequired
          name="emergencyName"
          register={register}
          error={errors?.emergencyName?.message as string}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
        <CustomOutlinedInput
          heading="Relationship"
          isRequired
          name="emergencyRelationship"
          register={register}
          error={errors?.emergencyRelationship?.message as string}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomPhoneInput
          onChange={(value: any) => setValue('emergencyPhone', value, { shouldDirty: true })}
          heading="Emergency Phone Number"
          isRequired
          name="emergencyPhone"
          value={watch('emergencyPhone')}
          trigger={trigger}
          defaultCountry={defaultCountry}
          error={errors?.emergencyPhone?.message as string}
        />
      </Grid>
    </Grid>
  )
}
