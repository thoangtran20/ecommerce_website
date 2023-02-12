import {
  orderBy,
  query,
  deleteDoc,
  doc,
  onSnapshot,
  collection,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaEdit, FaTrash, FaTrashAlt } from 'react-icons/fa'
import { Table } from 'reactstrap'
import { db, storage } from '../../../firebase/config'
import styles from './ViewProducts.module.scss'
import Loader from '../../loader/Loader'
import { deleteObject, ref } from 'firebase/storage'
import Notiflix from 'notiflix'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectProducts,
  STORE_PRODUCTS,
} from '../../../stores/slice/productSlice'
import useFetchCollection from '../../../customHooks/useFetchCollection'
import Search from '../../search/Search'
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
} from '../../../stores/slice/filterSlice'
import Pagination from '../../pagination/Pagination'

const ViewProducts = () => {
  const { data, isLoading } = useFetchCollection('products')
  const [search, setSearch] = useState('')

  const products = useSelector(selectProducts)
  const filteredProducts = useSelector(selectFilteredProducts)

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(10)

  // Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      }),
    )
  }, [dispatch, data])

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }))
  }, [dispatch, products, search])

  const confirmDelete = (id, imgURL) => {
    Notiflix.Confirm.show(
      'Delete Product!!!',
      'You are about to delete to delete product',
      'Delete',
      'Cancel',
      function okCb() {
        deleteProduct(id, imgURL)
      },
      function cancelCb() {
        console.log('Delete Canceled')
      },
      {
        width: '320px',
        borderRadius: '4px',
        titleColor: 'orangered',
        okButtonBackground: 'orangered',
        cssAnimationStyle: 'zoom',
      },
    )
  }

  const deleteProduct = async (id, imgURL) => {
    try {
      await deleteDoc(doc(db, 'products', id))
      const storageRef = ref(storage, imgURL)
      await deleteObject(storageRef)
      toast.success('Product deleted successfully')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All Products</h2>

        <div className={styles.search}>
          <p>
            <b>{filteredProducts.length}</b> products found
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {filteredProducts.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => {
                const { id, name, price, imgURL, category } = product
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={imgURL} alt={name} style={{ width: '100px' }} />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`$${price}`}</td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-products/${id}`}>
                        <FaEdit size={20} color="#28a745" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={18}
                        color="#f90716"
                        onClick={() => confirmDelete(id, imgURL)}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        )}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
        />
      </div>
    </>
  )
}

export default ViewProducts
