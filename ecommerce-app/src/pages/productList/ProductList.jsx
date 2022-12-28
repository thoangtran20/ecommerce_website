import React from 'react'
import './ProductList.scss'
import ProductCard from '../productCard/ProductCard'

const ProductList = ({ data }) => {
  return (
    <div className="product__container">
      <>
        {data?.map((item, index) => (
          <ProductCard item={item} key={index} />
        ))}
      </>
    </div>
  )
}

export default ProductList
