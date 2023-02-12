import React, { useEffect } from 'react'
import { useState } from 'react'
import { BsFillGridFill } from 'react-icons/bs'
import { FaListAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
// import { Pagination } from 'reactstrap'
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
  SORT_PRODUCTS,
} from '../../stores/slice/filterSlice'
import { selectProducts } from '../../stores/slice/productSlice'
import Search from '../search/Search'
import './ProductAction.scss'

const ProductAction = () => {
  const [grid, setGrid] = useState(true)
  const products = useSelector(selectProducts)
  // console.log(products)

  const [sort, setSort] = useState('latest')
  const [search, setSearch] = useState('')

  const dispatch = useDispatch()

  const filteredProducts = useSelector(selectFilteredProducts)
  // console.log(filteredProducts)

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }))
  }, [dispatch, products, search])

  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort }))
  }, [dispatch, products, sort])


  return (
    <>
      {' '}
      <div className="product__action">
        <div className="top">
          <div className="icons">
            <BsFillGridFill
              size={23}
              color="orangered"
              onClick={() => setGrid(true)}
            />

            <FaListAlt
              size={24}
              color="#006534"
              onClick={() => setGrid(false)}
            />

            <p>
              <b>{filteredProducts.length}</b> Produts are found
            </p>
            {/* Search Icon */}
          </div>
          <div className="search">
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* Sort Product */}
          <div className="sort">
            <label>Sort by:</label>
            <select
              name=""
              id=""
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="latest">Latest Product</option>
              <option value="lowest-price" key="">
                Lowest Price
              </option>
              <option value="highest-price">Highest Price</option>
              <option value="a-z">A - Z</option>
              <option value="z-a">Z - A</option>
            </select>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductAction
