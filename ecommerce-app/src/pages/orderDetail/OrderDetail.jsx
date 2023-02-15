import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import styles from './OrderDetail.module.scss'
import spinnerImg from '../../assets/images/spinner.jpg'
import useFetchDocument from '../../customHooks/useFetchDocument'
import { Link } from 'react-router-dom'
import { Col, Container, Row, Table } from 'reactstrap'
import Notiflix from 'notiflix'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { toast } from 'react-toastify'

const OrderDetail = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const { document } = useFetchDocument('orders', id)

  useEffect(() => {
    setOrder(document)
  }, [document])

  const confirmDelete = (id) => {
    Notiflix.Confirm.show(
      'Delete Product!!!',
      'You are about to delete to delete product',
      'Delete',
      'Cancel',
      function okCb() {
        deleteOrder(id)
      },
      function cancelCb() {
        console.log('Delete Canceled')
      },
      {
        width: '320px',
        borderRadius: '4px',
        titleColor: 'orangered',
        okButtonBackground: 'orangered',
        cssAnimationStyle: 'zoom',
      },
    )
  }

  const deleteOrder = async (id) => {
    try {
      await deleteDoc(doc(db, 'orders', id))
      toast.success('Order cancelled successfully')
    } catch (error) {
      toast.error(error.message)
    }
  }

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
                  <div className="--flex-between">
                    <p>
                      <b>Order Status: </b> {order.orderStatus}
                    </p>
                    {order.orderStatus !== 'Delivered' ? (
                      <button
                        onClick={() => confirmDelete(order.id)}
                        className="--btn --btn-danger"
                      >
                        Cancel Order
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>

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
