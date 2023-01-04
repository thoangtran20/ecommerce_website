import React, { useState } from 'react'
import styles from './auth.module.scss'
import loginImg from '../../assets/images/auths/login.jpg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { RiGoogleLine } from 'react-icons/ri'
import Card from '../../components/card/Card'
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'

import { signInWithEmailAndPassword } from 'firebase/auth'
import Loader from '../../components/loader/Loader'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const loginUser = (e) => {
    e.preventDefault()
    setIsLoading(true)

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        setIsLoading(false)
        toast.success('Login Successful!!!')
        console.log(user)
        navigate('/')
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(error.message)
      })
  }
  return (
    <>
      {isLoading && <Loader />}
      <section className={`wrapper ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="400" />
        </div>
        <Card>
          {' '}
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
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
              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset">Reset Password</Link>
              </div>
              <p>-- or --</p>
            </form>
            <button className="--btn --btn-danger --btn-block">
              <RiGoogleLine color="#fff" /> Login With Google
            </button>
            <span className={styles.register}>
              <p>Don't have an account? </p>
              <Link to="/register">Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  )
}

export default Login
