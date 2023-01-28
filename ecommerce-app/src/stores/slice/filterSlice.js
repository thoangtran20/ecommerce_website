import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filteredProducts: [],
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { products, search } = action.payload
      const tempProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase()),
      )

      state.filteredProducts = tempProducts
    },
    SORT_PRODUCTS(state, action) {
      const { products, sort } = action.payload
      let tempProducts = []
      if (sort === 'latest') {
        tempProducts = products
      }
      if (sort === 'lowest-price') {
        tempProducts = products.slice().sort((a, b) => {
          return a.price - b.price
        })
      }
      if (sort === 'highest-price') {
        tempProducts = products.slice().sort((a, b) => {
          return b.price - a.price
        })
      }
      if (sort === 'a-z') {
        tempProducts = products.slice().sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
      }
      if (sort === 'z-a') {
        tempProducts = products.slice().sort((a, b) => {
          return b.name.localeCompare(a.name)
        })
      }
      state.filteredProducts = tempProducts
    },
    FILTER_BY_CATEGORY(state, action) {
      const { products, category } = action.payload
      let tempProducts = []
      if (category === 'All') {
        tempProducts = products
      } else {
        tempProducts = products.filter(
          (product) => product.category === category,
        )
      }
      state.filteredProducts = tempProducts
    },
    FILTER_BY_BRAND(state, action) {
      const { products, brand } = action.payload
      let tempProducts = []
      if (brand === 'All') {
        tempProducts = products
      } else {
        tempProducts = products.filter((product) => product.brand === brand)
      }
      state.filteredProducts = tempProducts
    },
    FILTER_BY_PRICE(state, action) {
      const { products, price } = action.payload
      let tempProducts = []
      tempProducts = products.filter((product) => product.price <= price)

      state.filteredProducts = tempProducts
    },
    FILTER_BY_SIZE(state, action) {
      const { products, size } = action.payload
      // console.log(products)
      // console.log(size)

      // const allSizes = new Set([...products.map((product) => product.size)])
      // console.log(allSizes)

      // const arr = Array.from(allSizes)
      // console.log(arr)

      // const arr = Array.from(allSizes)
      // console.log(arr)

      let tempProducts = []
      if (size === 'All') {
        tempProducts = products
      } else {
        tempProducts = products.filter((product) => product.size.includes(size))
        console.log(tempProducts)
      }
      state.filteredProducts = tempProducts
    },
    FILTER_BY_COLOR(state, action) {
      const { products, color } = action.payload
      console.log(products)
      console.log(color)

      let tempProducts = []
      if (color === 'All') {
        tempProducts = products
      } else {
        tempProducts = products.filter((product) =>
          product.colors.includes(color),
        )
        console.log(tempProducts)
      }
      state.filteredProducts = tempProducts
    },
  },
})

export const {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
  FILTER_BY_SIZE,
  FILTER_BY_COLOR,
} = filterSlice.actions

export const selectFilteredProducts = (state) => state.filter.filteredProducts

export const filterReducer = filterSlice.reducer
