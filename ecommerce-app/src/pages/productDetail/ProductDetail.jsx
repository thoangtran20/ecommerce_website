import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Helmet from '../../components/helmet/Helmet'

import { products } from '../../data/ProductData'
import './ProductDetail.scss'
import CommonSection from '../../components/common-section/CommonSection'
import { Col, Container, Row } from 'reactstrap'
import { RiStarSFill, RiStarHalfFill } from 'react-icons/ri'
import ProductList from '../productList/ProductList'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const ProductDetail = () => {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)

  const product = products.find((item) => item.id === id)

  const updateQuantity = (type) => {
    if (type === 'plus') {
      setQuantity(quantity + 1)
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
    }
  }

  const {
    image: img1,
    img2,
    img3,
    img4,
    img5,
    productName,
    price,
    brand,
    category,
    description,
    stock,
    id: sku,
    avgRating,
  } = product

  console.log(product)

  console.log(img1)

  const [previewImg, setPreviewImg] = useState(img1)

  useEffect(() => {
    setPreviewImg(img1)
    setQuantity(1)
  }, [product])

  const relatedProducts = products.filter((item) => item.category === category)

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />{' '}
      <section className="product__detail">
        <Container>
          <Row>
            <Col lg="5">
              <div className="single__image">
                <img src={previewImg} className="main__img" alt="" />
                <div className="small__img--group">
                  <div
                    className="small__img--col"
                    onClick={() => setPreviewImg(img1)}
                  >
                    <img src={img1} className="small__img" alt="" />
                  </div>
                  <div
                    className="small__img--col"
                    onClick={() => setPreviewImg(img2)}
                  >
                    <img src={img2} className="small__img" alt="" />
                  </div>
                  <div
                    className="small__img--col"
                    onClick={() => setPreviewImg(img3)}
                  >
                    <img src={img3} className="small__img" alt="" />
                  </div>
                  <div
                    className="small__img--col"
                    onClick={() => setPreviewImg(img4)}
                  >
                    <img src={img4} className="small__img" alt="" />
                  </div>
                  <div
                    className="small__img--col"
                    onClick={() => setPreviewImg(img5)}
                  >
                    <img src={img5} className="small__img" alt="" />
                  </div>
                </div>
              </div>
            </Col>

            <Col lg="7">
              <div className="single__detail">
                <h6>Home / {category}</h6>
                <h4>{productName}</h4>
                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                  <div className="star">
                    <span>
                      <i>
                        <RiStarSFill />
                      </i>
                    </span>
                    <span>
                      <i>
                        <RiStarSFill />
                      </i>
                    </span>
                    <span>
                      <i>
                        <RiStarSFill />
                      </i>
                    </span>
                    <span>
                      <i>
                        <RiStarSFill />
                      </i>
                    </span>
                    <span>
                      <i>
                        <RiStarHalfFill />
                      </i>
                    </span>
                  </div>

                  <p>
                    (<span>{avgRating}</span> ratings)
                  </p>
                </div>
                <p className="info">
                  <span>Available : </span>{' '}
                  {stock > 0 ? 'In stock' : 'out of stock'}
                </p>
                <p className="info">
                  <span>SKU : </span>
                  {sku}
                </p>
                <p className="info">
                  <span>Brand : </span>
                  {brand}
                </p>
                <h2>${price}</h2>
                <select name="" id="">
                  <option value="">Select Size</option>
                  <option value="">M</option>
                  <option value="">L</option>
                  <option value="">XL</option>
                  <option value="">XXL</option>
                </select>
                <h4>Product Details</h4>
                <span>{description}</span>
                {/* <input type="number" value="1" /> */}
                <div className="quantity">
                  <div
                    className="quantity__btn"
                    onClick={() => updateQuantity('minus')}
                  >
                    <i>
                      <AiOutlineMinus />
                    </i>
                  </div>
                  <h2 className="quantity__input">{quantity}</h2>
                  <div
                    className="quantity__btn"
                    onClick={() => updateQuantity('plus')}
                  >
                    <i>
                      <AiOutlinePlus />
                    </i>
                  </div>
                </div>
                {stock > 0 && <button>Add To Cart</button>}
              </div>
            </Col>

            <Col lg="12" className="mt-5">
              <h2 className="related__title">You might also like</h2>
            </Col>

            <ProductList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default ProductDetail
