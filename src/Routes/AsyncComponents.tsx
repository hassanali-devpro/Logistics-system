import { lazy } from 'react'

export const LoginPage = lazy(() => import('../components/Login/Login'))

export const ForgotPasswordPage = lazy(() => import('../components/ForgotPassword/ForgotPassword'))

export const CheckEmailPage = lazy(() => import('../components/CheckEmail/CheckEmail'))

export const SetNewPasswordPage = lazy(() => import('../components/SetNewPassword/SetNewPassword'))

export const PasswordUpdatePage = lazy(() => import('../components/PasswordUpdate/PasswordUpdate'))

export const VerifyPasswordPage = lazy(() => import('../components/VerifyPassword/VerifyPassword'))

export const DashboardPage = lazy(() => import('../components/Dashboard/Dashboard'))

export const ProgressPage = lazy(() => import('../components/ProgressPage'))

export const UserProfilePage = lazy(() => import('../components/UserProfile/UserProfile'))

export const SettingsUserProfilePage = lazy(() => import('../components/SettingsUserProfile'))

export const UsersPage = lazy(() => import('../components/UsersPage/UsersPage'))

export const CreateWarehousePage = lazy(() => import('../components/CreateWarehouse/CreateWarehouse'))

export const WarehouseSetupPage = lazy(() => import('../components/WarehouseSetup/WarehouseSetup'))

export const NotFoundPage = lazy(() => import('../components/NotFound/Index'))
