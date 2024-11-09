import {
  IconBoxAlignBottom,
  IconBoxAlignLeft,
  IconBoxAlignRight,
  IconBoxAlignTop,
  TablerIcon
} from '@tabler/icons-react'
import * as yup from 'yup'

import { colorSchema } from '../../shared/constants'

export const TOP_NAV_HEIGHT = 60

export const ZoneTypes = [
  'Drop-zone',
  'Receiving',
  'Inspection',
  'Quarantine',
  'Inventory',
  'Work center',
  'Packaging',
  'Shipping dock',
  'Office',
  'Pedestrian'
].map((zone) => ({ label: zone, value: zone }))

export const RackSystemTypes = ['Drop-zone', 'Racking Row', 'Solo'].map((type) => ({ label: type, value: type }))

export const RackDirections = ['Horizontal', 'Vertical'].map((type) => ({ label: type, value: type }))

export const AngleOptions = [0, 90, 180, 270].map((angle) => ({ value: angle, label: `${angle}` }))

export const LayerOptions = Array.from({ length: 10 }, (_, index) => index).map((item) => ({
  label: `${item}`,
  value: item
}))

export const AngleOptionsWithIcons = [
  { angle: 0, Icon: IconBoxAlignTop },
  { angle: 180, Icon: IconBoxAlignBottom },
  { angle: 90, Icon: IconBoxAlignLeft },
  { angle: 270, Icon: IconBoxAlignRight }
]

interface IconComponents {
  [angle: string]: TablerIcon
}

export const RackIconsForAngles: IconComponents = {
  '0': IconBoxAlignTop,
  '90': IconBoxAlignLeft,
  '180': IconBoxAlignBottom,
  '270': IconBoxAlignRight
}

export const CreateZoneFormInitialState = {
  zoneType: ZoneTypes[0].value,
  color: {
    r: 50,
    g: 100,
    b: 150
  },
  layer: 0,
  xPoint: null,
  yPoint: null,
  angle: AngleOptions[0].value,
  width: null,
  depth: null,
  name: null
}

export const CreateObsFormInitialState = {
  color: {
    r: 50,
    g: 100,
    b: 150
  },
  layer: 0,
  xPoint: null,
  yPoint: null,
  angle: AngleOptions[0].value,
  width: null,
  depth: null,
  name: null
}

export const getCreateRackFormInitialState = (RackModelOptions: any[]) => {
  return {
    angle: AngleOptions[0].value,
    rackType: RackSystemTypes[0].value,
    rackModel: RackModelOptions?.[0]?.value,
    xPoint: null,
    yPoint: null,
    width: null,
    aisleName: ''
  }
}

export const obstacleValidationSchema = yup.object({
  xPoint: yup
    .number()
    .transform((value) => (isNaN(value) ? null : value))
    .required('X point is required')
    .test(
      'xPoint-non-negative',
      () => 'X point must be non negative',
      (value) => {
        return value !== undefined && value >= 0
      }
    ),
  yPoint: yup
    .number()
    .transform((value) => (isNaN(value) ? null : value))
    .required('Y point is required')
    .test(
      'yPoint-non-negative',
      () => 'Y point must be non negative',
      (value) => {
        return value !== undefined && value >= 0
      }
    ),
  angle: yup.number(),
  name: yup.string().trim().max(30, 'Name should be less than 30 characters').required('Name is required'),
  width: yup
    .number()
    .transform((value) => (isNaN(value) ? null : value))
    .required('Width is required')
    .test(
      'width-positive',
      () => 'Width must be greater than zero',
      (value) => {
        return value !== undefined && value > 0
      }
    ),
  depth: yup
    .number()
    .transform((value) => (isNaN(value) ? null : value))
    .required('Depth is required')
    .test(
      'depth-positive',
      () => 'depth must be greater than zero',
      (value) => {
        return value !== undefined && value > 0
      }
    ),
  color: colorSchema,
  layer: yup.number()
})

export const zoneValidationSchema = obstacleValidationSchema.shape({
  zoneType: yup.string().trim()
})

export const rackValidationSchema = yup.object({
  xPoint: yup
    .number()
    .transform((value) => (isNaN(value) ? null : value))
    .required('X point is required')
    .test(
      'xPoint-non-negative',
      () => 'X point must be non negative',
      (value) => {
        return value !== undefined && value >= 0
      }
    ),
  yPoint: yup
    .number()
    .transform((value) => (isNaN(value) ? null : value))
    .required('Y point is required')
    .test(
      'yPoint-non-negative',
      () => 'Y point must be non negative',
      (value) => {
        return value !== undefined && value >= 0
      }
    ),
  angle: yup.number(),
  rackType: yup.string(),
  aisleName: yup
    .string()
    .trim()
    .max(30, 'Aisle name should be less than 30 characters')
    .required('Aisle name is required'),
  rackModel: yup.string(),
  width: yup
    .number()
    .transform((value) => (isNaN(value) ? null : value))
    .required('Width is required')
    .test(
      'width-positive',
      () => 'Width must be greater than zero',
      (value) => {
        return value !== undefined && value > 0
      }
    )
})

export const Rack_BayDetailsSchema = yup.object({
  name: yup.string().trim().max(30, 'Bay name should be less than 30 characters').required('Bay name is required'),
  description: yup.string().trim()
})

export const EditBayDetailsSchema = yup.object({
  model: yup.string().trim().max(30, 'Bay model should be less than 30 characters').required('Bay model is required'),
  description: yup.string().trim()
})

export const createNewBayConfigOption = { label: 'Create New Bay Model', value: 'Create New Bay Model' }
