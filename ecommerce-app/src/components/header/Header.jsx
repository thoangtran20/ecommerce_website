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
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
  REMOVE_ACTIVE_USER,
  selectIsLoggedIn,
  selectUserID,
  selectUserName,
  SET_ACTIVE_USER,
} from '../../stores/slice/authSlice'
import AdminOnlyRoute, { AdminOnlyLink } from '../adminOnlyRoute/AdminOnlyRoute'
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
        <NavLink to={'/profile'}>
          <p target="_blank" rel="noopener noreferrer">
            User Information
          </p>
        </NavLink>
      ),
    },
    {
      key: '3',
      label: (
        <NavLink to={'/order-list/confirm'}>
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
  const menuRef = useRef(null)
  const headerRef = useRef(null)

  const isLoggedIn = useSelector(selectIsLoggedIn)
  console.log(isLoggedIn)

  const dispatch = useDispatch()

  const [displayName, setDisplayName] = useState('')

  const cartTotalQuantity = useSelector(selectCartTotalQuantity)

  console.log(cartTotalQuantity)

  const [visible, setVisible] = useState(false)

  const navigateToCart = () => {
    navigate(ROUTERS.cart)
  }

  const menuToggle = () => {
    menuRef.current.classList.toggle('active__menu')
  }

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

  useEffect(() => {
    dispatch(cartActions.CALCULATE_TOTAL_QUANTITY())
  }, [])

  useEffect(() => {
    return !isLoggedIn
      ? setMenuList(unauthenticatedMenu)
      : setMenuList(authenticatedMenu)
  }, [dispatch, isLoggedIn])

  // Monitor currently sign in user
  useEffect(() => {
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

  const gotoLogin = () => {
    navigate('/login')
  }

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
                  <span>
                    <motion.img
                      whileTap={{ scale: 1.2 }}
                      src={userIcon}
                      alt=""
                    />
                  </span>
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
