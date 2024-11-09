import { createSlice } from '@reduxjs/toolkit'

import { initialState } from '../initialState'

export const appNavigationSlice = createSlice({
  name: 'appNavigation',
  initialState: initialState.appNavigation,
  reducers: {
    setNavbarState: (state, action) => {
      state.isNavbarOpen = action.payload
    }
  }
})

export const { setNavbarState } = appNavigationSlice.actions

export default appNavigationSlice.reducer
