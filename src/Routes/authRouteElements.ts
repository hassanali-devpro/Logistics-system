import {
  CheckEmailPage,
  ForgotPasswordPage,
  LoginPage,
  NotFoundPage,
  PasswordUpdatePage,
  SetNewPasswordPage,
  VerifyPasswordPage
} from './AsyncComponents'

export const authRoutes = [
  { path: '/', element: LoginPage },
  { path: 'forget-password', element: ForgotPasswordPage },
  { path: 'check-email', element: CheckEmailPage },
  { path: 'set-new-password', element: SetNewPasswordPage },
  { path: 'password-update', element: PasswordUpdatePage },
  { path: 'verifypassword', element: VerifyPasswordPage },
  { path: '*', element: NotFoundPage }
]
