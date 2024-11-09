import { ReactElement } from 'react'
import {
  IconAdjustmentsHorizontal,
  IconBoxSeam,
  IconBuildingWarehouse,
  IconKey,
  IconUserCircle,
  IconUsers,
  IconWorld
} from '@tabler/icons-react'

import { EditWarehouseIcon } from '../../shared/icons'

interface SettingsItem {
  path: string
  icon: ReactElement
  label: string
  text: string
}

export const settingsItems: SettingsItem[] = [
  {
    path: '/profile',
    icon: <IconUserCircle size={24} color="#354052" />,
    label: 'Profile',
    text: 'update personal information, password and more'
  },
  {
    path: '/appPreferences',
    icon: <IconAdjustmentsHorizontal size={24} color="#354052" />,
    label: 'App Preferences',
    text: 'subtitle'
  },
  {
    path: '/users',
    icon: <IconUsers size={24} color="#354052" />,
    label: 'Users',
    text: 'Add and manage members in your team'
  },
  {
    path: '/roles',
    icon: <IconKey size={24} color="#354052" />,
    label: 'Roles & Permissions',
    text: 'View, create and edit roles & permissions for your team'
  },
  {
    path: '/products',
    icon: <IconBoxSeam size={24} color="#354052" />,
    label: 'Products',
    text: 'Add and manage product in your inventory'
  },
  {
    path: '/warehouseCreate',
    icon: <EditWarehouseIcon size={24} />,
    label: 'Warehouse',
    text: 'Manage warehouse and edit the 3D model'
  },
  {
    path: '/business',
    icon: <IconBuildingWarehouse size={24} color="#354052" />,
    label: 'Business',
    text: 'Account detail'
  },
  {
    path: '/regionalSetting',
    icon: <IconWorld size={24} color="#354052" />,
    label: 'Regional Setting',
    text: 'Subtitle'
  }
].map((item) => ({
  ...item,
  path: `/settings${item.path}` // Appending '/setting' to the path
}))
