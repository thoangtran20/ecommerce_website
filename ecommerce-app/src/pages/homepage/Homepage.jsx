import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import './Homepage.scss'
import Feature from '../../components/feature/Feature'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import Slider from '../../components/slider/Slider'
import ProductList from '../productList/ProductList'

const Homepage = () => {
  return (
    <>
      <Header />
      <div className="homepage">
        <Slider />
        <Feature />
        <section className="product">
          <Container>
            <Row>
              <Col>
                <h2 className="section__title">Featured Products</h2>
                <p>Summer Collection</p>
              </Col>
              <ProductList />
            </Row>
          </Container>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Homepage
