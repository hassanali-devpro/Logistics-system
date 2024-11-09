import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button } from '@mui/material'

import { CustomOutlinedInput } from '../../shared/components'
import { mapObjectsToOptions } from '../../shared/helpers/applicationHelpers'

import { createNewBayConfigOption, EditBayDetailsSchema } from './constants'

export const EditBayForm = ({
  edit,
  model,
  handleFormSubmit,
  handleCancel
}: {
  edit?: boolean
  model?: string
  handleFormSubmit: any
  handleCancel: any
}) => {
  const rackModels = useSelector((state: any) => state.warehouse.rackModels)

  const RackModelOptions = useMemo(() => {
    return mapObjectsToOptions(rackModels, 'id', 'model')
  }, [rackModels])

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(EditBayDetailsSchema),
    defaultValues: { model: RackModelOptions.find((rackModel) => rackModel.label === model)?.value ?? '' }
  })

  return (
    <Box>
      <Box display="flex" flexDirection="column" gap="16px">
        <CustomOutlinedInput
          select={edit}
          options={[...RackModelOptions, createNewBayConfigOption]}
          value={watch('model')}
          heading="Bay Model"
          isRequired
          name="model"
          register={register}
          error={errors?.model?.message}
          headingClass="text-[#353A46]"
        />

        <CustomOutlinedInput
          heading="Description"
          name="description"
          register={register}
          headingClass="text-[#353A46]"
          multiline
          placeholder="Bay Description entered here"
        />
      </Box>

      <Box display="flex" mt="16px" justifyContent="flex-end" gap="12px">
        <Button onClick={handleCancel} variant="outlined">
          Cancel
        </Button>

        <Button disabled={isSubmitting} variant="contained" onClick={handleSubmit(handleFormSubmit)}>
          {edit ? 'Edit' : 'Create'}
        </Button>
      </Box>
    </Box>
  )
}
