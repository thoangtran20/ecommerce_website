import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { selectUserName } from '../../../stores/slice/authSlice'
import styles from './Navbar.module.scss'

const Navbar = () => {
  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : '')

  const userName = useSelector(selectUserName)
  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        <h4>{userName}</h4>
      </div>
      <nav>
        <ListGroup>
          <ListGroupItem>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
          </ListGroupItem>
          <ListGroupItem>
            <NavLink to="/admin/all-products" className={activeLink}>
              All Products
            </NavLink>
          </ListGroupItem>
          <ListGroupItem>
            <NavLink to="/admin/add-products" className={activeLink}>
              Add Products
            </NavLink>
          </ListGroupItem>
          <ListGroupItem>
            <NavLink to="/admin/orders" className={activeLink}>
              Orders
            </NavLink>
          </ListGroupItem>
        </ListGroup>
      </nav>
    </div>
  )
}

export default Navbar
