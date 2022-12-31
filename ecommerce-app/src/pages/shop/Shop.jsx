import React, { useState } from 'react'
import CommonSection from '../../components/common-section/CommonSection'
// import styles from './Shop.scss'
import './Shop.scss'
import Helmet from '../../components/helmet/Helmet'
import ProductFilter from '../../components/productFilter/ProductFilter'
import ProductList from '../productList/ProductList'
import { Col, Container, Row } from 'reactstrap'
import { products } from '../../data/ProductData'
import ProductAction from '../../components/productAction/ProductAction'
import Pagination from '../../components/pagination/Pagination'
import { FaCogs } from 'react-icons/fa'

const Shop = () => {
  const [productsData, setProductsData] = useState(products)
  const [showFilter, setShowFilter] = useState(false)

  console.log(productsData)
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
                  <ProductFilter />
                </aside>
              </Col>
              <Col lg="9">
                <aside className="action">
                  <ProductAction />
                </aside>
              </Col>

              <Col lg="12">
                <div className="contents">
                  <ProductList data={productsData} />
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
