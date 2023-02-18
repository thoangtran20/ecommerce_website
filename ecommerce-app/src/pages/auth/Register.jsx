import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card'
import registerImg from '../../assets/images/auths/register.png'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { AiFillEyeInvisible as EyeOff, AiFillEye as Eye } from 'react-icons/ai'

import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'

import styles from './auth.module.scss'
import { toast } from 'react-toastify'
import { auth } from '../../firebase/config'
import Loader from '../../components/loader/Loader'
import { useForm } from 'react-hook-form'
import Helmet from '../../components/helmet/Helmet'

// Định nghĩa Object validate với yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email address')
    .required('Please enter your email address'),
  password: yup
    .string()
    .required('Please enter your password')
    .min(8, 'Your password must be at least 8 characters or greater'),
  confirmPassword: yup.string().required('Please enter your confirm password'),
})

const Register = () => {
  // Khởi tạo state email ban dầu bằng '' và thay đổi sau khi setEmail bới một giá trị khác
  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [passwordType, setPasswordType] = useState('password')
  const [confirmPasswordType, setConfirmPasswordType] = useState('password')

  // Khởi tạo register, handleSubmit, formState bằng useForm để validate with yup
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  console.log(Object.values(errors))

  const [icon, setIcon] = useState(EyeOff)

  const navigate = useNavigate()

  // Hiển thị mật khẩu bị ẩn
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
    // e.preventDefault()

    if (!isValid) return

    // Khởi tạo object newUser và gán dữ liệu vào

    // const newUser = {
    //   email: email,
    //   password: password,
    //   confirmPassword: confirmPassword,
    // }

    // console.log(newUser)

    // Kiểm tra password không trùng với confirmPassword
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!!!')
      return false
    }

    setIsLoading(true)
    // Khởi tạo user bằng firebase/auth với email vá password
    createUserWithEmailAndPassword(auth, email, password)
      // Nếu user được tạo thì sẽ tiến hành đăng ký
      .then((userCredential) => {
        // Khai báo user khi đăng ký tài khoản
        const user = userCredential.user
        console.log(user)
        setIsLoading(false)
        toast.success('Register Successfull!!!')
        // điều hướng sang page login
        navigate('/login')
      })
      .catch((error) => {
        toast.error(error.message)
        setIsLoading(false)
      })
    console.log(email, password, confirmPassword)
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
          <Card>
            {' '}
            <div className={styles.form}>
              <h2>Register</h2>
              <form onSubmit={handleSubmit(registerUser)}>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  {...register('email')}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className={styles.input}>
                  <input
                    type={passwordType}
                    placeholder="Password"
                    name="password"
                    value={password}
                    {...register('password')}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i onClick={show}>{icon}</i>
                </div>

                <div className={styles.input}>
                  <input
                    type={confirmPasswordType}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    name="confirmPassword"
                    {...register('confirmPassword')}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <i onClick={showCPasword}>{icon}</i>
                </div>

                <button
                  className="--btn --btn-primary --btn-block"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
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
      </Helmet>
    </>
  )
}

export default Register
