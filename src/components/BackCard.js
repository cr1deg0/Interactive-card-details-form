import React from 'react'
import '../styles/BackCard.css'

const BackCard = ({ placeholder, cardForm }) => {
  return (
    <div className='card-back'>
      <p>
        { cardForm.cvc !== '' ? cardForm.cvc : '000' }
      </p>
    </div>
  )
}

export default BackCard