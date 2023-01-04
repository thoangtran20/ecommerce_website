import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card'
import registerImg from '../../assets/images/auths/register.png'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

import styles from './auth.module.scss'
import { RiGoogleLine } from 'react-icons/ri'
import { toast, ToastContainer } from 'react-toastify'
import { auth } from '../../firebase/config'
import Loader from '../../components/loader/Loader'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const registerUser = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!!!')
      return false
    }

    setIsLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
        setIsLoading(false)
        toast.success('Register Successfull!!!')
        navigate('/login')
      })
      .catch((error) => {
        toast.error(error.message)
        setIsLoading(false)
      })
    console.log(email, password, confirmPassword)
  }
  return (
    <>
      <ToastContainer />
      {isLoading && <Loader />}
      <section className={`wrapper ${styles.auth}`}>
        <Card>
          {' '}
          <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>

            <span className={styles.register}>
              <p>Already have an account?</p>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </Card>
        <div className={styles.img}>
          <img src={registerImg} alt="Register" width="400" />
        </div>
      </section>
    </>
  )
}

export default Register
