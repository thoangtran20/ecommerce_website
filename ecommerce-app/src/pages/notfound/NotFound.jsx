import React from 'react'
import './NotFound.scss'
import { Link } from 'react-router-dom'
import { Button, Result } from 'antd'

const NotFound = () => {
  return (
    <>
      <div className="not__found">
        <h2>404</h2>
        <p>Sory, the page you want to watch is not exist</p>
        <button>
          <Link to="/">&larr; Back to home</Link>
        </button>
      </div>
      {/* <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary">Back Home</Button>}
      /> */}
    </>
  )
}

export default NotFound
