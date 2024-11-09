import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { authService } from './services/authService'
import { roleService } from './services/roleService'
import { userService } from './services/userService'
import { warehouseService } from './services/warehouseService'
import rootReducer from './reducers'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authService.middleware,
      userService.middleware,
      roleService.middleware,
      warehouseService.middleware
    )
})

setupListeners(store.dispatch)

export default store
