import React from 'react'
import { BiSearch } from 'react-icons/bi'
import './Search.scss'

const Search = ({ value, onChange }) => {
  return (
    <div className="search">
      <span>
        <i>
          <BiSearch size={18} className="icon" />
        </i>
      </span>
      <input
        type="text"
        placeholder="Search by name"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Search
