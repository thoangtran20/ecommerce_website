import React from 'react'
import styles from './auth.module.scss'
import loginImg from '../../assets/images/auths/login.jpg'
import { Link } from 'react-router-dom'
import { RiGoogleLine } from 'react-icons/ri'
import Card from '../../components/card/Card'

const Login = () => {
  return (
    <section className={`wrapper ${styles.auth}`}>
      <div className={styles.img}>
        <img src={loginImg} alt="Login" width="400" />
      </div>
      <Card>
        {' '}
        <div className={styles.form}>
          <h2>Login</h2>
          <form>
            <input type="text" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button className="--btn --btn-primary --btn-block">Login</button>
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
  )
}

export default Login
