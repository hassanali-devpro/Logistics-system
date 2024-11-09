import { Libraries } from '@react-google-maps/api'
import { IconArchive, IconCircleCheck, IconEdit, TablerIcon } from '@tabler/icons-react'
import * as yup from 'yup'

export const WarehouseSchema = yup.object({
  name: yup.string().trim().required('Warehouse name is required'),
  description: yup.string().trim(),
  address: yup.string().trim().required('Warehouse address is required')
})

export const warehouseStatusBackgroundColors: { [key: string]: string } = {
  active: '#D6F5E7',
  draft: '#D1E0FF',
  archived: '#D1D4DC'
}

export const warehouseStatusTextColors: { [key: string]: string } = {
  active: '#1E7B50',
  draft: '#003AAD',
  archived: '#4F5668'
}

export const warehouseStatusIcons: {
  [key: string]: TablerIcon
} = {
  active: IconCircleCheck,
  draft: IconEdit,
  archived: IconArchive
}

export const googlePlacesLibraries = ['places'] as Libraries
