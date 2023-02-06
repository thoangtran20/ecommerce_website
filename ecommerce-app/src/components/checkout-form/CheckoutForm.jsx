import { addDoc, collection, Timestamp } from 'firebase/firestore'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { ROUTERS } from '../../constants'
import { db } from '../../firebase/config'
import { selectEmail, selectUserID } from '../../stores/slice/authSlice'
import {
  cartActions,
  selectCartItems,
  selectCartTotalAmount,
} from '../../stores/slice/cartSlice'
import { selectShippingAddress } from '../../stores/slice/checkoutSlice'
import styles from './CheckoutForm.module.scss'

const CheckoutForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userID = useSelector(selectUserID)
  const userEmail = useSelector(selectEmail)
  const cartItems = useSelector(selectCartItems)
  const cartTotalAmount = useSelector(selectCartTotalAmount)
  const shippingAddress = useSelector(selectShippingAddress)

  const saveOrder = () => {
    const today = new Date()
    const date = today.toDateString()
    const time = today.toLocaleTimeString()
    const orderConfig = {
      userID,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmount,
      orderStatus: 'Order Placed...',
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate(),
    }
    console.log(orderConfig)
    try {
      addDoc(collection(db, 'orders'), orderConfig)
      dispatch(cartActions.CLEAR_CART())
      toast.success('Order Saved!!')
      navigate(ROUTERS.checkoutSuccess)
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <>
      <section>
        <div className={`wrapper ${styles.checkout}`}>
          <h2>Payment!!</h2>
          <p>Thank you for shopping at the shop</p>
          <p>Click to payment!!!</p>

          <button className="--btn --btn-success" onClick={saveOrder}>
            Complete payment
          </button>
        </div>
      </section>
    </>
  )
}

export default CheckoutForm
