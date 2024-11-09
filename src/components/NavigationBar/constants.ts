import {
  IconAward,
  IconBell,
  IconBoxSeam,
  IconBuildingWarehouse,
  IconCalendarTime,
  IconChartInfographic,
  IconForklift,
  IconHeadset,
  IconHelpCircle,
  IconHierarchy2,
  IconHome,
  IconListDetails,
  IconSettings,
  TablerIcon
} from '@tabler/icons-react'

export const drawerWidth = 240

export type AppRoute = {
  label: string
  path: string
  icon?: TablerIcon
}

export const primaryAppRoutes: AppRoute[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: IconHome
  },
  {
    label: 'Warehouse',
    path: '/warehouse',
    icon: IconBuildingWarehouse
  },
  {
    label: 'Inventory',
    path: '/inventory',
    icon: IconBoxSeam
  },
  {
    label: 'Orders',
    path: '/orders',
    icon: IconListDetails
  },
  {
    label: 'Quality',
    path: '/quality',
    icon: IconAward
  },
  {
    label: 'Rostering',
    path: '/rostering',
    icon: IconCalendarTime
  },
  {
    label: 'Suppliers / Vendors',
    path: '/suppliers',
    icon: IconHierarchy2
  },
  {
    label: 'Equipment',
    path: '/equipment',
    icon: IconForklift
  },
  {
    label: 'Analytics',
    path: '/analytics',
    icon: IconChartInfographic
  }
]

export const secondaryAppRoutes: AppRoute[] = [
  {
    label: 'Help Center',
    path: '/helpCenter',
    icon: IconHelpCircle
  },
  {
    label: 'Support',
    path: '/support',
    icon: IconHeadset
  },
  {
    label: 'Notifications',
    path: '/notification',
    icon: IconBell
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: IconSettings
  }
]
