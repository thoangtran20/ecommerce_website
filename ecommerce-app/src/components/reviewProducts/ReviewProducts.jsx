import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { selectUserID, selectUserName } from '../../stores/slice/authSlice'
import { selectProducts, STORE_PRODUCTS } from '../../stores/slice/productSlice'
import spinnerImg from '../../assets/images/spinner.jpg'
import Card from '../../components/card/Card'
import StarsRating from 'react-star-rate'

import styles from './ReviewProducts.module.scss'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { toast } from 'react-toastify'
import useFetchDocument from '../../customHooks/useFetchDocument'
import useFetchCollection from '../../customHooks/useFetchCollection'
import { selectCartItems } from '../../stores/slice/cartSlice'
import { selectOrderHistory } from '../../stores/slice/orderSlice'
import { Form, FormGroup, Label } from 'reactstrap'

const ReviewProducts = () => {
  const [rate, setRate] = useState(0)

  const [review, setReview] = useState('')

  const [product, setProduct] = useState(null)
  console.log(product)

  const { data } = useFetchCollection('products')
  console.log(data)

  const { id } = useParams()
  console.log(id)

  const userID = useSelector(selectUserID)
  const userName = useSelector(selectUserName)

  const navigate = useNavigate()

  const { document } = useFetchDocument('products', id)
  console.log(document)

  useEffect(() => {
    setProduct(document)
  }, [document])

  const submitReview = (e) => {
    e.preventDefault()

    const today = new Date()
    const date = today.toDateString()
    const reviewConfig = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    }
    console.log(reviewConfig)
    try {
      addDoc(collection(db, 'reviews'), reviewConfig)
      toast.success('Review submitted successfully!!!')
      setRate(0)
      setReview('')
      navigate(-1)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <section>
      <div className={`wrapper ${styles.review}`}>
        <h2>Reivew Products</h2>
        {product === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: '50px' }} />
        ) : (
          <>
src/styles            <p>
              <b>Product: </b> {product.name}
            </p>
            <img
              src={product.imgURL}
              alt={product.name}
              style={{ width: '100px' }}
            />
          </>
        )}

        <Card cardClass={styles.card}>
          <Form onSubmit={(e) => submitReview(e)}>
            <FormGroup>
              <Label>Rating: </Label>
              <StarsRating
                value={rate}
                onChange={(rate) => {
                  setRate(rate)
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label>Review: </Label>
              <textarea
                value={review}
                required
                onChange={(e) => setReview(e.target.value)}
                cols="20"
                rows="10"
              ></textarea>
            </FormGroup>

            <button type="submit" className="--btn --btn-primary">
              Submit Review
            </button>
          </Form>
        </Card>
      </div>
    </section>
  )
}

export default ReviewProducts
