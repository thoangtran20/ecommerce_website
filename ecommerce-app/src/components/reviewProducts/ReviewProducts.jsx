import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { selectUserID, selectUserName } from '../../stores/slice/authSlice'
import spinnerImg from '../../assets/images/spinner.jpg'
import Card from '../../components/card/Card'
import StarsRating from 'react-star-rate'

import styles from './ReviewProducts.module.scss'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { toast } from 'react-toastify'
import useFetchDocument from '../../customHooks/useFetchDocument'
import useFetchCollection from '../../customHooks/useFetchCollection'
import { Form, FormGroup, Label } from 'reactstrap'

const ReviewProducts = () => {
  const [rate, setRate] = useState(0)

  const [review, setReview] = useState('')

  const [product, setProduct] = useState(null)
  console.log(product)

  // Lấy giá trị data theo collection products từ firestore/firebase
  const { data } = useFetchCollection('products')
  console.log(data)

  // Lấy ra id thông qua url được truyền vào
  const { id } = useParams()
  console.log(id)

  // Lấy ra userID từ userSlice trong redux store
  const userID = useSelector(selectUserID)
  const userName = useSelector(selectUserName)

  // khởi tạo navigate để điều hướng sang page khác
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
    // Khoi tao reviewConfig va set up data
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
      // Them collection reviews vao firestore/firebase
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
            <p>
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
