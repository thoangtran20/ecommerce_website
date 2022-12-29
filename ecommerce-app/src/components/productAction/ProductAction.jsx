import React from 'react'
import { useState } from 'react'
import { BsFillGridFill } from 'react-icons/bs'
import { FaListAlt } from 'react-icons/fa'
import Search from '../search/Search'
import './ProductAction.scss'

const ProductAction = () => {
  const [grid, setGrid] = useState(true)
  const [sort, setSort] = useState('latest')
  const [search, setSearch] = useState()
  return (
    <div className="product__action">
      <div className="top">
        <div className="icons">
          <BsFillGridFill
            size={23}
            color="orangered"
            onClick={() => setGrid(true)}
          />

          <FaListAlt size={24} color="#006534" onClick={() => setGrid(false)} />

          <p>
            <b>{}</b> Produts are found
          </p>
          {/* Search Icon */}
          <div className="search">
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="sort">
            <label>Sort by:</label>
            <select name="" id="" value="">
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
    </div>
  )
}

export default ProductAction
