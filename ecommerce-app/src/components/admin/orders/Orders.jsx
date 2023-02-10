import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Col, Container, Row, Table } from 'reactstrap'
import useFetchCollection from '../../../customHooks/useFetchCollection'
import { selectUserID } from '../../../stores/slice/authSlice'
import styles from './Orders.module.scss'
import {
  selectOrderHistory,
  STORE_ORDERS,
} from '../../../stores/slice/orderSlice'
import Loader from '../../loader/Loader'

const Orders = () => {
  const { data, isLoading } = useFetchCollection('orders')
  console.log(data)

  const orders = useSelector(selectOrderHistory)
  console.log(orders)
  // const userID = useSelector(selectUserID)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(STORE_ORDERS(data))
  }, [dispatch, data])  

  const handleClick = (id) => {
    navigate(`/admin/view-order/${id}`)
  }

  // const filteredOrders = orders.filter((order) => order.userID === userID)
  // console.log(filteredOrders)

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <div className={`wrapper ${styles.order}`}>
              <h2>All Orders</h2>
              <p>
                Open an Order to <b>Change order status</b>
              </p>
              <br />
              <>
                {isLoading && <Loader />}

                <div className={styles.table}>
                  {orders.length === 0 ? (
                    <p>No order found</p>
                  ) : (
                    <Table>
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
                        {orders.map((order, index) => {
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
                    </Table>
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

export default Orders
