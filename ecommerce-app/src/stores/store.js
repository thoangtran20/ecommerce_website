import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slice/authSlice'
import { cartReducer } from './slice/cartSlice'
import { checkoutReducer } from './slice/checkoutSlice'
import { filterReducer } from './slice/filterSlice'
import { productReducer } from './slice/productSlice'
import { wishListReducer } from './slice/wishListSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  filter: filterReducer,
  cart: cartReducer,
  wishList: wishListReducer,
  checkout: checkoutReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})
