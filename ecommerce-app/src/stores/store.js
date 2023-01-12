import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slice/authSlice'
import { cartReducer } from './slice/cartSlice'
import { productReducer } from './slice/productSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})
