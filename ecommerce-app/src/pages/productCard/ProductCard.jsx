import React from 'react'
import f1 from '../../assets/images/products/f1.jpg'
import { Col } from 'reactstrap'
import './ProductCard.scss'
import { RiStarFill } from 'react-icons/ri'
import { BsFillCartPlusFill } from 'react-icons/bs'

const ProductCard = () => {
  return (
    <>
      <Col lg="3" md="4" className="mb-2">
        <div className="product__item">
          <div className="product__img">
            <img src={f1} alt="" />
          </div>
          <div className="product__info">
            <span>adidas</span>
            <h5>Cartoon Astronaut T-Shirts</h5>
            <div className="star">
              <i>
                <RiStarFill />
              </i>
              <i>
                <RiStarFill />
              </i>
              <i>
                <RiStarFill />
              </i>
              <i>
                <RiStarFill />
              </i>
              <i>
                <RiStarFill />
              </i>
            </div>
            <h4>$78</h4>
          </div>
          <a href="">
            <i className="cart">
              <BsFillCartPlusFill />
            </i>
          </a>
        </div>
      </Col>
    </>
  )
}

export default ProductCard
