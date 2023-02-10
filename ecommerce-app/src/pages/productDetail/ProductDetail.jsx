// 1. Hiển thị thông tin sản phẩm
// 2. Hiển thị sản phẩm liên quan

import { doc, getDoc } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import CommonSection from '../../components/common-section/CommonSection'
import styles from './ProductDetail.module.scss'
import Helmet from '../../components/helmet/Helmet'
import Card from '../../components/card/Card'
import spinnerImg from '../../assets/images/spinner.jpg'
import { db } from '../../firebase/config'
import {
  RiStackFill,
  RiStarHalfFill,
  RiStarHalfSFill,
  RiStarSFill,
} from 'react-icons/ri'
import { FaCheck } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import {
  REMOVE,
  selectProducts,
  STORE_PRODUCTS,
} from '../../stores/slice/productSlice'
import useFetchCollection from '../../customHooks/useFetchCollection'
import AmountButton from '../../components/amount-button/AmountButton'
import { cartActions, selectCartItems } from '../../stores/slice/cartSlice'
import { toast } from 'react-toastify'
import ProductList from '../productList/ProductList'
import { ROUTERS } from '../../constants'
import useFetchDocument from '../../customHooks/useFetchDocument'
import StarsRating from 'react-star-rate'

const ProductDetail = (props) => {
  // Lay id tu object
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  console.log(product)

  const [amount, setAmount] = useState(1)
  const [mainSize, setMainSize] = useState(undefined)
  const [mainColor, setMainColor] = useState(undefined)

  const { document } = useFetchDocument('products', id)
  console.log(document)

  const getProduct = async () => {
    const docRef = doc(db, 'products', id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const product = {
        id: id,
        ...docSnap.data(),
      }
      setProduct(product)
    } else {
      console.log('Product not found')
    }
  }


  const navigate = useNavigate()

  const check = () => {
    if (mainSize === undefined) {
      alert('Please choose the size!')
      return false
    }
    if (mainColor === undefined) {
      alert('Please choose the color!')
      return false
    }

    return true
  }

  const { data } = useFetchCollection('products')
  console.log(data)

  const fbReivews = useFetchCollection('reviews')

  const fbReviewsData = fbReivews.data
  console.log(fbReviewsData)

  const filteredReviews = fbReviewsData.filter(
    (review) => review.productID === id,
  )
  console.log(filteredReviews)

  // const [previewImg, setPreviewImg] = useState(img1)
  // setPreviewImg(img1)

  // ComponentDidMount - ComponmentDidUpdate

  useEffect(() => {
    getProduct()
  }, [id])

  useEffect(() => {
    setProduct(document)
  }, [document])

  const dispatch = useDispatch()

  if (product === null) {
    return <img src={spinnerImg} alt="Loading" style={{ width: '50px' }} />
  } else {
    const {
      imgURL: img1,
      // img2,
      // img3,
      // img4,
      // img5,
      name,
      price,
      brand,
      size,
      colors,
      category,
      description,
      stock,
      id: sku,
      avgRating,
    } = product

    const relatedProducts = data.filter((item) => item.category === category)
    console.log(relatedProducts)

    const increase = () => {
      setAmount((oldAmount) => {
        let tempAmount = oldAmount + 1
        if (tempAmount > stock) {
          tempAmount = stock
        }
        return tempAmount
      })
    }

    const decrease = () => {
      setAmount((oldAmount) => {
        let tempAmount = oldAmount - 1
        if (tempAmount < 1) {
          tempAmount = 1
        }
        return tempAmount
      })
    }

    const addToCart = () => {
      if (check()) {
        const cartItem = {
          sku,
          imgURL: img1,
          name,
          price,
          cartQuantity: amount,
          size: mainSize,
          color: mainColor,
        }
        console.log(cartItem)
        dispatch(cartActions.ADD_TO_CART(cartItem))

        toast.success('Product added successfully')
      } else {
        toast.error('Fail!!! Please try again!')
      }
    }

    const goToCart = () => {
      if (check()) {
        addToCart()
        navigate(ROUTERS.cart)
      }
    }
    // console.log(colors)
    return (
      <Helmet title={name}>
        <CommonSection title={name} />
        <section className={styles.product1}>
          <Container>
            <Row>
              <Col lg="12">
                <h2>Product Details</h2>
                <div>
                  <Link to="/#products">&larr; Back To Products</Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className={styles.product__detail}>
          <Container>
            <Row>
              <Col lg="5">
                <div className={styles.single__image}>
                  <img src={img1} className={styles.main__img} alt={name} />
                  <div className={styles.small__imgGroup}>
                    <div
                      className={styles.small__imgCol}
                      // onClick={() => setPreviewImg(img1)}
                    >
                      <img src={img1} className={styles.small__img} alt="" />
                    </div>
                    <div
                      className={styles.small__imgCol}
                      // onClick={() => setPreviewImg(img1)}
                    >
                      <img src={img1} className={styles.small__img} alt="" />
                    </div>
                    <div
                      className={styles.small__imgCol}
                      // onClick={() => setPreviewImg(img1)}
                    >
                      <img src={img1} className={styles.small__img} alt="" />
                    </div>
                    <div
                      className={styles.small__imgCol}
                      // onClick={() => setPreviewImg(img1)}
                    >
                      <img src={img1} className={styles.small__img} alt="" />
                    </div>
                    <div
                      className={styles.small__imgCol}
                      // onClick={() => setPreviewImg(img1)}
                    >
                      <img src={img1} className={styles.small__img} alt="" />
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg="7">
                <div className={styles.single__detail}>
                  <h6>Home / {category}</h6>
                  <h4>{name}</h4>
                  <div
                    className={`${styles.product__rating} d-flex
                    align-items-center
                    gap-5
                    mb-3`}
                  >
                    <div className={styles.star}>
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
                  <p className={styles.info}>
                    <span>Available : </span>{' '}
                    {stock > 0 ? 'In stock' : 'out of stock'}
                  </p>
                  <p className={styles.info}>
                    <span>SKU : </span>
                    {sku}
                  </p>
                  <p className={styles.info}>
                    <span>Brand : </span>
                    {brand}
                  </p>
                  <h2>${price}</h2>
                  <select
                    name="size"
                    id=""
                    onChange={(e) => setMainSize(e.target.value)}
                  >
                    <option value={mainSize}>Select Size</option>
                    {size.map((item, index) => {
                      return (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      )
                    })}
                  </select>
                  <div className={styles.colors}>
                    <span> colors : </span>
                    <div>
                      {colors.map((color, index) => {
                        return (
                          <button
                            key={index}
                            style={{ background: color }}
                            className={
                              `${mainColor}` === color
                                ? `${styles.active}`
                                : null
                            }
                            onClick={() => setMainColor(color)}
                          >
                            {mainColor === color ? <FaCheck /> : null}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  <h4>Product Details</h4>
                  <span>{description}</span>
                  {stock > 0 && (
                    <AmountButton
                      amount={amount}
                      decrease={decrease}
                      increase={increase}
                    />
                  )}
                  {stock > 0 && (
                    <div>
                      <button onClick={goToCart}>Add To Cart</button>
                    </div>
                  )}
                </div>
              </Col>
              <Col lg="12" className="mt-5">
                <h2 className={styles.related__title}>You might also like</h2>
              </Col>
              <ProductList products={relatedProducts} />
            </Row>
          </Container>
        </section>
        <section className={styles.review}>
          <Container>
            <Row>
              <Col lg="12" className="mb-5">
                <h3 className={styles.reviewed__title}>Product Reviews</h3>

                <Card cardClass={styles.card}>
                  <div>
                    {filteredReviews.length === 0 ? (
                      <p>There are no reviews for this product</p>
                    ) : (
                      <>
                        {filteredReviews.map((item, index) => {
                          const { rate, review, reviewDate, userName } = item
                          return (
                            <div key={index} className={styles.review}>
                              <StarsRating value={rate} />
                              <p>{review}</p>
                              <span>
                                <b>{reviewDate}</b>
                              </span>
                              <br />
                              <span>
                                <b>By: {userName}</b>
                              </span>
                            </div>
                          )
                        })}
                      </>
                    )}
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
    )
  }
}

export default ProductDetail
