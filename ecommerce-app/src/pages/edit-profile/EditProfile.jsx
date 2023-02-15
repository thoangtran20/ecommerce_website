// import { Col, Row } from 'antd'
import { Button, Radio } from 'antd'

// import { AppLayout } from 'layout/AppLayout'
import './EditProfile.scss'
import React, { useState } from 'react'
import * as yup from 'yup'
import { Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Navigate } from 'react-router-dom'
import Helmet from '../../components/helmet/Helmet'
// import { updateProfile } from 'stores/slices/user.slice'

const EditProfile = () => {
  const [value, setValue] = useState(1)
  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

  // const [confirmPassword, setConfirmPassword] = useState('')
  const [picMessage, setPicMessage] = useState()
  const [pic, setPic] = useState()

  const dispatch = useDispatch()

  // const schema = yup
  //   .object()
  //   .shape({
  //     firstName: yup.string().required('First Name is reuired'),
  //     lastName: yup.string().required('Last Name is required'),
  //     email: yup
  //       .string()
  //       .required('Email is required')
  //       .email('Email is invalid'),
  //     password: yup
  //       .string()
  //       .min(8, 'Password must be at least 8 characters')
  //       .required('Password is required'),
  //     confirmPassword: yup
  //       .string()
  //       .oneOf([yup.ref('password'), null], 'Password must match'),
  //     date: yup.string().required('Date of Birth is required'),
  //     phone: yup
  //       .number()
  //       .required('Phone number is required')
  //       .positive()
  //       .integer(),
  //     address: yup.string().required('Address is required'),
  //   })
  //   .required()

  // const userInfo = useSelector((state) => state.users.userInfoState)
  // console.log(userInfo)

  const onChange = (e) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
  }
  return (
    <Helmet title="Edit Profile">
      <section>
        <Container>
          <Row className="profile__container">
            <Col lg="6">
              <h6 className="mb-4 fw-bold">Update User Information</h6>
              <Form className="edit__form" onSubmit={submitHandler}>
                <FormGroup className="form__group">
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    id="firstName"
                    placeholder="Enter First Name"
                    required
                    value=""
                  />
                  {/* <div className="errors-message">
                  {errors.firstName?.message}
                </div> */}
                </FormGroup>
                <FormGroup className="form__group">
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    required
                    id="lastName"
                    placeholder="Enter Last Name"
                    value=""
                  />
                  {/* <div className="errors-message">{errors.lastName?.message}</div> */}
                </FormGroup>
                <FormGroup className="form__group">
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    id="email"
                    required
                    placeholder="Enter Email"
                    value=""
                  ></Input>
                  {/* <div className="errors-message">{errors.email?.message}</div> */}
                </FormGroup>
                <FormGroup className="form__group">
                  <Label>Phone Number</Label>
                  <Input
                    type="number"
                    id="phone"
                    required
                    placeholder="Phone Number"
                    value=""
                  ></Input>
                  {/* <div className="errors-message">{errors.phone?.message}</div> */}
                </FormGroup>
                <FormGroup className="form__group">
                  <Label>Address</Label>
                  <Input
                    type="text"
                    required
                    id="address"
                    placeholder="Address"
                    value=""
                  ></Input>
                  {/* <div className="errors-message">{errors.address?.message}</div> */}
                </FormGroup>
                <FormGroup className="form__group">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    required
                    id="date"
                    placeholder="Date"
                    value=""
                  ></Input>
                  {/* <div className="errors-message">{errors.gender?.message}</div> */}
                </FormGroup>
                <FormGroup className="form__radio">
                  <Label>Gender</Label>
                  <Radio.Group
                    onChange={onChange}
                    value={value}
                    className="group__radio"
                  >
                    <Radio value={1} className="radio__item">
                      Male
                    </Radio>
                    <Radio value={2} className="radio__item">
                      Female
                    </Radio>
                    <Radio value={3} className="radio__item">
                      Other
                    </Radio>
                  </Radio.Group>
                </FormGroup>
                <Button type="submit" className="submit__btn auth__btn w-10">
                  Update
                </Button>
              </Form>
            </Col>
            <Col
              lg="6"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* <img src={pic} alt={name} className="profile__pic" /> */}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default EditProfile
