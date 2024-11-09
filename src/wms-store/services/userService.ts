import { createApi } from '@reduxjs/toolkit/query/react'
import qs from 'qs'

import { apiHeaders } from '../../shared/helpers/applicationHelpers'

import { customBaseQuery } from './baseQuery'

export const userService = createApi({
  reducerPath: 'userService',
  baseQuery: customBaseQuery,
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      providesTags: (result, _error) => (result?.status === 1 ? ['Users'] : []), // For setting up the cache in Redux state
      query: (params: any) => ({
        url: `/user/getall?${qs.stringify(params, { arrayFormat: 'brackets' })}`,
        headers: apiHeaders(),
        method: 'GET'
      })
    }),

    createUser: builder.mutation({
      // invalidate the Users cache if a user is created
      invalidatesTags: (result, _error) => (result?.status === 1 ? ['Users'] : []),
      query: (user: any) => ({
        url: '/user/create',
        headers: apiHeaders(),
        method: 'POST',
        body: user
      })
    }),

    deleteUser: builder.mutation({
      // invalidate the Users cache if a user is deleted
      invalidatesTags: (result, _error) => (result?.status === 1 ? ['Users'] : []),
      query: (userKey: string) => ({
        url: `/user/profile/delete?userKey=${userKey}`,
        headers: apiHeaders(),
        method: 'DELETE'
      })
    }),

    bulkUpdate: builder.mutation({
      // invalidate the Users cache if even a single user is updated
      invalidatesTags: (result, _error) => (result?.data?.some((res: any) => res.success) ? ['Users'] : []),
      query: (params: any) => ({
        url: '/user/bulk/update',
        headers: apiHeaders(),
        method: 'PUT',
        body: params
      })
    }),

    resendInvite: builder.mutation({
      invalidatesTags: (result, _error) => (result?.status === 1 ? ['Users'] : []),
      query: (userKey: any) => ({
        url: `/user/resendinvite?userKey=${userKey}`,
        headers: apiHeaders(),
        method: 'POST'
      })
    })
  })
})

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useBulkUpdateMutation,
  useResendInviteMutation
} = userService
