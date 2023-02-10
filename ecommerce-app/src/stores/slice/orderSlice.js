import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orderHistory: [],
  totalOrdersAmount: null,
}

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    STORE_ORDERS(state, action) {
      console.log(action.payload)
      state.orderHistory = action.payload
    },
    CALC_TOTAL_ORDERS_AMOUNT(state, action) {
      const array = []
      state.orderHistory.map((item) => {
        const { orderAmount } = item
        console.log(orderAmount)
        return array.push(orderAmount)
      })
      const totalAmount = array.reduce((a, b) => {
        return a + b
      }, 0)
      state.totalOrdersAmount = totalAmount
    },
  },
})

export const { STORE_ORDERS, CALC_TOTAL_ORDERS_AMOUNT } = orderSlice.actions

export const selectOrderHistory = (state) => state.orders.orderHistory

export const selectTotalOrdersAmount = (state) => state.orders.totalOrdersAmount

export const orderReducer = orderSlice.reducer
