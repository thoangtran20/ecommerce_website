import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { CountryDropdown } from 'react-country-region-selector'
import Card from '../../components/card/Card'
import styles from './CheckoutDetail.module.scss'
import * as yup from 'yup'

import { useDispatch } from 'react-redux'
import { SAVE_SHIPPING_ADDRESS } from '../../stores/slice/checkoutSlice'
import { useNavigate } from 'react-router'
import { ROUTERS } from '../../constants'
import Helmet from '../../components/helmet/Helmet'
import CommonSection from '../../components/common-section/CommonSection'
import CheckoutSummary from '../../components/checkout-summary/CheckoutSummary'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { notification } from 'antd'

const initialAddressState = {
  name: '',
  address: '',
  city: '',
  postal_code: '',
  country: '',
  phone: '',
}

const phoneRegex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/

// const schema = yup.object().shape({
//   name: yup.string().required('Please enter your recipient name'),
//   address: yup.string().required('Please enter your address'),
//   city: yup.string().required('Please enter your city'),
//   postal_code: yup.string().required('Please enter your poster code'),
//   country: yup.string().required('Country is required'),
//   phone: yup
//     .string()
//     .required('Please enter your phone')
//     .matches(phoneRegex, 'Phone is invalid'),
// })

const CheckoutDetail = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  })

  console.log(shippingAddress)

  // const name = shippingAddress.name
  // console.log(name)

  // const address = shippingAddress.address
  // console.log(address)

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   mode: 'all',
  //   resolver: yupResolver(schema),
  // })

  // const form = useRef()

  // console.log(errors)

  // console.log(Object.values(errors))

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setShippingAddress({ ...shippingAddress, [name]: value })
  }

  // console.log(shippingAddress)

  const submitCheckout = (e) => {
    console.log(e)
    // e.preventDefault()
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress))
    navigate(ROUTERS.checkout)
    // form.current.reset()
  }

  // useEffect(() => {
  //   const arrErrors = Object.values(errors)
  //   console.log(arrErrors)
  //   if (arrErrors.length > 0) {
  //     toast.error(arrErrors[0]?.message, {
  //       pauseOnHover: false,
  //       delay: 0,
  //     })
  //   }
  // }, [errors])

  return (
    <Helmet title="checkout">
      <CommonSection title="checkout" />

      <section>
        <div className={`wrapper ${styles.checkout}`}>
          <h2>Checkout Details</h2>
          {/* <Form onSubmit={handleSubmit(submitCheckout)}> */}
          <Container>
            <Row>
              <Col lg="7">
                {/* Shipping Address */}
                <Card cardClass={styles.card}>
                  <h3>Shipping Address</h3>
                  <form onSubmit={submitCheckout}>
                    <label>Recipient Name</label>

                    <input
                      type="text"
                      placeholder="Recipient Name"
                      name="name"
                      value={shippingAddress.name}
                      required
                      // {...register('name')}
                      onChange={handleChange}
                    />

                    {/* <p className={styles.errors}> {errors.name?.message} </p> */}

                    <label>Address</label>
                    <input
                      type="text"
                      placeholder="Address"
                      required
                      name="address"
                      value={shippingAddress.address}
                      // {...register('address')}
                      onChange={handleChange}
                    />
                    {/* <p className={styles.errors}> {errors.address?.message} </p> */}

                    <label>City</label>
                    <input
                      type="text"
                      id="city"
                      placeholder="City"
                      required
                      name="city"
                      value={shippingAddress.city}
                      // {...register('city')}
                      onChange={handleChange}
                    />
                    {/* <p className={styles.errors}> {errors.city?.message} </p> */}

                    <label>Postal Code</label>
                    <input
                      type="text"
                      placeholder="Postal code"
                      required
                      name="postal_code"
                      value={shippingAddress.postal_code}
                      // {...register('postal_code')}
                      onChange={handleChange}
                    />
                    {/* <p className={styles.errors}>
                      {' '}
                      {errors.postal_code?.message}{' '}
                    </p> */}

                    {/* Country Input */}
                    <label>Country</label>
                    <CountryDropdown
                      valueType="short"
                      required
                      className={styles.select}
                      value={shippingAddress.country}
                      // {...register('country')}
                      onChange={(val) =>
                        handleChange({
                          target: {
                            name: 'country',
                            value: val,
                          },
                        })
                      }
                    />
                    {/* <p className={styles.errors}> {errors.country?.message} </p> */}

                    <label>Phone</label>
                    <input
                      type="text"
                      placeholder="Phone"
                      required
                      name="phone"
                      value={shippingAddress.phone}
                      // {...register('phone')}
                      onChange={handleChange}
                    />
                    {/* <p className={styles.errors}> {errors.phone?.message} </p> */}

                    <button type="submit" className="--btn --btn-primary">
                      Proceed To Checkout
                    </button>
                  </form>
                </Card>
              </Col>
              <Col lg="5">
                <CheckoutSummary />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </Helmet>
  )
}

export default CheckoutDetail
