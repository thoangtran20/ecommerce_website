import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card'
import registerImg from '../../assets/images/auths/register.png'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { AiFillEyeInvisible as EyeOff, AiFillEye as Eye } from 'react-icons/ai'

import styles from './auth.module.scss'
import { RiGoogleLine } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { auth } from '../../firebase/config'
import Loader from '../../components/loader/Loader'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [passwordType, setPasswordType] = useState('password')
  const [confirmPasswordType, setConfirmPasswordType] = useState('password')

  const [icon, setIcon] = useState(EyeOff)
  console.log(icon)

  const navigate = useNavigate()

  const show = () => {
    passwordType === 'password'
      ? setPasswordType('text')
      : setPasswordType('password')
    icon === Eye ? setIcon(EyeOff) : setIcon(Eye)
  }

  const showCPasword = () => {
    confirmPasswordType === 'password'
      ? setConfirmPasswordType('text')
      : setConfirmPasswordType('password')
    icon === Eye ? setIcon(EyeOff) : setIcon(Eye)
  }

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
              <div className={styles.input}>
                <input
                  type={passwordType}
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i onClick={show}>{icon}</i>
              </div>

              <div className={styles.input}>
                <input
                  type={confirmPasswordType}
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <i onClick={showCPasword}>{icon}</i>
              </div>

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
