import {
  CreateWarehousePage,
  DashboardPage,
  NotFoundPage,
  ProgressPage,
  SettingsUserProfilePage,
  UserProfilePage,
  UsersPage,
  WarehouseSetupPage
} from './AsyncComponents'

export const privateRoutes = [
  { path: '/', element: DashboardPage },
  { path: 'settings', element: DashboardPage },
  { path: 'dashboard', element: ProgressPage },
  { path: 'settings/profile', element: UserProfilePage },
  { path: 'settings/users', element: UsersPage },
  { path: '/settings/users/profile', element: SettingsUserProfilePage },
  { path: 'settings/warehouseCreate', element: CreateWarehousePage },
  { path: 'settings/warehouseConfigure', element: WarehouseSetupPage },
  { path: 'warehouse', element: ProgressPage },
  { path: 'inventory', element: ProgressPage },
  { path: 'orders', element: ProgressPage },
  { path: 'quality', element: ProgressPage },
  { path: 'rostering', element: ProgressPage },
  { path: 'suppliers', element: ProgressPage },
  { path: 'equipment', element: ProgressPage },
  { path: 'analytics', element: ProgressPage },
  { path: 'helpCenter', element: ProgressPage },
  { path: 'notification', element: ProgressPage },
  { path: 'support', element: ProgressPage },
  { path: 'settings/appPreferences', element: ProgressPage },
  { path: 'settings/roles', element: ProgressPage },
  { path: 'settings/products', element: ProgressPage },
  { path: 'settings/business', element: ProgressPage },
  { path: 'settings/regionalSetting', element: ProgressPage },
  { path: '*', element: NotFoundPage }
]
