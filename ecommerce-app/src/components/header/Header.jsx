import React, { useEffect, useRef } from 'react'
import {
  RiShoppingBagLine,
  RiHeartLine,
  RiMenuLine,
  RiSearchLine,
} from 'react-icons/ri'
import { Container, Row } from 'reactstrap'
import { motion } from 'framer-motion'
import logo from '../../assets/images/fashion-company-logo-png-transparent.png'
import userIcon from '../../assets/images/user-icon.png'
import './Header.scss'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
  const nav__links = [
    {
      path: 'home',
      display: 'Home',
    },
    {
      path: 'shop',
      display: 'Shop',
    },
    {
      path: 'about',
      display: 'About',
    },
    {
      path: 'Contact',
      display: 'Contact',
    },
    {
      path: 'Contact',
      display: 'Blog',
    },
  ]

  const menuRef = useRef(null)
  const headerRef = useRef(null)

  const menuToggle = () => {
    menuRef.current.classList.toggle('active__menu')
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
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
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
              <span className="cart__icon">
                <i>
                  <RiShoppingBagLine />
                </i>
                <span className="badge"></span>
              </span>
              <span>
                <motion.img whileTap={{ scale: 1.2 }} src={userIcon} alt="" />
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
