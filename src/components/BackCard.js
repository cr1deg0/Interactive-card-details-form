import React from 'react'
import '../styles/BackCard.css'

const BackCard = ({ cardForm }) => {
  return (
    <div aria-hidden = 'true' className='card card-back'>
      <p data-testid='card-cvc'>
        { cardForm.cvc !== '' ? cardForm.cvc : '000' }
      </p>
    </div>
  )
}

export default BackCard