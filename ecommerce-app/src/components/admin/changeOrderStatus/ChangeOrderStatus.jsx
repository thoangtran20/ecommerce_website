import React, { useState } from 'react'
import Loader from '../../loader/Loader'
import Card from '../../card/Card'
import styles from './ChangeOrderStatus.module.scss'
import { doc, setDoc, Timestamp } from 'firebase/firestore'
import { db } from '../../../firebase/config'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import { ROUTERS } from '../../../constants'
import { OrderStatus } from '../../../data/OrderStatus'

const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  console.log(order)
  const navigate = useNavigate()
  const editOrder = (e, id) => {
    e.preventDefault()
    setIsLoading(true)
    const orderConfig = {
      userID: order.userID,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      editAt: Timestamp.now().toDate(),
    }
    console.log(orderConfig)
    try {
      setDoc(doc(db, 'orders', id), orderConfig)
      setIsLoading(false)
      toast.success('Order status change successfully!!')
      navigate('/admin/orders')
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.status}>
        <Card cardClass={styles.card}>
          <h4>Update Status</h4>
          <form onSubmit={(e) => editOrder(e, id)}>
            <span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>
                  -- Choose one --
                </option>
                {OrderStatus.map((item, index) => (
                  <option value={item.value} key={index}>
                    {item.title}
                  </option>
                ))}
              </select>
            </span>
            <span>
              <button type="submit" className="--btn --btn-primary">
                Update Status
              </button>
            </span>
          </form>
        </Card>
      </div>
    </>
  )
}

export default ChangeOrderStatus
