import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'reactstrap'
import styles from './ViewOrder.module.scss'
import useFetchDocument from '../../../customHooks/useFetchDocument'
import spinnerImg from '../../../assets/images/spinner.jpg'
import { Link, useParams } from 'react-router-dom'
import ChangeOrderStatus from '../changeOrderStatus/ChangeOrderStatus'

const ViewOrder = () => {
  const { id } = useParams()
  console.log(id)

  const [order, setOrder] = useState(null)
  const { document } = useFetchDocument('orders', id)

  console.log(document)

  useEffect(() => {
    setOrder(document)
  }, [document])

  console.log(order)

  return (
    <>
      <Container>
        <Row>
          <Col lg="12">
            <div className={styles.table}>
              <h2>Order Details</h2>
              <div>
                <Link to="/admin/orders">&larr; Back To Orders</Link>
              </div>
              <br />
              {order === null ? (
                <img
                  src={spinnerImg}
                  alt="Loading..."
                  style={{ width: '50px' }}
                />
              ) : (
                <>
                  <p>
                    <b>Order ID: </b> {order.id}
                  </p>
                  <p>
                    <b>Order Amount: </b> {order.orderAmount}
                  </p>
                  <p>
                    <b>Order Status: </b> {order.orderStatus}
                  </p>
                  <p>
                    <b>Shipping Address: </b>
                    <br />
                    Address: {order.shippingAddress.address},{' '}
                    {order.shippingAddress.city}
                    <br />
                    Country: {order.shippingAddress.country}
                  </p>
                  <br />
                  <Table responsive>
                    <thead>
                      <tr>
                        <th scope="row">s/n</th>
                        <th scope="row">Product</th>
                        <th scope="row">Price</th>
                        <th scope="row">Quantity</th>
                        <th scope="row">Total</th>
                        <th scope="row">UserEmail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.cartItems.map((cart, index) => {
                        const {
                          sku: id,
                          name,
                          size,
                          color,
                          price,
                          imgURL,
                          cartQuantity,
                        } = cart
                        console.log(cart)
                        return (
                          <tr key={id}>
                            <td>
                              <b>{index + 1}</b>
                            </td>
                            <td>
                              <p>
                                <b>
                                  {name} - {size} - {color}
                                </b>
                              </p>
                              <img
                                src={imgURL}
                                alt={name}
                                style={{ width: '100px' }}
                              />
                            </td>
                            <td>{price}</td>
                            <td>{cartQuantity}</td>
                            <td>{(price * cartQuantity).toFixed(2)}</td>
                            <td>{order.userEmail}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </>
              )}
              <ChangeOrderStatus order={order} id={id} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ViewOrder
