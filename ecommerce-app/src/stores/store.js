import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slice/authSlice'
import { cartReducer } from './slice/cartSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})
