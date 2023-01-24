import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Helmet from '../../components/helmet/Helmet'
import { toast } from 'react-toastify'

// import { products } from '../../data/ProductData'
import './ProductDetail.scss'
import CommonSection from '../../components/common-section/CommonSection'
import { Col, Container, Row } from 'reactstrap'
import { RiStarSFill, RiStarHalfFill } from 'react-icons/ri'
import ProductList from '../productList/ProductList'
// import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART, cartActions } from '../../stores/slice/cartSlice'
import AmountButton from '../../components/amount-button/AmountButton'
import useFetchCollection from '../../customHooks/useFetchCollection'
import { selectProducts, STORE_PRODUCTS } from '../../stores/slice/productSlice'
import spinnerImg from '../../assets/images/spinner.jpg'
// import styles from './ProductDetail.module.scss'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { Link } from 'react-router-dom'

const ProductDetail = () => {
  const { id } = useParams()
  console.log(id)
  const [product, setProduct] = useState(null)
  console.log(product)

  const { data, isLoading } = useFetchCollection('products')
  const products = useSelector(selectProducts)
  const dispatch = useDispatch()

  const getProduct = async () => {
    console.log('Getting Product')
    const docRef = doc(db, 'products', id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      // console.log('Document data:', docSnap.data())
      const product = {
        id: id,
        ...docSnap.data(),
      }
      setProduct(product)
    } else {
      toast.error('Product not found')
      // doc.data() will be undefined in this case
      console.log('No such document!')
    }
  }

  useEffect(() => {
    getProduct()
  }, [])

  console.log(products)

  useEffect(() => {
    console.log('running the second useEffect')
    dispatch(
      STORE_PRODUCTS({
        products: data,
      }),
    )
  }, [dispatch, data])

  // const product = products?.find((item) => item?.id === id)
  // console.log(product)

  const [amount, setAmount] = useState(1)

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

  const {
    imgURL: img1,
    // img2,
    // img3,
    // img4,
    // img5,
    name,
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
    console.log('running the last useEffect')
    setPreviewImg(img1)
  }, [product])

  const addToCart = () => {
    const cartItem = { sku, imgURL: img1, name, price, amount }
    console.log(cartItem)
    dispatch(cartActions.ADD_TO_CART(cartItem))

    toast.success('Product added successfully')
  }

  const relatedProducts = products.filter((item) => item.category === category)

  console.log(relatedProducts)
  console.log(name)
  console.log(category)

  return (
    <Helmet title={name}>
      <CommonSection title={name} />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="product1">
                <h2>Product Details</h2>
                <div>
                  <Link to="/#products">&larr; Back To Products</Link>
                </div>

                {product === null ? (
                  <img
                    src={spinnerImg}
                    alt="Loading"
                    style={{ width: '50px' }}
                  />
                ) : (
                  <>
                    <section className="product__detail">
                      <Container>
                        <Row>
                          <Col lg="5">
                            <div className="single__image">
                              <img
                                src={img1}
                                className="main__img"
                                alt={name}
                              />
                              <div className="small__img--group">
                                <div
                                  className="small__img--col"
                                  // onClick={() => setPreviewImg(img1)}
                                >
                                  <img
                                    src={img1}
                                    className="small__img"
                                    alt=""
                                  />
                                </div>
                                <div
                                  className="small__img--col"
                                  onClick={() => setPreviewImg(img1)}
                                >
                                  <img
                                    src={img1}
                                    className="small__img"
                                    alt=""
                                  />
                                </div>
                                <div
                                  className="small__img--col"
                                  onClick={() => setPreviewImg(img1)}
                                >
                                  <img
                                    src={img1}
                                    className="small__img"
                                    alt=""
                                  />
                                </div>
                                <div
                                  className="small__img--col"
                                  onClick={() => setPreviewImg(img1)}
                                >
                                  <img
                                    src={img1}
                                    className="small__img"
                                    alt=""
                                  />
                                </div>
                                <div
                                  className="small__img--col"
                                  onClick={() => setPreviewImg(img1)}
                                >
                                  <img
                                    src={img1}
                                    className="small__img"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col lg="7">
                            <div className="single__detail">
                              <h6>Home / {category}</h6>
                              <h4>{name}</h4>
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
                              {stock > 0 && (
                                <AmountButton
                                  amount={amount}
                                  decrease={decrease}
                                  increase={increase}
                                />
                              )}
                              {stock > 0 && (
                                <button onClick={addToCart}>Add To Cart</button>
                              )}
                            </div>
                          </Col>
                          <Col lg="12" className="mt-5">
                            <h2 className="related__title">
                              You might also like
                            </h2>
                          </Col>
                          <ProductList products={relatedProducts} />
                        </Row>
                      </Container>
                    </section>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default ProductDetail
