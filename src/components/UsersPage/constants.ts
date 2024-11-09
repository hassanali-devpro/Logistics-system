import {
  IconArchive,
  IconCircleCheck,
  IconFile,
  IconHourglass,
  IconMailShare,
  IconShieldCheck,
  IconTrash,
  IconUserCheck,
  IconUsers,
  TablerIcon
} from '@tabler/icons-react'
import * as yup from 'yup'

export const USER_STATUSES = {
  INVITATION_SENT: 'invitation-send',
  PASSWORD_VERIFIED: 'password-verified',
  PENDING_INFO: 'pending-info',
  ACTIVE: 'active',
  ACTIVE_UPDATE: 'active-update',
  DEACTIVATED: 'deactivated',
  DELETED: 'deleted'
}

export const userStatusText: {
  [key: string]: string
} = {
  'invitation-send': 'Invite Sent',
  'password-verified': 'Pwd Verified',
  'pending-info': 'Pending Info',
  active: 'Active',
  deactivated: 'Deactivated',
  deleted: 'Deleted'
}

export const userStatusBackgroundColors: { [key: string]: string } = {
  'invitation-send': '#FFEECC',
  'password-verified': '#FFEECC',
  'pending-info': '#FFEECC',
  active: '#ADEBCE',
  deactivated: '#D1D4DC',
  deleted: '#FDD8D8'
}

export const userStatusTextColors: { [key: string]: string } = {
  'invitation-send': '#996600',
  'password-verified': '#996600',
  'pending-info': '#996600',
  active: '#28A46A',
  deactivated: '#4F5668',
  deleted: '#AF0909'
}

export const userStatusIcons: {
  [key: string]: TablerIcon
} = {
  'invitation-send': IconMailShare,
  'password-verified': IconShieldCheck,
  'pending-info': IconHourglass,
  active: IconCircleCheck,
  deactivated: IconArchive,
  deleted: IconTrash
}

export const userStatusFilterOptions = Object.entries(userStatusText).map(([key, value]) => ({
  value: key,
  label: value
}))

export const editUserStatusOptions = [
  {
    label: 'Deactivated',
    value: 'deactivated'
  },
  {
    label: 'Deleted',
    value: 'deleted'
  }
]

export const CreateUserSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .max(25, 'First name should be less than 25 characters')
    .required('First name is required'),
  lastName: yup
    .string()
    .trim()
    .max(25, 'Last name should be less than 25 characters')
    .required('Last name is required'),
  email: yup.string().email('Please enter a valid email').trim().required('Email is required'),
  role: yup.string().required('Role is required')
})

export const getSelectedUserAttributes = (user: any) => ({
  _id: user._id,
  image: user.image,
  givenName: user.givenName,
  lastName: user.lastName,
  email: user.email
})

export const roleSortOrder: { [key: string]: number } = {
  admin: 1,
  moderator: 2,
  employee: 3
}

export const statusSortOrder: { [key: string]: number } = {
  active: 1,
  'invitation-send': 2,
  'password-verified': 3,
  'pending-info': 4,
  deactivated: 5,
  deleted: 6
}

export const csvExportOptions = [
  {
    label: 'Selected Users',
    icon: IconUserCheck
  },
  {
    label: 'All Users',
    icon: IconUsers
  }
]

export const csvExportFieldOptions = [
  {
    label: 'All available fields',
    description: 'User information contains 12 fields'
  },
  {
    label: 'Only visible fields',
    description: 'Same information you see in this list'
  },
  {
    label: 'Only specific fields',
    description: 'Select only fields you need'
  }
]

export const csvExportFormatOptions = [
  {
    label: 'Excel File',
    icon: IconFile
  },
  {
    label: 'CSV File',
    icon: IconFile
  }
]

export const csvExportFields = [
  { label: 'First Name', value: 'givenName', disabled: true },
  { label: 'Last Name', value: 'lastName', disabled: true },
  { label: 'Email', value: 'email', disabled: true },
  { label: 'Image', value: 'image', disabled: true },
  { label: 'Role', value: 'userRole', disabled: true },
  { label: 'Status', value: 'status', disabled: true },
  { label: 'Created At', value: 'createdAt' },
  { label: 'Last Login At', value: 'lastLoginAt' },
  { label: 'Phone Number', value: 'phone' },
  { label: 'Date of Birth', value: 'DOB' }
]

export const defaultUsersTableFields = [
  { label: 'First Name', value: 'givenName' },
  { label: 'Last Name', value: 'lastName' },
  { label: 'Email', value: 'email' },
  { label: 'Image', value: 'image' },
  { label: 'Role', value: 'userRole' },
  { label: 'Status', value: 'status' }
].map((item) => ({
  ...item,
  included: true,
  disabled: true
}))
