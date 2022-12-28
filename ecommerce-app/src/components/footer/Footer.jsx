import React from 'react'
import { RiMapPinLine, RiPhoneLine, RiMailLine } from 'react-icons/ri'
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
      {/* <Container>
        <Row>
          <Col lg="4" className="mb-4" md="6">
            <div className="logo">
              <div>
                <h1 className="text-white">ClothingStore</h1>
              </div>
            </div>
            <p className="footer__text mt-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book
            </p>
          </Col>
          <Col lg="3" md="3" className="mb-4">
            <div className="footer__quick-links">
              <h4 className="quick__links-title">Top Categories</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Modern Skirt</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Modern Short</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Modern Short</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Modern Jean</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="2" md="3" className="mb-4">
            <div className="footer__quick-links">
              <h4 className="quick__links-title">Useful Links</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/shop">Shop</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/cart">Cart</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/login">Login</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="3" md="4">
            <div className="footer__quick-links">
              <h4 className="quick__links-title">Contact</h4>
              <ListGroup className="footer__contact">
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i>
                      <RiMapPinLine />
                    </i>
                  </span>
                  <p>154 Tran Cao Van, Da Nang, Viet Nam</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i>
                      <RiPhoneLine />
                    </i>
                  </span>
                  <p>+0918814325</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i>
                      <RiMailLine />
                    </i>
                  </span>
                  <p>thoangtran20@gmail.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg="12">
            <p className="footer__copyright">
              Copyright {year} developed by Thoang Tran. All rights reserved
            </p>
          </Col>
        </Row>
      </Container> */}

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
              {/* <a href="*">Sign In</a>
              <a href="*">View Cart</a>
              <a href="*">My Wishlist</a>
              <a href="*">Track My Order</a>
              <a href="*">Help</a> */}
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
