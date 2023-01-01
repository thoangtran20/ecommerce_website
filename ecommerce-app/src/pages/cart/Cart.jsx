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
import { useEffect } from 'react'

const Cart = () => {
  const cartItems = useSelector(selectCartItems)
  const cartTotalAmount = useSelector(selectCartTotalAmount)
  const cartTotalQuantity = useSelector(selectCartTotalQuantity)

  console.log(cartItems)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const clearCart = () => {
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
  }, [cartItems, dispatch])

  return (
    <Helmet title="Cart">
      <CommonSection title="Cart" />
      <section>
        <Container>
          <Row>
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
                              <b>{item.productName}</b>
                            </p>
                            <img
                              src={item.imgUrl}
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
                              onClick={() => removeFromCart(item)}
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
                <button className="clear__btn" onClick={() => clearCart()}>
                  Clear Cart
                </button>
                <div className="cart__checkout">
                  <h6 className="d-flex align-items-center justify-content-between">
                    Subtotal
                    <span className="fs-4 fw-bold">${cartTotalAmount}</span>
                  </h6>
                  <p className="fs-6 mt-2">
                    Taxes and shipping will calculate in checkout
                  </p>
                  <div>
                    <button className="buy__btn w-100">
                      <Link to="/checkout">Checkout</Link>
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
