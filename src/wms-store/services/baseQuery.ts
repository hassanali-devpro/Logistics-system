import { toast } from 'react-toastify'
import { BaseQueryApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { config } from '../../config'
import { ResponseType } from '../../shared/constants'
import { errorsToast } from '../../shared/helpers/applicationHelpers'

export const customBaseQuery = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: any) => {
  const result = await fetchBaseQuery({ baseUrl: config.API_BASE_URL })(args, api, extraOptions)

  if (result?.meta?.response?.status === 403 && !window.location.pathname.startsWith('/auth')) {
    window.location.href = '/auth'
  }

  const { type, responseMessage } = result?.data as any

  if (type && (type as ResponseType) !== 'success') errorsToast(responseMessage, type)
  else if (result?.error?.status === 'TIMEOUT_ERROR') toast.error('Connection timed out. Please try again later')

  return result
}
