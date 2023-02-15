import React, { useRef } from 'react'
import { FaEnvelope, FaPhoneAlt, FaTwitter } from 'react-icons/fa'
import emailjs from '@emailjs/browser'
import { GoLocation } from 'react-icons/go'
import Card from '../../components/card/Card'
import styles from './Contact.module.scss'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import { Col, Container, Row } from 'reactstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Helmet from '../../components/helmet/Helmet'

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const schema = yup.object().shape({
  user_name: yup
    .string()
    .required('Username is required...')
    .min(3, 'Username must be atleast 3 characters long...')
    .max(30, 'Username must be atmost 30 characters long...'),
  user_email: yup
    .string()
    .required('Email is required...')
    .matches(emailRegex, 'Email is invalid'),
  subject: yup.string().required('Subject is required'),
  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Minimum Required length is 10')
    .max(100, 'Maximum allowed length is 100 '),
})

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  })

  const form = useRef()

  const sendEmail = (e) => {
    console.log(e)
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
          form.current.reset()
          // console.log(form.current)
        },
        (error) => {
          toast.error(error.text)
        },
      )
  }

  return (
    <Helmet title="contact">
      <section>
        <div className={`wrapper ${styles.contact}`}>
          <h2>Contact Us</h2>
          <div className={styles.section}>
            <Container>
              <Row className="mb-5 mt-3">
                <Col lg="6" md="3">
                  <form ref={form} onSubmit={handleSubmit(sendEmail)}>
                    <Card cardClass={styles.card}>
                      <label>Name</label>
                      <input
                        type="text"
                        name="user_name"
                        placeholder="Full Name"
                        {...register('user_name')}
                      />
                      <p className={styles.errors}>
                        {errors.user_name?.message}
                      </p>

                      <label>Email</label>
                      <input
                        type="email"
                        name="user_email"
                        placeholder="Your active email"
                        {...register('user_email')}
                      />
                      <p className={styles.errors}>
                        {errors.user_email?.message}
                      </p>

                      <label>Subject</label>
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        {...register('subject')}
                      />
                      <p className={styles.errors}>{errors.subject?.message}</p>

                      <label>Message</label>
                      <textarea
                        name="message"
                        cols="30"
                        rows="10"
                        {...register('message')}
                      />
                      <p className={styles.errors}>{errors.message?.message}</p>
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
    </Helmet>
  )
}

export default Contact
