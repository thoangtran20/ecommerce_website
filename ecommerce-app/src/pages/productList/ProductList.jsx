import React from 'react'
import './ProductList.scss'
import ProductCard from '../productCard/ProductCard'

const ProductList = ({ products }) => {
  return (
    <div className="product__container">
      <>
        {products?.map((item, index) => (
          <ProductCard item={item} key={index} />
        ))}
      </>
    </div>
  )
}

export default ProductList
