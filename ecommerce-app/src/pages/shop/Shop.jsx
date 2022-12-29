import React, { useState } from 'react'
import CommonSection from '../../components/common-section/CommonSection'
import styles from './Shop.scss'
import Helmet from '../../components/helmet/Helmet'
import ProductFilter from '../../components/productFilter/ProductFilter'
import ProductList from '../productList/ProductList'
import { Col, Container, Row } from 'reactstrap'
import { products } from '../../data/ProductData'
import ProductAction from '../../components/productAction/ProductAction'

const Shop = () => {
  const [productsData, setProductsData] = useState(products)
  console.log(productsData)
  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />
      <section>
        <div className={`container${styles.product}`}>
          <Container>
            <Row>
              <Col lg="3">
                <aside className={styles.filter}>
                  <ProductFilter />
                </aside>
              </Col>
              <Col lg="9">
                <aside className={styles.action}>
                  <ProductAction />
                </aside>
              </Col>
              <Col lg="12">
                <div className=""></div>
                <div className={styles.content}>
                  <ProductList data={productsData} />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </Helmet>
  )
}

export default Shop
