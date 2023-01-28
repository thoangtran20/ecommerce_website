import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductList from '../../pages/productList/ProductList'
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_COLOR,
  FILTER_BY_PRICE,
  FILTER_BY_SIZE,
} from '../../stores/slice/filterSlice'
import {
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
} from '../../stores/slice/productSlice'
import styles from './ProductFilter.module.scss'

const ProductFilter = () => {
  const products = useSelector(selectProducts)
  const [category, setCategory] = useState('All')
  const [brand, setBrand] = useState('All')
  const [price, setPrice] = useState(1000)
  const [size, setSize] = useState('All')
  const [color, setColor] = useState('All')
  // const [size, setSize] = useState()

  // const filterSize = (item, value) => {
  //   setFilter({
  //     ...filter,
  //     size: [...filter.size, item.size],
  //   })
  //   console.log(filter.size)
  //   console.log(size)
  // }

  const maxPrice = useSelector(selectMaxPrice)
  const minPrice = useSelector(selectMinPrice)

  const dispatch = useDispatch()

  const allCategories = [
    'All',
    ...new Set(products.map((product) => product.category)),
  ]

  // console.log(allCategories)

  const allBrands = [
    'All',
    ...new Set(products.map((product) => product.brand)),
  ]

  console.log(allBrands)
  // let allSizes = ['All', ...products.map((product) => product.size)]
  // console.log(allSizes)
  // allSizes = allSizes.flat()
  // console.log(allSizes)
  // allSizes = new Set(allSizes)
  // console.log(allSizes)

  const allSizes = new Set([
    'All',
    ...products.map((product) => product.size).flat(),
  ])
  console.log(allSizes)

  const allSizesArr = Array.from(allSizes)

  console.log(allSizesArr)

  const allColors = new Set([
    'All',
    ...products.map((product) => product.colors).flat(),
  ])

  console.log(allColors)

  const allColorsArr = Array.from(allColors)

  console.log(allColorsArr)

  const filterProducts = (cat) => {
    setCategory(cat)
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }))
  }

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }))
  }, [dispatch, products, brand])

  useEffect(() => {
    dispatch(FILTER_BY_SIZE({ products, size }))
  }, [dispatch, products, size])

  useEffect(() => {
    dispatch(FILTER_BY_COLOR({ products, color }))
  }, [dispatch, products, color])

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }))
  }, [dispatch, products, price])

  const clearFilters = () => {
    setCategory('All')
    setBrand('All')
    setSize('All')
    setPrice(maxPrice)
  }

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              key={index}
              className={`${category}` === cat ? `${styles.active}` : null}
              onClick={() => filterProducts(cat)}
            >
              &#8250; {cat}
            </button>
          )
        })}
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select name="brand" onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brand, index) => {
            return (
              <option value={brand} key={index}>
                {brand}
              </option>
            )
          })}
        </select>
      </div>
      <h4>Colors</h4>
      <div className={styles.colors}>
        <select name="color" onChange={(e) => setColor(e.target.value)}>
          {allColorsArr.map((color, index) => {
            return (
              <option value={color} key={index}>
                {color}
              </option>
            )
          })}
        </select>
      </div>
      <h4>Size</h4>
      <div className={styles.size}>
        <select name="size" onChange={(e) => setSize(e.target.value)}>
          {allSizesArr.map((size, index) => {
            return (
              <option value={size} key={index}>
                {size}
              </option>
            )
          })}
        </select>
      </div>

      <h4>Price</h4>
      <p>{`$${price}`}</p>
      <div className={styles.price}>
        <input
          type="range"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min={minPrice}
          max={maxPrice}
        />
      </div>
      <button className="btn btn-danger" onClick={clearFilters}>
        Clear Filter
      </button>
    </div>
  )
}

export default ProductFilter
