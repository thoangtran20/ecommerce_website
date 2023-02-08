import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import styles from './OrderDetail.module.scss'
import spinnerImg from '../../assets/images/spinner.jpg'
import useFetchDocument from '../../customHooks/useFetchDocument'
import { Link } from 'react-router-dom'
import { Col, Container, Row, Table } from 'reactstrap'

const OrderDetail = () => {
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
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <div className={`wrapper ${styles.table}`}>
              <h2>Order Details</h2>
              <div>
                <Link to="/order-history">&larr; Back To Orders</Link>
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
                  <br />
                  <Table responsive>
                    <thead>
                      <tr>
                        <th scope="row">s/n</th>
                        <th scope="row">Product</th>
                        <th scope="row">Price</th>
                        <th scope="row">Quantity</th>
                        <th scope="row">Total</th>
                        <th scope="row">Action</th>
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
                            <td className={styles.icons}>
                              <Link to={`/review-product/${id}`}>
                                <button className="--btn --btn-primary">
                                  Review Product
                                </button>
                              </Link>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default OrderDetail
