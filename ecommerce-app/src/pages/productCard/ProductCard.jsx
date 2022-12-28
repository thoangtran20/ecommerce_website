import React from 'react'
import { Col, NavItem } from 'reactstrap'
import './ProductCard.scss'
import { RiStarFill } from 'react-icons/ri'
import { BsFillCartPlusFill, BsFillSuitHeartFill } from 'react-icons/bs'

const ProductCard = ({ item }) => {
  return (
    <>
      <Col lg="3" md="4" className="mb-2">
        <div className="product__item">
          <div className="product__img">
            <img src={item.image} alt="" />
          </div>
          <div className="product__info">
            <span>{item.brand}</span>
            <h5>{item.name}</h5>
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
            <h4>${item.price}</h4>
          </div>
          <a href="">
            <i className="heart">
              <BsFillSuitHeartFill />
            </i>
          </a>
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
