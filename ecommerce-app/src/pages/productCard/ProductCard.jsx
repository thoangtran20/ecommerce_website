import React from 'react'
import { Col } from 'reactstrap'
import './ProductCard.scss'
import { RiSearchLine, RiStarFill } from 'react-icons/ri'
import { BsFillCartPlusFill, BsFillSuitHeartFill } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'

const ProductCard = ({ item }) => {
  console.log(item)

  const navigate = useNavigate()

  return (
    <>
      <Col lg="3" md="4" className="mb-2">
        <div className="product__item">
          <div className="product__img">
            <img src={item.imgURL} alt="" />
            <Link to={`/product-detail/${item.id}`} className="link">
              <RiSearchLine />
            </Link>
          </div>
          <div className="product__info p2">
            <span className="d-block">{item.brand}</span>
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
          <Link to="">
            <i className="heart">
              <BsFillSuitHeartFill />
            </i>
          </Link>
          <Link to="">
            <i className="cart">
              <BsFillCartPlusFill />
            </i>
          </Link>
        </div>
      </Col>
    </>
  )
}

export default ProductCard
