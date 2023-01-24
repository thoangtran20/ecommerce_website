import React, { useEffect, useState } from 'react'
import CommonSection from '../../components/common-section/CommonSection'
// import styles from './Shop.scss'
import './Shop.scss'
import Helmet from '../../components/helmet/Helmet'
import ProductFilter from '../../components/productFilter/ProductFilter'
import ProductList from '../productList/ProductList'
import { Col, Container, Row } from 'reactstrap'
// import { products } from '../../data/ProductData'
import ProductAction from '../../components/productAction/ProductAction'
import Pagination from '../../components/pagination/Pagination'
import { FaCogs } from 'react-icons/fa'
import useFetchCollection from '../../customHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, STORE_PRODUCTS } from '../../stores/slice/productSlice'
import spinnerImg from '../../assets/images/spinner.jpg'

const Shop = () => {
  // const [productsData, setProductsData] = useState(products)
  const [showFilter, setShowFilter] = useState(false)

  const { data, isLoading } = useFetchCollection('products')
  const products = useSelector(selectProducts)
  console.log(products)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      }),
    )
  }, [dispatch, data])

  // console.log(productsData)
  const toggleFilter = () => {
    setShowFilter(!showFilter)
  }
  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />
      <section>
        <div className="product">
          <Container>
            <Row>
              <Col lg="3">
                <aside className="filter">
                  {isLoading ? null : <ProductFilter />}
                </aside>
              </Col>
              <Col lg="9">
                <aside className="action">
                  <ProductAction />
                </aside>
              </Col>

              <Col lg="12">
                <div className="contents">
                  {isLoading ? (
                    <img
                      src={spinnerImg}
                      alt="Loading..."
                      style={{ width: '50px' }}
                      className="--center-all"
                    />
                  ) : (
                    <ProductList products={products} />
                  )}
                  <div className="icon" onClick={toggleFilter}>
                    <FaCogs size={20} color="orangered" />
                    <p>
                      <b>{showFilter ? 'Hide Filter' : 'Show Filter'}</b>
                    </p>
                  </div>
                </div>

                <Pagination />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </Helmet>
  )
}

export default Shop
