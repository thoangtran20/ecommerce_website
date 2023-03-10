import React, { useEffect, useRef, useState } from 'react'
import {
  RiShoppingBagLine,
  RiHeartLine,
  RiMenuLine,
  RiSearchLine,
} from 'react-icons/ri'

import { FaTimes } from 'react-icons/fa'
import { Button, Container, Row } from 'reactstrap'
import { motion } from 'framer-motion'
import logo from '../../assets/images/fashion-company-logo-png-transparent.png'
import userIcon from '../../assets/images/user-icon.png'
import './Header.scss'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ROUTERS } from '../../constants'
import { Dropdown, Menu, Space } from 'antd'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
  REMOVE_ACTIVE_USER,
  selectIsLoggedIn,
  SET_ACTIVE_USER,
} from '../../stores/slice/authSlice'
import { AdminOnlyLink } from '../adminOnlyRoute/AdminOnlyRoute'
import {
  cartActions,
  selectCartTotalQuantity,
} from '../../stores/slice/cartSlice'
import Notiflix from 'notiflix'

const Header = () => {
  const nav__links = [
    {
      path: '/',
      display: 'Home',
    },
    {
      path: '/shop',
      display: 'Shop',
    },
    {
      path: '/about',
      display: 'About',
    },
    {
      path: '/contact',
      display: 'Contact',
    },
    {
      path: '/blog',
      display: 'Blog',
    },
  ]

  // const { id } = useParams()
  // console.log(id)

  const confirmLogout = () => {
    Notiflix.Confirm.show(
      'Logout!!!',
      'You are about to logout user',
      'Logout',
      'Cancel',
      function okCb() {
        logoutUser()
      },
      function cancelCb() {
        console.log('Logout Canceled')
      },
      {
        width: '320px',
        borderRadius: '4px',
        titleColor: 'orangered',
        okButtonBackground: 'orangered',
        cssAnimationStyle: 'zoom',
      },
    )
  }

  const [menuList, setMenuList] = useState([])

  const unauthenticatedMenu = [
    {
      key: '1',
      label: (
        <NavLink to={'/login'}>
          <p target="_blank" rel="noopener noreferrer">
            Login
          </p>
        </NavLink>
      ),
    },
  ]

  const authenticatedMenu = [
    {
      key: '2',
      label: (
        <NavLink to={'/profile/'}>
          <p target="_blank" rel="noopener noreferrer">
            User Information
          </p>
        </NavLink>
      ),
    },
    {
      key: '3',
      label: (
        <NavLink to={'/order-history'}>
          <p target="_blank" rel="noopener noreferrer">
            Order History
          </p>
        </NavLink>
      ),
    },
    {
      key: '4',
      label: (
        <p
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            confirmLogout()
          }}
        >
          Logout
        </p>
      ),
    },
  ]
  const navigate = useNavigate()

  // Khoi tao ref de tham chieu den element can sua doi thong tin khong can dung den props, state
  const menuRef = useRef(null)
  const headerRef = useRef(null)

  // Lay state từ Redux store bằng cách sử dụng một selector function làm tham số đầu vào selectIsLoggedIn = (state) => (state.auth.isLoggedIn)

  const isLoggedIn = useSelector(selectIsLoggedIn)
  console.log(isLoggedIn)

  // Return về một tham chiếu đến dispatch function từ Redux store và được sử dụng để dispatch các action
  const dispatch = useDispatch()

  const [displayName, setDisplayName] = useState('')

  const cartTotalQuantity = useSelector(selectCartTotalQuantity)

  console.log(cartTotalQuantity)

  // const [visible, setVisible] = useState(false)

  const navigateToCart = () => {
    navigate(ROUTERS.cart)
  }

  const menuToggle = () => {
    menuRef.current.classList.toggle('active__menu')
  }

  // Dang xuat user ra khoi web
  const logoutUser = () => {
    // e.preventDefault()
    dispatch(cartActions.CLEAR_CART())
    signOut(auth)
      .then(() => {
        toast.success('Logout successfully!!!')
        navigate('/')
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  // ComponentDidMount - ComponentDidUpdate
  // useEffect(callback, dependencies);
  // CallBack: sẽ được gọi trong useEffect sau khi render lần đầu tiên hoặc khi update dữ liệu
  // Dependencies: Mảng chứa các đối số mà useEffect phụ thuộc vào để thực thi
  // + Không cung cấp: useEffect sẽ được gọi thực thi các tính toán bên trong nó mỗi khi thành phần render.
  // + []: chỉ thực thi một lần duy nhất sau khi thành phần đó render lần đầu tiên (componentDidMount)
  // + [props, state,..]: Kiểm tra giá trị của props, state mới với giá trị cũ. Nếu khác nhau Calllback sẽ được thực thi

  // ComponentDidMount - Hiển thị tổng số lượng sản phẩm trong giỏ hàng
  useEffect(() => {
    dispatch(cartActions.CALCULATE_TOTAL_QUANTITY())
  }, [])

  // ComponentDidUpdate - Nếu user đang loggedin thì hiển thị thông tin authenticatedMenu ngược lại thì hiển thị unauthenticatedMenu
  useEffect(() => {
    return !isLoggedIn
      ? setMenuList(unauthenticatedMenu)
      : setMenuList(authenticatedMenu)
  }, [isLoggedIn])

  // Monitor currently sign in user
  useEffect(() => {
    // Kiểm tra xem người dùng có đang đăng nhập không
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user)
        if (user.displayName === null) {
          const uDevide = user.email.slice(0, -10)
          console.log(uDevide)
          const uName = uDevide.charAt(0).toUpperCase() + uDevide.slice(1)
          console.log(uName)
          setDisplayName(uName)
        } else {
          setDisplayName(user.displayName)
        }
        console.log(user)

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          }),
        )
      } else {
        setDisplayName('')
        dispatch(REMOVE_ACTIVE_USER())
      }
    })
  }, [dispatch, displayName])

  // Scroll doi mau header navbar neu di chuyen xuong mot goc > 80
  const stickyHeaderFunction = () => {
    window.addEventListener('scroll', () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add('sticky__header')
      } else {
        headerRef.current.classList.remove('sticky__header')
      }
    })
  }
  useEffect(() => {
    stickyHeaderFunction()
    return () => window.removeEventListener('scroll', stickyHeaderFunction)
  })

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="" />
              <Link to="/" className="navbar-brand">
                <span style={{ color: '#103755' }}>Clothing</span>
                <span style={{ color: '#eeb808' }}>Store</span>
              </Link>
            </div>
            <div className="navigation" ref={menuRef}>
              <ul className="menu" id="navbar">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    {/* <NavLink>{item.display}</NavLink> */}

                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? 'nav__active' : ''
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
                <AdminOnlyLink>
                  <Link to="/admin/home">
                    {' '}
                    <button className="btn">Admin</button>
                  </Link>
                </AdminOnlyLink>
                <div className="nav__icons">
                  <span className="search__icon">
                    <i>
                      <RiSearchLine />
                    </i>
                  </span>
                  <span className="fav__icon">
                    <i>
                      <RiHeartLine />
                    </i>
                    <span className="badge">1</span>
                  </span>
                  <span className="cart__icon" onClick={navigateToCart}>
                    <i>
                      <RiShoppingBagLine />
                    </i>
                    <span className="badge">{cartTotalQuantity}</span>
                  </span>

                  <Space direction="vertical">
                    <Space wrap>
                      <Dropdown
                        overlay={<Menu className="menu" items={menuList} />}
                        placement="bottom"
                      >
                        <Button
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'black',
                          }}
                        >
                          <span>
                            <motion.img
                              whileTap={{ scale: 1.2 }}
                              src={userIcon}
                              alt=""
                            />
                            {isLoggedIn && <a href="#home"></a>}
                          </span>
                        </Button>
                      </Dropdown>
                    </Space>
                  </Space>
                </div>
                <span className="close" onClick={menuToggle}>
                  <i>
                    <FaTimes />
                  </i>
                </span>
              </ul>
            </div>

            <div className="nav__icons">
              <span className="search__icon">
                <i>
                  <RiSearchLine />
                </i>
              </span>
              <span className="fav__icon">
                <i>
                  <RiHeartLine />
                </i>
                <span className="badge">1</span>
              </span>
              <span className="cart__icon" onClick={navigateToCart}>
                <i>
                  <RiShoppingBagLine />
                </i>
                <span className="badge">{cartTotalQuantity}</span>
              </span>
              <Space direction="vertical">
                <Space wrap>
                  <Dropdown
                    overlay={<Menu className="menu" items={menuList} />}
                    placement="bottom"
                  >
                    <Button
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'black',
                      }}
                    >
                      <span>
                        <motion.img
                          whileTap={{ scale: 1.2 }}
                          src={userIcon}
                          alt=""
                        />
                        {isLoggedIn && <a href="#home">Hi, {displayName}</a>}
                      </span>
                    </Button>
                  </Dropdown>
                </Space>
              </Space>
            </div>

            <div className="mobile__menu">
              <span onClick={menuToggle}>
                <i>
                  <RiMenuLine />
                </i>
              </span>
              {/* <span className="cart__icon">
                  <i>
                    <RiShoppingBagLine />
                  </i>
                </span> */}
            </div>
          </div>
        </Row>
      </Container>
    </header>
  )
}

export default Header
