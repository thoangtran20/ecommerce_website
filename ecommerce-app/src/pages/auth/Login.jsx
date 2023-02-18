import React, { useEffect, useState } from 'react'
import styles from './auth.module.scss'
import loginImg from '../../assets/images/auths/login.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { RiGoogleLine } from 'react-icons/ri'
import Card from '../../components/card/Card'
import { auth, db } from '../../firebase/config'
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
import Helmet from '../../components/helmet/Helmet'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSelector } from 'react-redux'
import { selectPreviousURL } from '../../stores/slice/cartSlice'
import { ROUTERS } from '../../constants'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { selectUserName } from '../../stores/slice/authSlice'

// Validate form with yup
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

  const userName = useSelector(selectUserName)
  console.log(userName)

  const previousURL = useSelector(selectPreviousURL)

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

  const redirectUser = () => {
    if (previousURL.includes('cart')) {
      return navigate(ROUTERS.cart)
    }
    navigate(ROUTERS.home)
  }

  const loginUser = (e) => {
    // e.preventDefault()
    if (!isValid) return

    setIsLoading(true)
    // Login with Email and Password with firebase
    signInWithEmailAndPassword(auth, email, password)
      // Nếu người dùng được tìm thấy sẽ tiến hành đăng nhập
      .then((userCredential) => {
        const user = userCredential.user
        setIsLoading(false)
        // console.log(user)
        // console.log('User ID: ', user.uid)
        const userConfig = {
          email: user.email,
          userID: user.uid,
          userName: user.displayName,
          password: password,
          createdAt: Timestamp.now().toDate(),
        }

        // console.log(userConfig)

        addDoc(collection(db, 'users'), userConfig)

        // Thông báo đăng nhập thành công
        toast.success('Login Successful!!!')
        // Nếu email đăng nhập là 'admin@mail.com'thì chuyển sang admin/home
        if (email === 'admin@gmail.com') {
          return navigate('/admin/home')
        } else {
          redirectUser()
        }
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(error.message)
      })
  }

  // Login with Google
  // Tạo tại khoản GoogleAuthProvider
  const provider = new GoogleAuthProvider()
  const signInWithGoogle = () => {
    // Đăng nhập với tài khoản google
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success('Login Successfully!!!')
        redirectUser()
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  useEffect(() => {
    // Lấy ra mảng Object các lỗi validate khi submit form
    const arrErrors = Object.values(errors)
    console.log(arrErrors)
    // Kiểm tra độ dài mảng arrErrors > 0 thì thông báo lỗi hiện ra
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
      <Helmet title="Login">
        <section className={`wrapper ${styles.auth}`}>
          <div className={styles.img}>
            <img src={loginImg} alt="Login" width="400" />
          </div>
          <Card>
            {' '}
            <div className={styles.form}>
              <h2>Login</h2>
              {/* Hàm handleSubmit sẽ validate trước khi gọi hàm loginUser */}
              <form onSubmit={handleSubmit(loginUser)}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  // đăng kí input cho Hook vói tên email để gọi validate
                  {...register('email')}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className={styles.input}>
                  {' '}
                  <input
                    type={passwordType}
                    placeholder="Password"
                    value={password}
                    // đăng kí input cho Hook vói tên passowrd để gọi validate
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
      </Helmet>
    </>
  )
}

export default Login
