import React, { useEffect, useState } from 'react'
import './Profile.scss'
import { Container, Form, Button, Col, Row } from 'reactstrap'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Helmet from '../../components/helmet/Helmet'
import CommonSection from '../../components/common-section/CommonSection'
import useFetchDocument from '../../customHooks/useFetchDocument'
import useFetchCollection from '../../customHooks/useFetchCollection'
import { selectEmail, selectUserName } from '../../stores/slice/authSlice'

const Profile = () => {
  // const [user, setUser] = useState(null)
  // console.log(user)

  const { id } = useParams()

  const { data } = useFetchCollection('users')
  console.log(data)

  const { document } = useFetchDocument('users', id)
  console.log(document)

  const user = data.find((item) => item.id === id)
  console.log(user)

  const userName = useSelector(selectUserName)
  console.log(userName)
  const userEmail = useSelector(selectEmail)
  console.log(userEmail)

  return (
    <Helmet title="profile">
      <CommonSection title="profile" />
      <section>
        <Container>
          <Row className="profile__container">
            <Col lg="6">
              <h6 className="mb-4 fw-bold">User Information</h6>
              <Form className="info__form">
                <div className="form__content">
                  <h5>First Name</h5>
                  <p>Thoang</p>
                </div>
                <div className="form__content">
                  <h5>Last Name</h5>
                  <p>Tran</p>
                </div>
                <div className="form__content">
                  <h5>Email Address</h5>
                  {/* <p>{userInfo.data.email}</p> */}
                </div>
                <div className="form__content">
                  <h5>Phone Number</h5>
                  {/* <p>{userInfo.data.phone}</p> */}
                </div>
                <div className="form__content">
                  <h5>Address</h5>
                  {/* <p>{userInfo.data.address}</p> */}
                </div>
                <div className="form__content">
                  <h5>Date</h5>
                  {/* <p>{userInfo.data.date}</p> */}
                </div>
                <div className="form__content">
                  <h5>Gender</h5>
                  {/* <p>{userInfo.data.gender}</p> */}
                </div>
                <Link to="/edit-profile">
                  <Button type="submit" className="submit__btn auth__btn w-10">
                    Update
                  </Button>
                </Link>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Profile
