import React from 'react'
import './AmountButton.scss'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const AmountButton = ({ increase, decrease, amount }) => {
  return (
    <div className="quantity">
      <div className="quantity__btn" onClick={decrease}>
        <i>
          <AiOutlineMinus />
        </i>
      </div>
      <h2 className="quantity__input">{amount}</h2>
      <div className="quantity__btn" onClick={increase}>
        <i>
          <AiOutlinePlus />
        </i>
      </div>
    </div>
  )
}

export default AmountButton
