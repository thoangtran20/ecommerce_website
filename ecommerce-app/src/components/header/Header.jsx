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
import { getAuth, signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'

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
            logoutUser()
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

  const [visible, setVisible] = useState(false)

  const navigateToCart = () => {
    navigate(ROUTERS.cart)
  }

  const menuToggle = () => {
    menuRef.current.classList.toggle('active__menu')
  }

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logout successfully!!!')
        navigate('/')
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  // useEffect(() => {
  //   return !userInfo.data
  //     ? setMenuList(unauthenticatedMenu)
  //     : setMenuList(authenticatedMenu)
  // }, [userInfo])

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
                    <span className="badge"></span>
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
                <span className="badge">2</span>
              </span>
              <span>
                <Space direction="vertical">
                  <Space wrap>
                    <p
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        gotoLogin()
                      }}
                    >
                      Login
                    </p>
                    <p
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        logoutUser()
                      }}
                    >
                      Logout
                    </p>

                    <motion.img
                      whileTap={{ scale: 1.2 }}
                      src={userIcon}
                      alt=""
                    />

                    {/* <Dropdown
                      overlay={<Menu items={menuList} />}
                      placement="bottom"
                    >
                      <Button
                        style={{
                          fontSize: '30px',
                          background: 'none',
                          border: 'none',
                          color: 'black',
                        }}
                      >
                        <motion.img
                          whileTap={{ scale: 1.2 }}
                          src={userIcon}
                          alt=""
                        />
                      </Button>
                    </Dropdown> */}
                  </Space>
                </Space>
              </span>
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
