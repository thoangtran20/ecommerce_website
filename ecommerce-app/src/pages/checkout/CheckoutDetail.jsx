import React, { useEffect } from 'react'
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

const schema = yup.object().shape({
  name: yup.string().required('Please enter your recipient name'),
  address: yup.string().required('Please enter your address'),
  city: yup.string().required('Please enter your city'),
  postal_code: yup.string().required('Please enter your poster code'),
  country: yup.string().required('Country is required'),
  phone: yup
    .string()
    .required('Please enter your phone')
    .matches(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    ),
})

const CheckoutDetail = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  })

  console.log(shippingAddress)

  // const name = shippingAddress.name
  // console.log(name)

  // const address = shippingAddress.address
  // console.log(address)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

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
    e.preventDefault()
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress))
    navigate(ROUTERS.checkout)
    // if (
    //   !shippingAddress.name ||
    //   !shippingAddress.address ||
    //   !shippingAddress.city ||
    //   !shippingAddress.postal_code ||
    //   !shippingAddress.country ||
    //   !shippingAddress.phone
    // ) {
    //   return notification.error({
    //     message: `Please enter full information!!!`,
    //   })
    // }

    // if (!isValid) return
    // console.log(data)
    // console.log('asdfasdfaf')

    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     console.log(data)
    //     reset({
    //       name: '',
    //       address: '',
    //       city: '',
    //       postal_code: '',
    //       country: '',
    //       phone: '',
    //     })
    //     console.log(shippingAddress)
    //     dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress))
    //     navigate(ROUTERS.checkout)
    //   }, 3000)
    // })

    // const formData = {
    //   name: shippingAddress.name,
    //   address: shippingAddress.address,
    //   city: shippingAddress.city,
    //   postal_code: shippingAddress.postal_code,
    //   country: shippingAddress.country,
    //   phone: shippingAddress.phone,
    // }

    // console.log(formData)

    // console.log(shippingAddress)
    // dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress))
    // navigate(ROUTERS.checkout)
  }

  // const onSubmit = (data) => {
  //   console.log({ data })
  // }

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
          <Form onSubmit={submitCheckout}>
            <Container>
              <Row>
                <Col lg="7">
                  {/* Shipping Address */}
                  <Card cardClass={styles.card}>
                    <h3>Shipping Address</h3>
                    <FormGroup>
                      <Label>Recipient Name</Label>
                      <Input
                        type="text"
                        placeholder="Recipient Name"
                        name="name"
                        value={shippingAddress.name}
                        // ref={register}
                        required
                        // {...register('name')}
                        onChange={handleChange}
                      />

                      {/* <p className={styles.errors}> {errors.name?.message} </p> */}
                    </FormGroup>

                    <FormGroup>
                      <Label>Address</Label>
                      <Input
                        type="text"
                        placeholder="Address"
                        required
                        name="address"
                        value={shippingAddress.address}
                        // {...register('address')}
                        onChange={handleChange}
                      />
                      {/* <p className={styles.errors}>
                        {' '}
                        {errors.address?.message}{' '}
                      </p> */}
                    </FormGroup>

                    <FormGroup>
                      <Label>City</Label>
                      <Input
                        type="text"
                        placeholder="City"
                        required
                        name="city"
                        value={shippingAddress.city}
                        // {...register('city')}
                        onChange={handleChange}
                      />
                      {/* <p className={styles.errors}> {errors.city?.message} </p> */}
                    </FormGroup>

                    <FormGroup>
                      <Label>Postal Code</Label>
                      <Input
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
                    </FormGroup>

                    {/* Country Input */}
                    <FormGroup>
                      <Label>Country</Label>
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
                      {/* <p className={styles.errors}>
                        {' '}
                        {errors.country?.message}{' '}
                      </p> */}
                    </FormGroup>

                    <FormGroup>
                      <Label>Phone</Label>
                      <Input
                        type="text"
                        placeholder="Phone"
                        required
                        name="phone"
                        value={shippingAddress.phone}
                        // {...register('phone')}
                        onChange={handleChange}
                      />
                      {/* <p className={styles.errors}> {errors.phone?.message} </p> */}
                    </FormGroup>

                    <button
                      type="submit"
                      className="--btn --btn-primary"
                      isLoading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      Proceed To Checkout
                    </button>
                  </Card>
                </Col>

                <Col lg="5">
                  <CheckoutSummary />
                </Col>
              </Row>
            </Container>
          </Form>
        </div>
      </section>
    </Helmet>
  )
}

export default CheckoutDetail
