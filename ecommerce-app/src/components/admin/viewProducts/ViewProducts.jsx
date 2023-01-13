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

const ViewProducts = () => {
  const { data, isLoading } = useFetchCollection('products')
  const products = useSelector(selectProducts)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      }),
    )
  }, [dispatch, data])

  // useEffect(() => {
  //   getProducts()
  // }, [])

  // const getProducts = () => {
  //   setIsLoading(true)

  //   try {
  //     const productsRef = collection(db, 'products')

  //     // console.log(productsRef)

  //     const q = query(productsRef, orderBy('createdAt', 'desc'))

  //     onSnapshot(q, (snapshot) => {
  //       // console.log(snapshot)
  //       // console.log(snapshot.docs)
  //       const allProducts = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }))
  //       // console.log(allProducts)
  //       setProducts(allProducts)
  //       setIsLoading(false)
  //       dispatch(
  //         STORE_PRODUCTS({
  //           products: allProducts,
  //         }),
  //       )
  //     })
  //   } catch (error) {
  //     setIsLoading(false)
  //     toast.error(error.message)
  //   }
  // }

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
      </div>
    </>
  )
}

export default ViewProducts
