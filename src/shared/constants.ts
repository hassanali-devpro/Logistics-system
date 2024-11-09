import * as yup from 'yup'

import { CONFIRMATION_MODAL, FORM_MODAL } from './components/Modals/constants'

export const DYNAMAKER_IFRAME_ID = 'dyna-maker-iframe'

export const isSideBarHiddenRoutes = ['/settings/warehouseconfigure', '/profile-edit']

export const colorSchema = yup
  .object({
    r: yup.number().required().min(0).max(255),
    g: yup.number().required().min(0).max(255),
    b: yup.number().required().min(0).max(255)
  })
  .required()

export { CONFIRMATION_MODAL, FORM_MODAL }

export type ToastType = 'success' | 'warn' | 'info' | 'error'

export type ResponseType = ToastType

export const defaultPageSizes = [25, 50, 100]
