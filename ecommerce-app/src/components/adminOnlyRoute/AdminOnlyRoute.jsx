import { Button, Result } from 'antd'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { selectEmail } from '../../stores/slice/authSlice'

const AdminOnlyRoute = ({ children }) => {
  // const auth = getAuth()
  // const [email, setEmail] = useState(null)
  // console.log("hello")
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const userEmail = user.email
  //     console.log(userEmail)
  //     setEmail(userEmail)
  //   } else {
  //     setEmail('')
  //   }
  // })

  const userEmail = useSelector(selectEmail)
  console.log(userEmail)

  if (userEmail === 'admin@gmail.com') {
    return children
  }

  return (
    <section style={{ height: '80vh' }}>
      <div className="container">
        <h2>Permission Denied</h2>
        <p>This page can only be view by an Admin user.</p>
        <br />
        <Link to="/">
          <button className="--btn">&larr; Back To Home</button>
        </Link>
      </div>
    </section>
  )
}

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail)
  console.log(userEmail)

  // const auth = getAuth()
  // const [email, setEmail] = useState(null)
  // console.log(email)
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const userEmail = user.email
  //     console.log(userEmail)
  //     setEmail(userEmail)
  //   } else {
  //     setEmail('')
  //   }
  // })

  if (userEmail === 'admin@gmail.com') {
    return children
  }
  return null
}

export default AdminOnlyRoute
