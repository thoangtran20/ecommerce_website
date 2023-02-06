import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './CheckoutSummary.module.scss'
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'
import {
  cartActions,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from '../../stores/slice/cartSlice'
import { useEffect } from 'react'

const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartItems)
  const cartTotalAmount = useSelector(selectCartTotalAmount)
  // console.log(cartTotalAmount)
  const cartTotalQuantity = useSelector(selectCartTotalQuantity)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(cartActions.CALCULATE_SUBTOTAL())
  }, [cartItems, dispatch])

  return (
    <div>
      {' '}
      <h3>Checkout Summary</h3>
      <div>
        {cartItems.length === 0 ? (
          <>
            <p>No item in your cart.</p>
            <button className="--btn">
              <Link to="/#products">Back to shop</Link>
            </button>
          </>
        ) : (
          <>
            <div>
              <p>
                <b>{`Cart item(s): ${cartTotalQuantity}`}</b>
              </p>
              <div className={styles.text}>
                <h4>Subtotal:</h4>
                <h3>{cartTotalAmount.toFixed(2)}</h3>
              </div>
              {cartItems.map((item, index) => {
                const {
                  id,
                  imgURL,
                  name,
                  price,
                  size,
                  color,
                  cartQuantity,
                } = item
                const product = {
                  imgURL: imgURL,
                  name: name,
                  size: size,
                  color: color,
                }
                // console.log(product)
                return (
                  <Card key={id} cardClass={styles.card}>
                    <h4>
                      Product: {product.name} - {product.size} - {product.color}
                    </h4>
                    <img src={product.imgURL} alt="" />
                    <p>Quantity: {cartQuantity}</p>
                    <p>Unit price: {price}</p>
                    <p>Set price: {price * cartQuantity}</p>
                  </Card>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CheckoutSummary
