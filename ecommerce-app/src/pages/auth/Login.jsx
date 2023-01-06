import React, { useEffect, useState } from 'react'
import styles from './auth.module.scss'
import loginImg from '../../assets/images/auths/login.jpg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { RiGoogleLine } from 'react-icons/ri'
import Card from '../../components/card/Card'
import { auth } from '../../firebase/config'
import { AiFillEyeInvisible as EyeOff, AiFillEye as Eye } from 'react-icons/ai'
import { toast } from 'react-toastify'

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import Loader from '../../components/loader/Loader'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email address')
    .required('Please enter your email address'),
  password: yup
    .string()
    .required('Please enter your password')
    .min(8, 'Your password must be at least 8 characters or greater'),
})

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [passwordType, setPasswordType] = useState('password')
  const [icon, setIcon] = useState(EyeOff)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  console.log(Object.values(errors))

  const show = () => {
    passwordType === 'password'
      ? setPasswordType('text')
      : setPasswordType('password')
    icon === Eye ? setIcon(EyeOff) : setIcon(Eye)
  }

  const loginUser = (e) => {
    // e.preventDefault()
    if (!isValid) return

    setIsLoading(true)

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user
        setIsLoading(false)
        toast.success('Login Successful!!!')
        navigate('/')
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(error.message)
      })
  }

  // Login with Google
  const provider = new GoogleAuthProvider()
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user
        toast.success('Login Successfully')
        navigate('/')
      })
      .catch((error) => {
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
          <img src={loginImg} alt="Login" width="400" />
        </div>
        <Card>
          {' '}
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(loginUser)}>
              <input
                type="email"
                placeholder="Email"
                // required
                value={email}
                {...register('email')}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className={styles.input}>
                {' '}
                <input
                  type={passwordType}
                  placeholder="Password"
                  value={password}
                  {...register('password')}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* <IconBase /> */}
                <i onClick={show}>{icon}</i>
              </div>

              <button
                type="submit"
                className="--btn --btn-primary --btn-block"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset">Reset Password</Link>
              </div>
              <p>-- or --</p>
            </form>
            <button
              className="--btn --btn-danger --btn-block"
              onClick={signInWithGoogle}
            >
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
