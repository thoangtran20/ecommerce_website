import Card from '../../card/Card'
import React, { useState } from 'react'
import styles from './AddProducts.module.scss'
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage'

import { Form, FormGroup, Input, Label } from 'reactstrap'

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
  const [product, setProduct] = useState({
    name: '',
    imgURL: '',
    price: '',
    category: '',
    brand: '',
    description: '',
    stock: '',
    avgRating: '',
  })

  const addProduct = (e) => {
    e.preventDefault()
    console.log(product)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    // console.log(file)
    const storageRef = ref(storage, `ClothingStore/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
  }

  return (
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
              <div className={styles.progress}>
                <div
                  className={styles['progress__bar']}
                  style={{ width: '50%' }}
                >
                  Uploading 50%
                </div>
                <Input
                  type="file"
                  placeholder="Product image"
                  accept="image/*"
                  name="image"
                  onChange={(e) => handleImageChange(e)}
                />

                <Input
                  name="imgURL"
                  value={product.imgURL}
                  placeholder="Image URL"
                  disabled
                />
              </div>
            </Card>
          </FormGroup>
          <FormGroup>
            <Label>Product price: </Label>
            <Input
              type="number"
              placeholder="Product price"
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
              placeholder="Number in stock"
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
              placeholder="Average Rating"
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
  )
}

export default AddProducts
