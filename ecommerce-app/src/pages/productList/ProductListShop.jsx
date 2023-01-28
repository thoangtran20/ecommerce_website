import React from 'react'
import './ProductList.scss'
import ProductCard from '../productCard/ProductCard'
import { useSelector } from 'react-redux'
import { selectFilteredProducts } from '../../stores/slice/filterSlice'
import { useState } from 'react'
import Pagination from '../../components/pagination/Pagination'

const ProductListShop = ({ products }) => {
  const filteredProducts = useSelector(selectFilteredProducts)
  // console.log(filteredProducts)

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(8)

  // Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  )

  return (
    <div className="product__container">
      {products.length === 0 ? (
        <p>No product found.</p>
      ) : (
        <>
          {' '}
          {currentProducts?.map((item, index) => (
            <ProductCard item={item} key={index} />
          ))}
        </>
      )}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
      />
    </div>
  )
}

export default ProductListShop
