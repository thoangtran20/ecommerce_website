import React from 'react'
import './ProductList.scss'
import ProductCard from '../productCard/ProductCard'

const ProductList = () => {
  return (
    <div className="product__container">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  )
}

export default ProductList
