import { createApi } from '@reduxjs/toolkit/query/react'

import { apiHeaders } from '../../shared/helpers/applicationHelpers'

import { customBaseQuery } from './baseQuery'

export const roleService = createApi({
  reducerPath: 'roleService',
  baseQuery: customBaseQuery,
  tagTypes: ['Roles'],
  endpoints: (builder) => ({
    getActiveRoles: builder.query({
      providesTags: ['Roles'], // For setting up the cache in Redux state
      query: () => ({
        url: `/rbac/role/getall/active`,
        headers: apiHeaders(),
        method: 'GET'
      })
    })
  })
})

export const { useGetActiveRolesQuery } = roleService
