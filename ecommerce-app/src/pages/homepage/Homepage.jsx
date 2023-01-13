import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import './Homepage.scss'
import Feature from '../../components/feature/Feature'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import Slider from '../../components/slider/Slider'
import ProductList from '../productList/ProductList'
// import { products } from '../../data/ProductData'
import Helmet from '../../components/helmet/Helmet'
import useFetchCollection from '../../customHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, STORE_PRODUCTS } from '../../stores/slice/productSlice'

const Homepage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [newArrivalProducts, setNewArrivalProducts] = useState([])

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

  // useEffect(() => {
  //   const filterFeaturedProducts = products.filter(
  //     (item) => item.category === 'T-shirt',
  //   )
  //   const filterNewArrivalProducts = products.filter(
  //     (item) => item.category === 'skirt',
  //   )
  //   setFeaturedProducts(filterFeaturedProducts)
  //   setNewArrivalProducts(filterNewArrivalProducts)
  // }, [])
  return (
    <Helmet title={'Home'}>
      <div className="homepage">
        <Slider />
        <Feature />
        <section className="product">
          <Container>
            <Row>
              <Col lg="12">
                <h2 className="section__title">Featured Products</h2>
                <p>Summer Collection New Modern Design</p>
              </Col>
              <ProductList products={products.slice(0, 6)} />
              {/* <ProductList data={products.slice(0, 6)} /> */}
            </Row>
          </Container>
        </section>
        <section className="banner">
          <Container>
            <Row>
              <Col>
                <h4>Repair Services</h4>
                <h2>
                  Up to <span>60% Off</span> - All T-shirts & Accessories
                </h2>
                <button className="explore">Explore More</button>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="product">
          <Container>
            <Row>
              <Col lg="12">
                <h2 className="section__title">New Arrivals</h2>
                <p>Summer Collection New Modern Design</p>
              </Col>
              <ProductList products={products.slice(12, 20)} />

              {/* <ProductList data={products.slice(12, 20)} /> */}
            </Row>
          </Container>
        </section>

        <section className="sm__banner">
          <Container>
            <Row>
              <Col lg="6" md="6">
                <div className="banner__box">
                  <h4>crazy deals</h4>
                  <h2>buy 1 get 1 free</h2>
                  <span>The best classic dress is on sale at cara</span>
                  <button>Learn More</button>
                </div>
              </Col>
              <Col lg="6" md="6">
                <div className="banner__box banner__box2">
                  <h4>spring/summer</h4>
                  <h2>upcoming season</h2>
                  <span>The best classic dress is on sale at cara</span>
                  <button>Collection</button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="pr__banner">
          <Container>
            <Row>
              <Col lg="4" md="">
                <div className="banner__box">
                  <h2>Personal Sale</h2>
                  <h3>Winter Collection -50% OFF</h3>
                </div>
              </Col>
              <Col lg="4" md="">
                <div className="banner__box banner__box2">
                  <h2>New Football Collection</h2>
                  <h3>Spring / Summer 2023</h3>
                </div>
              </Col>
              <Col lg="4" md="">
                <div className="banner__box banner__box3">
                  <h2>T-shirts</h2>
                  <h3>New Trendy Products</h3>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="new__letter">
          <Container>
            <Row>
              <Col lg="6">
                <div className="new__text">
                  <h4>Sign Up For Newsletters</h4>
                  <p>
                    Get E-mail updates about our latest shop and
                    <span> special offers.</span>
                  </p>
                </div>
              </Col>
              <Col lg="6">
                <div className="form">
                  <input type="text" placeholder="Your email address" />
                  <button>Sign Up</button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </Helmet>
  )
}

export default Homepage
