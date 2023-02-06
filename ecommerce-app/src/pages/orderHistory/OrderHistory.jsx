import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Col, Container, Row } from 'reactstrap'
import Loader from '../../components/loader/Loader'
import useFetchCollection from '../../customHooks/useFetchCollection'
import { selectUserID } from '../../stores/slice/authSlice'
import { selectOrderHistory, STORE_ORDERS } from '../../stores/slice/orderSlice'
import styles from './OrderHistory.module.scss'

const OrderHistory = () => {
  const { data, isLoading } = useFetchCollection('orders')
  console.log(data)

  const orders = useSelector(selectOrderHistory)
  const userID = useSelector(selectUserID)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(STORE_ORDERS(data))
  }, [dispatch, data])

  const handleClick = (id) => {
    navigate(`/order-detail/${id}`)
  }

  const filteredOrders = orders.filter((order) => order.userID === userID)

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <div className={`wrapper ${styles.order}`}>
              <h2>Your Order History</h2>
              <p>
                Open an Order to leave a <b>Product Review</b>
              </p>
              <br />
              <>
                {isLoading && <Loader />}

                <div className={styles.table}>
                  {filteredOrders.length === 0 ? (
                    <p>No order found</p>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>s/n</th>
                          <th>Date</th>
                          <th>Order ID</th>
                          <th>Order Amount</th>
                          <th>Order Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((order, index) => {
                          const {
                            id,
                            orderDate,
                            orderTime,
                            orderAmount,
                            orderStatus,
                          } = order
                          return (
                            <tr key={id} onClick={() => handleClick(id)}>
                              <td>{index + 1}</td>
                              <td>
                                {orderDate} at {orderTime}
                              </td>
                              <td>{id}</td>
                              <td>
                                {'$'}
                                {orderAmount}
                              </td>
                              <td>
                                <p
                                  className={
                                    orderStatus !== 'Delivered'
                                      ? `${styles.pending}`
                                      : `${styles.delivered}`
                                  }
                                >
                                  {orderStatus}
                                </p>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default OrderHistory
