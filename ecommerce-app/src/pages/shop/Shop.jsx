import React, { useEffect, useState } from 'react'
import CommonSection from '../../components/common-section/CommonSection'
import styles from './Shop.module.scss'
import Helmet from '../../components/helmet/Helmet'
import { Col, Container, Row } from 'reactstrap'
import ProductAction from '../../components/productAction/ProductAction'
import { FaCogs } from 'react-icons/fa'
import useFetchCollection from '../../customHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import {
  GET_PRICE_RANGE,
  selectProducts,
  STORE_PRODUCTS,
} from '../../stores/slice/productSlice'
import spinnerImg from '../../assets/images/spinner.jpg'
import ProductListShop from '../productList/ProductListShop'
import ProductFilter from '../../components/productFilter/ProductFilter'

const Shop = () => {
  const [showFilter, setShowFilter] = useState(false)
  // console.log(showFilter)

  // Lấy
  const { data, isLoading } = useFetchCollection('products')
  const products = useSelector(selectProducts)
  console.log(products)

  const dispatch = useDispatch()

  const url = window.location.href

  const scrollToProducts = () => {
    if (url.includes('#products')) {
      window.scrollTo({
        top: 700,
        behavior: 'smooth',
      })
      return
    }
  }

  useEffect(() => {
    scrollToProducts()
  }, [])

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      }),
    )
    dispatch(
      GET_PRICE_RANGE({
        products: data,
      }),
    )
  }, [dispatch, data])

  const toggleFilter = () => {
    setShowFilter(!showFilter)
  }
  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />
      <section>
        <div className={styles.products}>
          <Container>
            <Row>
              <Col lg="3">
                <aside
                  className={
                    showFilter
                      ? `${styles.filter} ${styles.show}`
                      : `${styles.filter}`
                  }
                >
                  {isLoading ? null : <ProductFilter />}
                </aside>
              </Col>
              <Col lg="9">
                <aside className={styles.actions}>
                  <ProductAction />
                  <div className={styles.contents}>
                    {isLoading ? (
                      <img
                        src={spinnerImg}
                        alt="Loading..."
                        style={{ width: '50px' }}
                        className="--center-all"
                      />
                    ) : (
                      <ProductListShop products={products} />
                    )}
                    <div className={styles.icon} onClick={toggleFilter}>
                      <FaCogs size={20} color="orangered" />
                      <p>
                        <b>{showFilter ? 'Hide Filter' : 'Show Filter'}</b>
                      </p>
                    </div>
                  </div>
                </aside>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </Helmet>
  )
}

export default Shop
