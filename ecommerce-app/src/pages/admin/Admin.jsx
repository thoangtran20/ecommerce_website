import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddProducts from '../../components/admin/addProducts/AddProducts'
import AdminHome from '../../components/admin/home/AdminHome'
import Navbar from '../../components/admin/navbar/Navbar'
import Orders from '../../components/admin/orders/Orders'
import ViewProducts from '../../components/admin/viewProducts/ViewProducts'
import styles from './Admin.module.scss'

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<AdminHome />} />
          <Route path="all-products" element={<ViewProducts />} />
          <Route path="add-products/:id" element={<AddProducts />} />
          <Route path="orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  )
}

export default Admin
