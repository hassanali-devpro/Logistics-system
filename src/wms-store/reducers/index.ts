import { combineReducers } from '@reduxjs/toolkit'

import { authService } from '../services/authService'
import { roleService } from '../services/roleService'
import { userService } from '../services/userService'
import { warehouseService } from '../services/warehouseService'

import appNavigationReducer from './appNavigationReducer'
import authReducer from './authReducer'
import roleReducer from './roleReducer'
import warehouseReducer from './warehouseReducer'

const rootReducer = combineReducers({
  appNavigation: appNavigationReducer,
  warehouse: warehouseReducer,
  auth: authReducer,
  role: roleReducer,
  [authService.reducerPath]: authService.reducer,
  [userService.reducerPath]: userService.reducer,
  [roleService.reducerPath]: roleService.reducer,
  [warehouseService.reducerPath]: warehouseService.reducer
})

export default rootReducer
