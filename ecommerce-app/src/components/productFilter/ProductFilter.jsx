import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
  // Lay dữ liệu trong state từ Redux store bằng cách sử dụng một selector function làm tham số đầu vào selectProducts = (state) => (state.products.selectProducts)
  const products = useSelector(selectProducts)
  console.log(products)
  // Khởi tạo giá trị state category ban đầu là All và thay đổi sau mỗi lần setCategory
  const [category, setCategory] = useState('All')
  const [brand, setBrand] = useState('All')
  const [price, setPrice] = useState(1000)
  const [size, setSize] = useState('All')
  const [color, setColor] = useState('All')

  // Lay gia tri state từ slice trong Redux store bằng cách sử dụng một selector function làm tham số đầu vào selectMaxPrice = (state) => (state.product.maxPrice)

  const maxPrice = useSelector(selectMaxPrice)
  const minPrice = useSelector(selectMinPrice)

  const dispatch = useDispatch()

  // Khởi tạo mảng allcategories bằng All và set theo category của từng product sao cho dữ liệu không trùng nhau
  const allCategories = [
    'All',
    ...new Set(products.map((product) => product.category)),
  ]

  // Khởi tạo mảng allBrands bằng All và set theo brand của từng product sao cho dữ liệu không trùng nhau

  const allBrands = [
    'All',
    ...new Set(products.map((product) => product.brand)),
  ]

  // // Khởi tạo mảng allSizes ban đầu bằng All, lấy ra mảng size của từng product
  // let allSizes = ['All', ...products.map((product) => product.size)]
  // console.log(allSizes)
  // // Lấy ra tất cả các size hiện có trong mảng
  // allSizes = allSizes.flat()
  // console.log(allSizes)
  // // Set tất cả các size trùng nhau vào thành một Object
  // allSizes = new Set(allSizes)
  // console.log(allSizes)

  // Khởi tạo mảng allSizes ban đầu bằng All, lấy ra mảng size của từng product
  // Lấy ra tất cả các size hiện có trong mảng allSizes
  // Set tất cả các size trùng nhau vào thành một Object allSizes
  const allSizes = new Set([
    'All',
    ...products.map((product) => product.size).flat(),
  ])
  console.log(allSizes)

  // Chuyển đổi Object allSizes thành mảng allSizesArr
  const allSizesArr = Array.from(allSizes)

  console.log(allSizesArr)

  const allColors = new Set([
    'All',
    ...products.map((product) => product.colors).flat(),
  ])

  console.log(allColors)

  const allColorsArr = Array.from(allColors)

  console.log(allColorsArr)

  // Filter Products theo category
  const filterProducts = (cat) => {
    // Thay đổi giá trị của category sau mỗi lần filter
    setCategory(cat)
    // Gọi tham chiếu đến action FILTER_BY_CATEGORY trong filterSlice
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }))
  }

  // Filter Products theo brand, giá trị filter products thay đổi theo giá trị trong dependencies sau mỗi lần callback action FILTER_BY_BRAND được dispatch
  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }))
  }, [dispatch, products, brand])

  // Filter Products theo size, giá trị filter products thay đổi theo giá trị trong dependencies sau mỗi lần callback action FILTER_BY_SIZE được dispatch

  useEffect(() => {
    dispatch(FILTER_BY_SIZE({ products, size }))
  }, [dispatch, products, size])

  useEffect(() => {
    dispatch(FILTER_BY_COLOR({ products, color }))
  }, [dispatch, products, color])

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }))
  }, [dispatch, products, price])

  // Xóa kết quả filter hiện tại và trả về filter ban đầu
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
        {/* Lấy ra tất cả phần tử của mảng allCategories */}
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
          {/* Lấy ra tất cả phần tử của mảng allBrands */}
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
