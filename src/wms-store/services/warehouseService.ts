import { createApi } from '@reduxjs/toolkit/query/react'
import qs from 'qs'

import { apiHeaders } from '../../shared/helpers/applicationHelpers'

import { customBaseQuery } from './baseQuery'

export const warehouseService = createApi({
  reducerPath: 'warehouseService',
  baseQuery: customBaseQuery,
  tagTypes: ['Warehouses', 'ActiveWarehouses', 'Warehouse'],
  endpoints: (builder) => ({
    getWarehouses: builder.query({
      providesTags: (result, _error) => (result?.status === 1 ? ['Warehouses'] : []),
      query: (params: any) => ({
        url: `/warehouse/getall?${qs.stringify(params, { arrayFormat: 'brackets' })}`,
        headers: apiHeaders(),
        method: 'GET'
      })
    }),

    getActiveWarehouses: builder.query({
      providesTags: (result, _error) => (result?.status === 1 ? ['ActiveWarehouses'] : []),
      query: (params: any) => ({
        url: `/warehouse/getall/active?${qs.stringify(params, { arrayFormat: 'brackets' })}`,
        headers: apiHeaders(),
        method: 'GET'
      })
    }),

    getWarehouse: builder.query({
      providesTags: (result, _error, arg) => (result?.status === 1 ? [{ type: 'Warehouse', id: arg }] : []),
      query: (whKey: string) => ({
        url: `/warehouse/get/bykey?whKey=${whKey}`,
        headers: apiHeaders(),
        method: 'GET'
      })
    }),

    createWarehouse: builder.mutation({
      invalidatesTags: (result, _error) => (result?.status === 1 ? ['Warehouses', 'ActiveWarehouses'] : []),
      query: (params: any) => ({
        url: '/warehouse/basic/add',
        headers: apiHeaders(),
        method: 'POST',
        body: params
      })
    }),

    updateWarehouse: builder.mutation({
      invalidatesTags: (result, _error, arg) =>
        result?.status === 1 ? [{ type: 'Warehouse', id: arg.whKey }, 'Warehouses', 'ActiveWarehouses'] : [],
      query: (params: any) => ({
        url: `/warehouse/update/basic?whKey=${params.whKey}`,
        headers: apiHeaders(),
        method: 'PUT',
        body: params
      })
    }),

    updateWarehouseStatus: builder.mutation({
      invalidatesTags: (result, _error, arg) =>
        result?.status === 1 ? [{ type: 'Warehouse', id: arg.whKey }, 'Warehouses', 'ActiveWarehouses'] : [],
      query: ({ whKey, status }: { whKey: string; status: string }) => ({
        url: `/warehouse/update/status?whKey=${whKey}&status=${status}`,
        headers: apiHeaders(),
        method: 'PUT'
      })
    }),

    deleteWarehouse: builder.mutation({
      invalidatesTags: (result, _error) => (result?.status === 1 ? ['Warehouses', 'ActiveWarehouses'] : []),
      query: (whKey: string) => ({
        url: `/warehouse/delete?whKey=${whKey}`,
        headers: apiHeaders(),
        method: 'DELETE'
      })
    })
  })
})

export const {
  useGetWarehousesQuery,
  useLazyGetWarehousesQuery,
  useGetWarehouseQuery,
  useLazyGetWarehouseQuery,
  useGetActiveWarehousesQuery,
  useLazyGetActiveWarehousesQuery,
  useCreateWarehouseMutation,
  useUpdateWarehouseMutation,
  useUpdateWarehouseStatusMutation,
  useDeleteWarehouseMutation
} = warehouseService
