import Card from '../../card/Card'
import React, { useState } from 'react'
import styles from './AddProducts.module.scss'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage'

import { Form, FormGroup, Input, Label } from 'reactstrap'
import { toast } from 'react-toastify'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '../../../firebase/config'
import { useNavigate } from 'react-router'
import Loader from '../../loader/Loader'

const AddProducts = () => {
  const storage = getStorage()

  const categories = [
    { id: 1, name: 'T-Shirt' },
    { id: 2, name: 'Skirt' },
    { id: 3, name: 'Short' },
    { id: 4, name: 'Jacket' },
    { id: 5, name: 'Jean' },
    { id: 6, name: 'Women-Shoes' },
    { id: 7, name: 'Kid-Clothes' },
    { id: 8, name: 'Men-Shoes' },
  ]

  const initialState = {
    name: '',
    imgURL: '',
    price: 0,
    category: '',
    brand: '',
    description: '',
    stock: 0,
    avgRating: 0,
  }
  const [product, setProduct] = useState({
    ...initialState,
  })

  const [uploadProgress, setUploadProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const addProduct = (e) => {
    e.preventDefault()
    console.log(product)
    setIsLoading(true)

    try {
      const docRef = addDoc(collection(db, 'products'), {
        name: product.name,
        imgURL: product.imgURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        description: product.description,
        stock: Number(product.stock),
        avgRating: Number(product.avgRating),
        createdAt: Timestamp.now().toDate(),
      })
      setIsLoading(false)
      setUploadProgress(0)
      setProduct({ ...initialState })
      toast.success('Product uploaded successfully!!!')
      navigate('/admin/all-products')
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    // console.log(file)
    const storageRef = ref(storage, `ClothingStore/${Date.now()}${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        setUploadProgress(progress)
      },
      (error) => {
        // Handle unsuccessful uploads
        toast.error(error.message)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL)
          setProduct({ ...product, imgURL: downloadURL })
          toast.success('Image uploaded successfully')
        })
      },
    )
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h1>Add New Products</h1>
        <Card cardClass={styles.card}>
          <Form onSubmit={addProduct}>
            <FormGroup>
              <Label>Product name: </Label>
              <Input
                type="text"
                placeholder="Product name"
                required
                name="name"
                value={product.name}
                onChange={(e) => handleInputChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Product image: </Label>
              <Card cardClass={styles.group}>
                {uploadProgress === 0 ? null : (
                  <div className={styles.progress}>
                    <div
                      className={styles['progress__bar']}
                      style={{ width: `${uploadProgress}%` }}
                    >
                      {uploadProgress < 100
                        ? `Uploading ${uploadProgress}`
                        : `Upload Complete ${uploadProgress}`}
                    </div>
                  </div>
                )}
                <Input
                  type="file"
                  placeholder="Product image"
                  accept="image/*"
                  name="image"
                  onChange={(e) => handleImageChange(e)}
                />
                {product.imgURL === '' ? null : (
                  <Input
                    name="imgURL"
                    type="text"
                    value={product.imgURL}
                    placeholder="Image URL"
                    disabled
                  />
                )}
              </Card>
            </FormGroup>
            <FormGroup>
              <Label>Product price: </Label>
              <Input
                type="number"
                placeholder="0"
                required
                name="price"
                value={product.price}
                onChange={(e) => handleInputChange(e)}
              />
            </FormGroup>{' '}
            <FormGroup>
              <Label>Product category: </Label>
              <select
                required
                name="category"
                value={product.category}
                onChange={(e) => handleInputChange(e)}
              >
                <option value="" disabled>
                  -- choose product category --
                </option>
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  )
                })}
              </select>
            </FormGroup>{' '}
            <FormGroup>
              <Label>Product Brand: </Label>
              <Input
                type="text"
                placeholder="Product brand"
                required
                name="brand"
                value={product.brand}
                onChange={(e) => handleInputChange(e)}
              />
            </FormGroup>{' '}
            <FormGroup>
              <Label>Product description: </Label>
              <textarea
                required
                name="description"
                value={product.description}
                cols="30"
                rows="10"
                onChange={(e) => handleInputChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label>number in stock: </Label>
              <Input
                type="number"
                placeholder="0"
                required
                name="stock"
                value={product.stock}
                onChange={(e) => handleInputChange(e)}
              />
            </FormGroup>{' '}
            <FormGroup>
              <Label>Avg Rating: </Label>
              <Input
                type="number"
                placeholder="0"
                required
                name="avgRating"
                value={product.avgRating}
                onChange={(e) => handleInputChange(e)}
              />
            </FormGroup>{' '}
            <button className="--btn --btn-primary">Save Product</button>
          </Form>

          {/* <label></label>
        <input
          type="text"
          placeholder="Product name"
          required
          name="name"
          value={product.name}
          onChange={(e) => handleInputChange}
        /> */}
        </Card>
      </div>
    </>
  )
}

export default AddProducts
