import React, { useEffect } from 'react'
import styles from './AdminHome.module.scss'
import AdminOnlyRoute from '../../adminOnlyRoute/AdminOnlyRoute'
import { AiFillDollarCircle } from 'react-icons/ai'
import { BsCart4 } from 'react-icons/bs'
// import Chart from '../chart/Chart'
import InfoBox from '../infoBox/InfoBox'
import { FaCartArrowDown } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectProducts,
  STORE_PRODUCTS,
} from '../../../stores/slice/productSlice'

import {
  CALC_TOTAL_ORDERS_AMOUNT,
  selectOrderHistory,
  selectTotalOrdersAmount,
  STORE_ORDERS,
} from '../../../stores/slice/orderSlice'
import useFetchCollection from '../../../customHooks/useFetchCollection'
import Chart from '../chart/Chart'

const AdminHome = () => {
  // Icons
  const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />
  const productIcon = <BsCart4 size={30} color="#1f93ff" />
  const ordersIcon = <FaCartArrowDown size={30} color="orangered" />
  const dispatch = useDispatch()

  const products = useSelector(selectProducts)
  const orders = useSelector(selectOrderHistory)
  console.log(orders)
  const totalOrdersAmount = useSelector(selectTotalOrdersAmount)
  console.log(totalOrdersAmount)

  const fbProducts = useFetchCollection('products')
  console.log(fbProducts.data)
  const { data } = useFetchCollection('orders')

  useEffect(() => {
    dispatch(STORE_PRODUCTS({ products: fbProducts.data }))
    dispatch(STORE_ORDERS(data))
    dispatch(
      CALC_TOTAL_ORDERS_AMOUNT({
        amount: data,
      }),
    )
  }, [dispatch, data, fbProducts])

  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>
      <div className={styles['info__box']}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={'Earnings'}
          count={`$${totalOrdersAmount}`}
          icon={earningIcon}
        />

        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          title={'Products'}
          count={products.length}
          icon={productIcon}
        />

        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title={'Orders'}
          count={orders.length}
          icon={ordersIcon}
        />
      </div>
      <div>
        <Chart />
      </div>
    </div>
  )
}

export default AdminHome
