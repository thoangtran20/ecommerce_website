import React from 'react'
import { useState } from 'react'
import { MdOutlineArrowLeft, MdOutlineArrowRight } from 'react-icons/md'
import styles from './Pagination.module.scss'

const Pagination = ({
  currentPage,
  setCurrentPage,
  productsPerPage,
  totalProducts,
}) => {
  const pageNumbers = []
  const totalPages = totalProducts / productsPerPage
  // Limit the page Numbers shown
  const [pageNumberLimit] = useState(5)
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

  // Paginate
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Go to next page
  const paginateNext = () => {
    setCurrentPage(currentPage + 1)
    // Show next set of pageNumbers
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
    }
  }

  // Go to prev page
  const paginatePrev = () => {
    setCurrentPage(currentPage - 1)
    // Show prev set of pageNumbers

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
    }
  }

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <section className={styles.pagination}>
      <li onClick={paginatePrev}>
        <MdOutlineArrowLeft />
      </li>
      {pageNumbers.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit)
          return (
            <li
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? `${styles.active}` : null}
            >
              {number}
            </li>
          )
      })}
      <li onClick={paginateNext}>
        <MdOutlineArrowRight />
      </li>
      <p>
        <b className={styles.page}>{`page ${currentPage}`}</b>
        <span>{` of `}</span>
        <b>{`${Math.ceil(totalPages)}`}</b>
      </p>
    </section>
  )
}

export default Pagination
