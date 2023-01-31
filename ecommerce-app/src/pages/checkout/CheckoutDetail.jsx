import React from 'react'
import { useState } from 'react'
import { Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import {
  CountryDropdown,
} from 'react-country-region-selector'
import Card from '../../components/card/Card'
import styles from './CheckoutDetail.module.scss'
import { useDispatch } from 'react-redux'
import { SAVE_SHIPPING_ADDRESS } from '../../stores/slice/checkoutSlice'
import { useNavigate } from 'react-router'
import { ROUTERS } from '../../constants'
import Helmet from '../../components/helmet/Helmet'
import CommonSection from '../../components/common-section/CommonSection'
import CheckoutSummary from '../../components/checkout-summary/CheckoutSummary'

const initialAddressState = {
  name: '',
  address: '',
  city: '',
  postal_code: '',
  country: '',
  phone: '',
}

const CheckoutDetail = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  })

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleShipping = (e) => {
    const { name, value } = e.target
    setShippingAddress({ ...shippingAddress, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(shippingAddress)
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress))
    navigate(ROUTERS.checkout)
  }

  return (
    <Helmet title="checkout">
      <CommonSection title="checkout" />

      <section>
        <div className={`wrapper ${styles.checkout}`}>
          <h2>Checkout Details</h2>
          <Form onSubmit={handleSubmit}>
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
                        onChange={(e) => handleShipping(e)}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Address</Label>
                      <Input
                        type="text"
                        placeholder="Address"
                        required
                        name="address"
                        value={shippingAddress.address}
                        onChange={(e) => handleShipping(e)}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>City</Label>
                      <Input
                        type="text"
                        placeholder="City"
                        required
                        name="city"
                        value={shippingAddress.city}
                        onChange={(e) => handleShipping(e)}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Postal Code</Label>
                      <Input
                        type="text"
                        placeholder="Postal code"
                        required
                        name="postal_code"
                        value={shippingAddress.postal_code}
                        onChange={(e) => handleShipping(e)}
                      />
                    </FormGroup>

                    {/* Country Input */}
                    <FormGroup>
                      <Label>Country</Label>
                      <CountryDropdown
                        valueType="short"
                        className={styles.select}
                        value={shippingAddress.country}
                        onChange={(val) =>
                          handleShipping({
                            target: {
                              name: 'country',
                              value: val,
                            },
                          })
                        }
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Phone</Label>
                      <Input
                        type="text"
                        placeholder="Phone"
                        required
                        name="phone"
                        value={shippingAddress.phone}
                        onChange={(e) => handleShipping(e)}
                      />
                    </FormGroup>

                    <button type="submit" className="--btn --btn-primary">
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
