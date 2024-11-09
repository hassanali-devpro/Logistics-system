import { createSlice } from '@reduxjs/toolkit'

import { ResponseType } from '../../shared/constants'
import { initialState } from '../initialState'
import { roleService } from '../services/roleService'

export const roleSlice = createSlice({
  name: 'role',
  initialState: initialState.role,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(roleService.endpoints.getActiveRoles.matchFulfilled, (state, action) => {
      if (['success', 'info'].includes(action.payload?.type as ResponseType)) {
        state.activeRoles = action.payload?.data
      }
    })
  }
})

export default roleSlice.reducer
