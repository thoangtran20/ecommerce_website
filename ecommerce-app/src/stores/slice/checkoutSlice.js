import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  shippingAddress: {},
}

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    SAVE_SHIPPING_ADDRESS(state, action) {
      console.log(action.payload)
      state.shippingAddress = action.payload
    },
  },
})

export const { SAVE_SHIPPING_ADDRESS } = checkoutSlice.actions

export const selectShippingAddress = (state) => state.checkout.shippingAddress

export const checkoutReducer = checkoutSlice.reducer
