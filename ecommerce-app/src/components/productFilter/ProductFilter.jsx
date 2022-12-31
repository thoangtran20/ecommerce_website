import React from 'react'
import { useState } from 'react'
import { products } from '../../data/ProductData'
import ProductList from '../../pages/productList/ProductList'
import './ProductFilter.scss'

const ProductFilter = () => {
  const [productsData, setProductsData] = useState(products)
  console.log(productsData)

  return (
    <div className="product__filter">
      <h4>Categories</h4>
      <div className="category">
        <button className="">All</button>
      </div>
      <h4>Brand</h4>
      <div className="brand">
        <select name="brand" id="">
          <option value="all">All</option>
        </select>
      </div>
      <h4>Colors</h4>
      <div className="colors">
        <select name="color" id="">
          <option value="all">All</option>
        </select>
      </div>
      <h4>Size</h4>
      <div className="size">
        <select name="size" id="">
          <option value="all">All</option>
        </select>
      </div>

      <h4>Price</h4>
      <p>1500</p>
      <div className="price">
        <input type="range" name="proce" min="100" max="1000" />
      </div>
      <button className="btn btn-danger">Clear Filter</button>
    </div>
  )
}

export default ProductFilter
