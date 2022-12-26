import React from 'react'
import f1 from '../../assets/images/features/f1.png'
import f2 from '../../assets/images/features/f2.png'
import f3 from '../../assets/images/features/f3.png'
import f4 from '../../assets/images/features/f4.png'
import f5 from '../../assets/images/features/f5.png'
import f6 from '../../assets/images/features/f6.png'

import './Feature.scss'

import { Col, Container, Row } from 'reactstrap'
import FeatureData from '../../data/FeatureData'

const Feature = () => {
  return (
    <section id="feature" className="feature">
      <Container>
        <Row>
          {FeatureData.map((item, index) => (
            <Col lg="2" md="4" className="mb-10" key={index}>
              <div className="fe__box">
                <img src={item.img} alt="" />
                <h6>{item.title}</h6>
              </div>
            </Col>
          ))}
          {/* <Col lg="2" md="4" className="mb-10">
            <div className="fe__box">
              <img src={f1} alt="" />
              <h6>Free Shipping</h6>
            </div>
          </Col>
          <Col lg="2" md="4">
            <div className="fe__box">
              <img src={f2} alt="" />
              <h6>Online Order</h6>
            </div>
          </Col>
          <Col lg="2" md="4">
            <div className="fe__box">
              <img src={f3} alt="" />
              <h6>Save Money</h6>
            </div>
          </Col>
          <Col lg="2" md="4">
            <div className="fe__box">
              <img src={f4} alt="" />
              <h6>Promotions</h6>
            </div>
          </Col>
          <Col lg="2" md="4">
            <div className="fe__box">
              <img src={f5} alt="" />
              <h6>Happy SelHappy Sell</h6>
            </div>
          </Col>
          <Col lg="2" md="4">
            <div className="fe__box">
              <img src={f6} alt="" />
              <h6>F24/7 Support</h6>
            </div>
          </Col> */}
        </Row>
      </Container>
    </section>
  )
}

export default Feature
