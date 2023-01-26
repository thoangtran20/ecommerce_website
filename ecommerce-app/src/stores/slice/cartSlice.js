import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const initialState = {
  cartItems: localStorage.getItem('cartItemKey')
    ? JSON.parse(localStorage.getItem('cartItemKey'))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      const newItem = action.payload
      console.log(newItem.sku)
      const existingItem = state.cartItems.find(
        (item) => item.sku === newItem.sku,
      )

      state.totalQuantity++
      console.log(newItem.amount)

      if (!existingItem) {
        state.cartItems.push({
          sku: newItem.sku,
          name: newItem.name,
          imgURL: newItem.imgURL,
          price: newItem.price,
          cartQuantity: newItem.amount,
          totalPrice: newItem.price,
          totalQuantity: newItem.amount,
        })
      } else {
        // existingItem.cartQuantity =
        //   Number(existingItem.cartQuantity) + Number(newItem.amount)
        console.log(existingItem.cartQuantity)
        let quantity = (existingItem.cartQuantity += 1)
        console.log(quantity)
        console.log(newItem.amount)
        const totalQuantity = quantity + newItem.amount
        console.log(totalQuantity)
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price)

        toast.info('Increased product quantity', {
          position: 'bottom-left',
        })
      }

      // state.totalAmount = state.cartItem.reduce(
      //   (total, item) => total + Number(item.price) * Number(item.quantity),
      //   0,
      // )

      // console.log(state.totalQuantity)
      console.log(state.cartItems)

      localStorage.setItem('cartItemKey', JSON.stringify(state.cartItems))
    },
    DECREASE_CART(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.sku === action.payload.sku,
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

        // state.totalAmount = state.cartItem.reduce(
        //   (total, item) => total + Number(item.price) * Number(item.quantity),
        //   0,
        // )

        // state.cartItem[itemIndex].totalPrice =
        //   Number(state.cartItem[itemIndex].totalPrice) +
        //   Number(state.cartItem[itemIndex].price)

        toast.error('Product removed from cart', {
          position: 'bottom-left',
        })
      }
      localStorage.setItem('cartItemKey', JSON.stringify(state.cartItems))
    },
    REMOVE_FROM_CART(state, action) {
      const newCartItem = state.cartItems.filter(
        (item) => item.sku !== action.payload.sku,
      )

      state.cartItems = newCartItem
      toast.success(`${action.payload.name} removed from cart`, {
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
      toast.info(`Cart cleared`, {
        position: 'top-left',
      })
      localStorage.setItem('cartItemKey', JSON.stringify(state.cartItems))
    },
  },
})

export const cartActions = cartSlice.actions

export const selectCartItems = (state) => state.cart.cartItems
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount

export const cartReducer = cartSlice.reducer
