import React, { useEffect, useRef, useState } from 'react'
import { FaEnvelope, FaPhoneAlt, FaTwitter } from 'react-icons/fa'
import emailjs from '@emailjs/browser'
import { GoLocation } from 'react-icons/go'
import Card from '../../components/card/Card'
import styles from './Contact.module.scss'
import { toast } from 'react-toastify'
import { Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
// import * as yup from 'yup'

// import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

const Contact = () => {
  const [userData, setUserData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: '',
  })

  console.log(userData)

  // const [userData, setUserData] = useState()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
  })

  const form = useRef()
  // console.log(form)

  const postUserData = (e) => {
    const { name, value } = e.target
    console.log(name)
    setUserData({ ...userData, [name]: value })
  }

  const sendEmail = (e) => {
    e.preventDefault()
    // console.log(data)
    console.log(form.current)

    emailjs
      .sendForm(
        'service_k3ofhpy',
        'template_ctivqk9',
        form.current,
        '7AxWjOwG9XRbguDMe',
      )
      .then(
        (res) => {
          toast.success('Message sent successfully!!!')
          console.log(res.text)
          // setUserData({
          //   user_name: '',
          //   user_email: '',
          //   subject: '',
          //   message: '',
          // })
        },
        (error) => {
          toast.error(error.text)
        },
      )
    e.target.reset()
  }

  // console.log(Object.values(errors))

  useEffect(() => {
    const arrErrors = Object.values(errors)
    console.log(arrErrors)
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      })
    }
  }, [errors])
  return (
    <section>
      <div className={`wrapper ${styles.contact}`}>
        <h2>Contact Us</h2>
        <div className={styles.section}>
          <Container>
            <Row className="mb-5 mt-3">
              <Col lg="6" md="3">
                <form
                  ref={form}
                  onSubmit={sendEmail}
                  // onSubmit={handleSubmit(sendEmail)}
                  // autoComplete="off"
                >
                  <Card cardClass={styles.card}>
                    <FormGroup>
                      <Label>Name</Label>
                      <input
                        type="text"
                        name="user_name"
                        placeholder="Full Name"
                        // onChange={(e) => setUserName(e.target.value)}
                        // value={user_name}
                        required
                        // {...register('user_name', {
                        //   required: 'Username is required...',
                        //   minLength: {
                        //     value: 3,
                        //     message:
                        //       'Username must be atleast 3 characters long...',
                        //   },
                        //   maxLength: {
                        //     value: 30,
                        //     message:
                        //       'Username must be atmost 30 characters long...',
                        //   },
                        // })}
                      />
                      <p className={styles.errors}>
                        {errors.user_name?.message}
                      </p>
                    </FormGroup>

                    <FormGroup>
                      <Label>Email</Label>
                      <input
                        type="email"
                        name="user_email"
                        placeholder="Your active email"
                        // onChange={postUserData}
                        // value={userData.user_email}
                        required
                        // {...register('user_email', {
                        //   required: 'Email is required...',
                        //   pattern: {
                        //     value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        //     message: 'Email must be valid',
                        //   },
                        // })}
                      />
                      <p className={styles.errors}>
                        {errors.user_email?.message}
                      </p>
                    </FormGroup>

                    <FormGroup>
                      <Label>Subject</Label>
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        required
                        // onChange={postUserData}
                        // value={userData.subject}
                        // {...register('subject', {
                        //   required: 'Address is required...',
                        // })}
                      />
                      <p className={styles.errors}>{errors.subject?.message}</p>
                    </FormGroup>

                    <FormGroup>
                      <Label>Message</Label>
                      <textarea
                        name="message"
                        required
                        cols="30"
                        rows="10"
                        // onChange={postUserData}
                        // value={userData.message}
                        // {...register('message', {
                        //   required: 'Message is required...',
                        //   minLength: {
                        //     value: 10,
                        //     message: 'Minimum Required length is 10',
                        //   },
                        //   maxLength: {
                        //     value: 100,
                        //     message: 'Maximum allowed length is 100 ',
                        //   },
                        // })}
                      />
                      <p className={styles.errors}>{errors.message?.message}</p>
                    </FormGroup>
                    <button
                      style={{ background: '#FF6363 ' }}
                      className="--btn --btn-primary"
                    >
                      Send Message
                    </button>
                  </Card>
                </form>
              </Col>
              <Col lg="6" md="4" className="mb-5">
                <div className={styles.details}>
                  <Card cardClass={styles.card2}>
                    <h3>Our Contact Infomation</h3>
                    <p>
                      Fill the form or contact us via other channels listed
                      below
                    </p>
                    <div className={styles.icons}>
                      <span>
                        <FaPhoneAlt />
                        <p>+ 84 112 534 879</p>
                      </span>
                      <span>
                        <FaEnvelope />
                        <p>clothingstore@gmail.com</p>
                      </span>
                      <span>
                        <GoLocation />
                        <p>Thanh Khe, Da Nang</p>
                      </span>
                      <span>
                        <FaTwitter />
                        <p>@ThoangTran</p>
                      </span>
                    </div>
                  </Card>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </section>
  )
}

export default Contact
