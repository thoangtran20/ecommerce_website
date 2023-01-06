import React, { useEffect, useState } from 'react'
import styles from './auth.module.scss'
import resetImg from '../../assets/images/auths/reset-password.jpg'
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email address')
    .required('Please enter your email address'),
})

const Reset = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const resetPassword = (e) => {
    // e.preventDefault()
    if (!isValid) return

    setIsLoading(true)

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false)
        toast.success('Check your email for a reset link')
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(error.message)
      })
  }

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
    <>
      {isLoading && <Loader />}
      <section className={`wrapper ${styles.auth}`}>
        <div className={styles.img}>
          <img src={resetImg} alt="Reset Password" width="400" />
        </div>
        <Card>
          {' '}
          <div className={styles.form}>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit(resetPassword)}>
              <input
                type="text"
                placeholder="Email"
                value={email}
                {...register('email')}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="--btn --btn-primary --btn-block"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Reset Password
              </button>
              <div className={styles.links}>
                <p>
                  {' '}
                  <Link to="/login">- Login</Link>
                </p>
                <p>
                  {' '}
                  <Link to="/register">- Register</Link>
                </p>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  )
}

export default Reset
