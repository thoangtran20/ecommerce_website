import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  cartActions,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from '../../stores/slice/cartSlice'
import { Col, Container, Row } from 'reactstrap'
import './Cart.scss'
import CommonSection from '../../components/common-section/CommonSection'
import Helmet from '../../components/helmet/Helmet'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/helper,'
import AmountButton from '../../components/amount-button/AmountButton'
import { FaTrashAlt } from 'react-icons/fa'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { ExclamationCircleFilled } from '@ant-design/icons'

import { useEffect } from 'react'
import { message, Modal, notification } from 'antd'
import { selectIsLoggedIn } from '../../stores/slice/authSlice'
import { ROUTERS } from '../../constants'

const Cart = () => {
  const cartItems = useSelector(selectCartItems)
  const cartTotalAmount = useSelector(selectCartTotalAmount)
  const cartTotalQuantity = useSelector(selectCartTotalQuantity)

  console.log(cartItems)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [messageApi, contextHolder] = message.useMessage()

  const isLoggedIn = useSelector(selectIsLoggedIn)

  const clearCart = () => {
    messageApi.open({
      type: 'success',
      content: 'Clear cart success!!!',
    })
    dispatch(cartActions.CLEAR_CART())
  }
  const removeFromCart = (cart) => {
    dispatch(cartActions.REMOVE_FROM_CART(cart))
  }

  const increase = (cart) => {
    dispatch(cartActions.ADD_TO_CART(cart))
  }
  const decrease = (cart) => {
    dispatch(cartActions.DECREASE_CART(cart))
  }

  useEffect(() => {
    dispatch(cartActions.CALCULATE_SUBTOTAL())
    dispatch(cartActions.CALCULATE_TOTAL_QUANTITY())
    dispatch(cartActions.SAVE_URL(''))
  }, [cartItems, dispatch])

  const url = window.location.href

  const checkout = () => {
    if (isLoggedIn) {
      navigate(ROUTERS.checkoutDetails)
    } else {
      dispatch(cartActions.SAVE_URL(url))
      navigate(ROUTERS.login)
    }
  }
  const { confirm } = Modal

  const showConfirmDeleteItems = (cart) => {
    confirm({
      title: 'Do you want to delete these items?',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      onOk() {
        console.log('OK')
        removeFromCart(cart)
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const showConfirmClear = () => {
    confirm({
      title: 'Do you want to clear the cart',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      onOk() {
        console.log('OK')
        clearCart()
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const backToPrevious = () => {
    navigate(-1)
  }

  return (
    <Helmet title="Cart">
      <CommonSection title="Cart" />
      <section>
        <Container>
          <Row>
            {contextHolder}

            <Col lg="12">
              {cartItems.length === 0 ? (
                <>
                  <div className="empty">
                    <h2 className="text-center">No item added to the cart</h2>
                    <br />
                    <Link to="/shop" className="btn btn-warning">
                      Fill it
                    </Link>
                  </div>
                </>
              ) : (
                <table className="table borded">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Item</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>SubTotal</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => {
                      console.log(item)
                      return (
                        <tr key={item.sku}>
                          <td>{index + 1}</td>
                          <td>
                            <p>
                              <b>{item.name} - </b>
                              <b>{item.size} - </b>
                              <b>{item.color}</b>
                            </p>

                            <img
                              src={item.imgURL}
                              alt=""
                              style={{ width: '100px' }}
                            />
                          </td>
                          <td>${`${item.price}`}</td>
                          <td className="amount">
                            <div className="cart-product-quantity">
                              <button onClick={() => decrease(item)}>
                                <i>
                                  <AiOutlineMinus />
                                </i>
                              </button>
                              <div className="count">{item.cartQuantity}</div>
                              <button onClick={() => increase(item)}>
                                <i>
                                  <AiOutlinePlus />
                                </i>
                              </button>
                            </div>{' '}
                          </td>
                          <td>${`${item.price * item.cartQuantity}`}</td>
                          <td className="icons">
                            <FaTrashAlt
                              size={19}
                              color="red"
                              onClick={() => showConfirmDeleteItems(item)}
                            />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </Col>

            <Col lg="12" className=" ">
              <div className="cart__summary">
                <div className="cart__button">
                  <button
                    className="clear__btn"
                    onClick={() => showConfirmClear()}
                  >
                    Clear Cart
                  </button>
                  <button className="back__btn" onClick={backToPrevious}>
                    &larr; Back
                  </button>
                </div>

                <div className="cart__checkout">
                  <h6 className="d-flex align-items-center justify-content-between">
                    Subtotal
                    <span className="fs-4 fw-bold">
                      ${cartTotalAmount.toFixed(2)}
                    </span>
                  </h6>
                  <p className="fs-6 mt-2">
                    Taxes and shipping will calculate in checkout
                  </p>
                  <div>
                    <button className="buy__btn w-100" onClick={checkout}>
                      Checkout
                    </button>

                    <button className="buy__btn w-100 mt-3">
                      <Link to="/shop">Continue Shopping</Link>
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Cart
