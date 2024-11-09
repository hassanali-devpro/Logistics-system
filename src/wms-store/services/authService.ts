import { createApi } from '@reduxjs/toolkit/query/react'

import { config } from '../../config'
import { apiHeaders } from '../../shared/helpers/applicationHelpers'

import { customBaseQuery } from './baseQuery'

export const authService = createApi({
  reducerPath: 'authService',
  tagTypes: ['UserProfile'],
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (params: any) => ({
        url: '/user/signin',
        headers: apiHeaders(),
        method: 'POST',
        body: params
      })
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/user/logout',
        headers: apiHeaders(),
        method: 'POST'
      })
    }),

    getUserProfile: builder.query({
      providesTags: (result, _error, { userKey }) =>
        result?.status === 1 ? [{ type: 'UserProfile', id: userKey }] : [],
      query: ({ userKey }: { userKey: string }) => ({
        url: `/user/profile/get?userKey=${userKey}`,
        headers: apiHeaders(),
        method: 'GET'
      })
    }),

    updateUserInfo: builder.mutation<any, { payload: FormData }>({
      queryFn: async ({ payload }) => {
        const result = await fetch(`${config.API_BASE_URL}/user/adduserinfo`, {
          method: 'POST',
          body: payload,
          headers: {
            Authorization: localStorage.getItem('authToken') || ''
          }
        })
        const data = await result.json()
        return { data }
      }
    }),

    updateUserProfile: builder.mutation({
      query: (params: any) => ({
        url: `/user/profile/update?userKey=${params.userKey}`,
        headers: apiHeaders(),
        method: 'PUT',
        body: params
      })
    }),

    updateProfileImage: builder.mutation<any, { payload: FormData; userKey: string }>({
      queryFn: async ({ payload, userKey }) => {
        const result = await fetch(`${config.API_BASE_URL}/user/profile/update/picture?userKey=${userKey}`, {
          method: 'PUT',
          body: payload,
          headers: {
            Authorization: localStorage.getItem('authToken') || ''
          }
        })
        const data = await result.json()
        return { data }
      }
    }),

    updateEmergencyContact: builder.mutation({
      query: (params: any) => ({
        url: `/user/profile/update/emergencycontact?userKey=${params.userKey}`,
        headers: apiHeaders(),
        method: 'PUT',
        body: params
      })
    }),

    updateUserStatus: builder.mutation({
      query: ({ userKey, status }: { userKey: string; status: string }) => ({
        url: `/user/profile/update/status?userKey=${userKey}&status=${status}`,
        headers: apiHeaders(),
        method: 'PUT'
      })
    }),

    updatePassword: builder.mutation({
      query: (params: any) => ({
        url: `/user/profile/update/password?userKey=${params.userKey}`,
        headers: apiHeaders(),
        method: 'PUT',
        body: params
      })
    }),

    resetPasswordRequest: builder.mutation({
      query: (params: any) => ({
        url: '/user/resetpasswordrequest',
        headers: apiHeaders(),
        method: 'POST',
        body: params
      })
    }),

    resetPassword: builder.mutation({
      query: (params: any) => ({
        url: `/user/resetpasswordresponse?userKey=${params.userKey}`,
        headers: apiHeaders(),
        method: 'PUT',
        body: params
      })
    }),

    verifyPassword: builder.mutation({
      query: (params: any) => ({
        url: `/user/verifypassword?userKey=${params.userKey}`,
        headers: apiHeaders(),
        method: 'POST',
        body: { password: params.password, newPassword: params.newPassword }
      })
    })
  })
})

export const {
  useLazyGetUserProfileQuery,
  useLoginMutation,
  useLogoutMutation,
  useGetUserProfileQuery,
  useUpdateUserInfoMutation,
  useUpdateUserProfileMutation,
  useUpdateUserStatusMutation,
  useUpdateProfileImageMutation,
  useUpdateEmergencyContactMutation,
  useUpdatePasswordMutation,
  useResetPasswordMutation,
  useResetPasswordRequestMutation,
  useVerifyPasswordMutation
} = authService
