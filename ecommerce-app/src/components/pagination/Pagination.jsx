import React from 'react'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './Pagination.scss'

const Pagination = () => {
  return (
    <section className="pagination">
      <Link to="#">1</Link>
      <Link to="#">2</Link>
      <Link to="#">
        <i>
          <FaLongArrowAltRight />
        </i>
      </Link>
    </section>
  )
}

export default Pagination
