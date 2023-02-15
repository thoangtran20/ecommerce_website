import React from 'react'
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap'
import app from '../../assets/images/pay/app.jpg'
import play from '../../assets/images/pay/play.jpg'
import pay from '../../assets/images/pay/pay.png'

import logo from '../../assets/images/fashion-company-logo-png-transparent.png'
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa'
import './Footer.scss'
import { Link } from 'react-router-dom'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" className="mb-4" md="6">
            <div className="col">
              <div className="logo">
                <img src={logo} alt="" />
                <Link to="/" className="navbar-brand">
                  <span style={{ color: '#103755' }}>Clothing</span>
                  <span style={{ color: '#eeb808' }}>Store</span>
                </Link>
              </div>

              <h4>Contact</h4>
              <p>
                <strong>Address: </strong> 286 Tran Cao Van Road, Street 40, Da
                Nang, Viet Nam
              </p>
              <p>
                <strong>Phone:</strong> +01 2222 365 /(+84) 16 234 649
              </p>
              <p>
                <strong>Hours:</strong> 8:30 - 18:30, Mon - Sat
              </p>
              <div className="follow">
                <h4>Follow Us</h4>
                <div className="icon">
                  <i className="facebook">
                    <FaFacebookF />
                  </i>
                  <i className="twitter">
                    <FaTwitter />
                  </i>
                  <i className="instagram">
                    <FaInstagram />
                  </i>
                  <i className="pinterest">
                    <FaPinterestP />
                  </i>
                  <i className="youtube">
                    <FaYoutube />
                  </i>
                </div>
              </div>
            </div>
          </Col>
          <Col lg="2" md="3" className="mb-4">
            <div className="col">
              <h4>About</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">About Us</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Delivery Information</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Privacy Policy</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Terms & Condition</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Contact Us</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="2" md="3" className="mb-4">
            <div className="col">
              <h4>My Account</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Sign In</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">View Cart</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">My Wishlist</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Track My Order</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Help</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="4" md="4">
            <div className="col install">
              <h4>Install App</h4>
              <p>From App Store or Google Play</p>
              <div className="row">
                <img src={app} alt="" className="app" />
                <img src={play} alt="" className="play" />
              </div>
              <p>Secured Payment Gateways </p>
              <img src={pay} alt="" className="pay" />
            </div>
          </Col>
          <Col lg="12">
            <div className="copyright">
              <p>
                Copyright {year} developed by ClothingStore. All rights reserved
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
