import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaEdit, FaTrash, FaTrashAlt } from 'react-icons/fa'
import { Table } from 'reactstrap'
import { db } from '../../../firebase/config'
import styles from './ViewProducts.module.scss'

const ViewProducts = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = () => {
    setIsLoading(true)

    try {
      const productsRef = collection(db, 'products')

      // console.log(productsRef)

      const q = query(productsRef, orderBy('createdAt', 'desc'))

      onSnapshot(q, (snapshot) => {
        console.log(snapshot)
        console.log(snapshot.docs)
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        console.log(allProducts)
        setProducts(allProducts)
        setIsLoading(false)
      })
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  }
  return (
    <>
      <div className={styles.table}>
        <h2>All Products</h2>

        {products.length === 0 ? (
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
              {products.map((product, index) => {
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
                    <td>
                      <Link to="/admin/add-product">
                        <FaEdit size={20} color="#28a745" />
                      </Link>
                      &nbsp;
                      <Link>
                        {' '}
                        <FaTrashAlt size={18} color="#f90716" />
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        )}
      </div>
    </>
  )
}

export default ViewProducts
