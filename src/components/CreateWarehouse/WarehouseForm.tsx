// eslint-disable-next-line no-unused-vars
/* global google */
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material'
import { useLoadScript } from '@react-google-maps/api'

import { CustomOutlinedInput, LoadingButton } from '../../shared/components'
import { useCreateWarehouseMutation, useUpdateWarehouseMutation } from '../../wms-store/services/warehouseService'

import { googlePlacesLibraries, WarehouseSchema } from './constants'

import './WarehouseForm.css'

export const WarehouseForm = ({
  afterSubmit,
  handleClose,
  submitBtnText,
  edit
}: {
  afterSubmit?: any
  handleClose: any
  submitBtnText: string
  edit?: boolean
}) => {
  const [createWarehouse, { isLoading: isCreatingWarehouse }] = useCreateWarehouseMutation()
  const [updateWarehouse, { isLoading: isUpdatingWarehouse }] = useUpdateWarehouseMutation()

  const currentWarehouse = useSelector((state: any) => state.warehouse.currentWarehouse)
  const [libraries] = useState(googlePlacesLibraries)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(WarehouseSchema),
    defaultValues: edit ? { ...currentWarehouse } : {}
  })

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBAvpmsVZT-l4yMZYxTiWiPiVH1mRcUAjI',
    libraries: libraries
  })

  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (isLoaded && inputRef.current) {
      new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        fields: ['formatted_address', 'address_components', 'geometry', 'name', 'url', 'vicinity']
      })
    }
  }, [isLoaded])

  const handleFormSubmit = (payload: any) => {
    if (edit) {
      updateWarehouse({
        whKey: currentWarehouse?._id,
        ...payload
      })
        .then((res) => {
          if (res.data?.status === 1) {
            toast.success('Warehouse updated successfully!')
            handleClose()
            afterSubmit && afterSubmit()
          }
        })
        .catch((err) => console.error(err))
    } else {
      createWarehouse(payload)
        .then((res) => {
          if (res.data?.status === 1) {
            toast.success('Warehouse created successfully!')
            handleClose()
            afterSubmit && afterSubmit()
          }
        })
        .catch((err) => console.error(err))
    }
  }

  return (
    <div className="bg-white rounded-lg">
      <div className="mb-2">
        <div className="mb-4">
          <CustomOutlinedInput
            register={register}
            name="name"
            error={errors?.name?.message as string}
            heading="Warehouse Name"
            isRequired
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register('description')}
            name="description"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Add a description"
          />
        </div>

        <div className="mb-4">
          <CustomOutlinedInput
            inputRef={inputRef}
            register={register}
            name="address"
            error={errors?.address?.message as string}
            heading="Address"
            isRequired
          />
        </div>
      </div>

      <div className="flex justify-end mt-5 gap-2">
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>

        <LoadingButton
          variant="contained"
          isLoading={isCreatingWarehouse || isUpdatingWarehouse || isSubmitting}
          disabled={isCreatingWarehouse || isUpdatingWarehouse || isSubmitting || !isDirty}
          onClick={handleSubmit(handleFormSubmit)}>
          {submitBtnText}
        </LoadingButton>
      </div>
    </div>
  )
}
