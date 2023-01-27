import React from 'react'
import './ProductList.scss'
import ProductCard from '../productCard/ProductCard'
import { useSelector } from 'react-redux'
import { selectFilteredProducts } from '../../stores/slice/filterSlice'

const ProductListShop = ({ products }) => {
  const filteredProducts = useSelector(selectFilteredProducts)
  console.log(filteredProducts)

  return (
    <div className="product__container">
      {products.length === 0 ? (
        <p>No product found.</p>
      ) : (
        <>
          {' '}
          {filteredProducts?.map((item, index) => (
            <ProductCard item={item} key={index} />
          ))}
        </>
      )}
    </div>
  )
}

export default ProductListShop
