import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const initialState = {
  cartItems: localStorage.getItem('cartItemKey')
    ? JSON.parse(localStorage.getItem('cartItemKey'))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  previousURL: '',
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      const productItem = action.payload
      console.log(productItem)
      const productIndex = state.cartItems.findIndex(
        (item) =>
          item.sku === productItem.sku &&
          item.size === productItem.size &&
          item.color === productItem.color,
      )

      // console.log(state.cartItems[productIndex].cartQuantity)

      if (productIndex >= 0) {
        // Item already exists in the cart
        // Increase the cartQuantity
        state.cartItems[productIndex].cartQuantity += 1
        toast.info(`${productItem.name} increased by one`, {
          position: 'top-left',
        })
      } else {
        // Item doesn't exists in the cart
        // Add item to the cart
        const tempProduct = {
          ...productItem,
          cartQuantity: productItem.cartQuantity,
        }
        state.cartItems.push(tempProduct)
        toast.success(`${productItem.name} added to cart`, {
          position: 'top-left',
        })
      }
      // save cart to LS
      localStorage.setItem('cartItemKey', JSON.stringify(state.cartItems))
    },
    DECREASE_CART(state, action) {
      const productItem = action.payload
      console.log(productItem)
      const itemIndex = state.cartItems.findIndex(
        (item) =>
          item.sku === productItem.sku &&
          item.size === productItem.size &&
          item.color === productItem.color,
      )

      console.log(state.cartItems[itemIndex].cartQuantity)

      state.totalQuantity--

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1

        toast.info('Decreased product quantity', {
          position: 'bottom-left',
        })
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItem = state.cartItems.filter(
          (item) => item.sku !== action.payload.sku,
        )
        state.cartItems = nextCartItem

        toast.error('Product removed from cart', {
          position: 'bottom-left',
        })
      }
      localStorage.setItem('cartItemKey', JSON.stringify(state.cartItems))
    },
    REMOVE_FROM_CART(state, action) {
      const productItem = action.payload
      console.log(productItem)
      const newCartItem = state.cartItems.filter(
        (item) =>
          item.sku !== productItem.sku ||
          item.size !== productItem.size ||
          item.color !== productItem.color,
      )

      state.cartItems = newCartItem
      toast.success(`${productItem.name} removed from cart`, {
        position: 'top-left',
      })

      localStorage.setItem('cartItemKey', JSON.stringify(state.cartItems))
    },

    CALCULATE_SUBTOTAL(state, action) {
      const array = []
      state.cartItems.map((item) => {
        const { price, cartQuantity } = item
        console.log(cartQuantity)
        console.log(price)
        const cartItemAmount = price * cartQuantity
        return array.push(cartItemAmount)
      })
      const totalAmount = array.reduce((a, b) => {
        return a + b
      }, 0)
      state.cartTotalAmount = totalAmount
    },
    CALCULATE_TOTAL_QUANTITY(state, action) {
      const array = []
      state.cartItems.map((item) => {
        const { cartQuantity } = item
        const quantity = cartQuantity
        return array.push(quantity)
      })
      const totalQuantity = array.reduce((a, b) => {
        return a + b
      }, 0)
      state.cartTotalQuantity = totalQuantity
    },
    CLEAR_CART(state, action) {
      state.cartItems = []
      toast.info(`Cart cleared!!!`, {
        position: 'top-left',
      })
      localStorage.removeItem('cartItemKey')
    },
    SAVE_URL(state, action) {
      console.log(action.payload)
      state.previousURL = action.payload
    },
  },
})

export const cartActions = cartSlice.actions

export const selectCartItems = (state) => state.cart.cartItems
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount
export const selectPreviousURL = (state) => state.cart.previousURL

export const cartReducer = cartSlice.reducer
