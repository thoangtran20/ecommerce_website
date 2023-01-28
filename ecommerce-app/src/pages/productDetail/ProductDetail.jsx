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
import Helmet from '../../components/helmet/Helmet'
import spinnerImg from '../../assets/images/spinner.jpg'
import { db } from '../../firebase/config'
import './ProductDetail.scss'
import {
  RiStackFill,
  RiStarHalfFill,
  RiStarHalfSFill,
  RiStarSFill,
} from 'react-icons/ri'
import { FaCheck } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, STORE_PRODUCTS } from '../../stores/slice/productSlice'
import useFetchCollection from '../../customHooks/useFetchCollection'
import AmountButton from '../../components/amount-button/AmountButton'
import { cartActions } from '../../stores/slice/cartSlice'
import { toast } from 'react-toastify'
import ProductList from '../productList/ProductList'

const ProductDetail = () => {
  // Lấy id sản phẩm
  // const obj = useParams()
  // const id = obj.id{

  // Lay id tu object
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  console.log(product)

  const [amount, setAmount] = useState(1)
  const [size, setSize] = useState()
  const [mainColor, setMainColor] = useState()

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
      // doc.data() will be undefined in this case
      console.log('No such document!')
    }
  }

  const { data } = useFetchCollection('products')
  console.log(data)

  const navigate = useNavigate()

  // ComponentDidMount - ComponmentDidMount
  useEffect(() => {
    getProduct()
  }, [id])

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
    // console.log(relatedProducts)

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
      const cartItem = { sku, imgURL: img1, name, price, amount }
      console.log(cartItem)
      dispatch(cartActions.ADD_TO_CART(cartItem))

      toast.success('Product added successfully')
    }

    // console.log(size)

    console.log(colors)

    // console.log(name)

    return (
      <Helmet title={name}>
        <CommonSection title={name} />
        <section className="product1">
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
        <section className="product__detail">
          <Container>
            <Row>
              <Col lg="5">
                <div className="single__image">
                  <img src={img1} className="main__img" alt={name} />
                  <div className="small__img--group">
                    <div
                      className="small__img--col"
                      // onClick={() => setPreviewImg(img1)}
                    >
                      <img src={img1} className="small__img" alt="" />
                    </div>
                    <div
                      className="small__img--col"
                      // onClick={() => setPreviewImg(img1)}
                    >
                      <img src={img1} className="small__img" alt="" />
                    </div>
                    <div
                      className="small__img--col"
                      // onClick={() => setPreviewImg(img1)}
                    >
                      <img src={img1} className="small__img" alt="" />
                    </div>
                    <div
                      className="small__img--col"
                      // onClick={() => setPreviewImg(img1)}
                    >
                      <img src={img1} className="small__img" alt="" />
                    </div>
                    <div
                      className="small__img--col"
                      // onClick={() => setPreviewImg(img1)}
                    >
                      <img src={img1} className="small__img" alt="" />
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
                  <select
                    name="size"
                    id=""
                    onChange={(e) => setSize(e.target.value)}
                  >
                    <option value={size}>Select Size</option>
                    {size.map((item, index) => {
                      return (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      )
                    })}
                  </select>
                  <div className="colors">
                    <span> colors : </span>
                    <div>
                      {colors.map((color, index) => {
                        return (
                          <button
                            key={index}
                            style={{ background: color }}
                            className={`${
                              mainColor === color
                                ? 'color-btn active'
                                : 'color-btn'
                            }`}
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
                <h2 className="related__title">You might also like</h2>
              </Col>
              <ProductList products={relatedProducts} />
            </Row>
          </Container>
        </section>
      </Helmet>
    )
  }
}

export default ProductDetail
