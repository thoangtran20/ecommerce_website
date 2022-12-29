import React from 'react'
import './NotFound.scss'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="not__found">
      <h2>404</h2>
      <p>Sory, the page you want to watch is not exist</p>
      <button>
        <Link to="/">&larr; Back to home</Link>
      </button>
    </div>
  )
}

export default NotFound
