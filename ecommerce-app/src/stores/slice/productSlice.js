import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  minPrice: null,
  maxPrice: null,
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    STORE_PRODUCTS(state, action) {
      // console.log(action.payload)
      state.products = action.payload.products
    },
    GET_PRICE_RANGE(state, action) {
      const { products } = action.payload
      const array = []
      products.map((product) => {
        const price = product.price
        return array.push(price)
      })
      // console.log(array)
      const maxPrice = Math.max(...array)
      const minPrice = Math.min(...array)
      // console.log(maxPrice, minPrice)

      state.minPrice = minPrice
      state.maxPrice = maxPrice
    },
  },
})

export const { STORE_PRODUCTS, GET_PRICE_RANGE } = productSlice.actions

export const selectProducts = (state) => state.product.products
export const selectMinPrice = (state) => state.product.minPrice
export const selectMaxPrice = (state) => state.product.maxPrice

export const productReducer = productSlice.reducer
