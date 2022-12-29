import React from 'react'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import './CustomerLayout.scss'

const CustomerLayout = (props) => {
  return (
    <>
      <Header />
      <div className="main">{props.content}</div>
      <Footer />
    </>
  )
}

export default CustomerLayout
