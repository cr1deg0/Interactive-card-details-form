import '../styles/CardForm.css'
import React, {useState, useEffect} from 'react'
import validateFormInput from '../utilities/validateFormInput'

const CardForm = ({ placeholder, cardForm, setCardForm}) => {

  const [errors, setErrors] = useState({
    nameError: '',
    numberError: '',
    monthError: '',
    yearError: '',
    cvcError: ''
  })

  const [validForm, setvalidForm] = useState(false)

  const handleInput = (event) => {
    validateFormInput(event, event.target.name, event.target.value, setErrors)
    setCardForm(prevState => {
      if (event.target.name === 'number') {
        const inputNumberLength = event.target.value.length
        if (inputNumberLength === 4 || inputNumberLength === 9 || inputNumberLength === 14) {
          const splitValue = event.target.value + ' '
          return {...prevState, [event.target.name]: splitValue}
        }
      }
      return {...prevState, [event.target.name]: event.target.value}
    })
  }

  useEffect(() => {
    if (Object.values(cardForm).every(item => item !== '') && Object.values(errors).every(item => item === '')) {
      setvalidForm(true)
    } else {
      setvalidForm(false)
    }
  }, [errors, cardForm ])

  return (
    <form className='card-form uppercase'>
      <label htmlFor='card-name'>Cardholder name</label>
      <div className={ errors.nameError ? 'input-wrap input-wrap-error' : 'input-wrap input-wrap-no-error' }>
        <input
          type='text'
          id='card-name'
          placeholder={ `e.g. ${ placeholder.name }` }
          name='name'
          value={ cardForm.name }
          onChange={ handleInput }
        ></input>
      </div>
      <span className='form-error'>{ errors.nameError }</span>
      <label htmlFor='card-number'>Card number</label>
      <div className={ errors.numberError ? 'input-wrap input-wrap-error' : 'input-wrap input-wrap-no-error' }>
        <input
          type='text'
          id='card-number'
          placeholder={ `e.g. ${ placeholder.number }` }
          name='number'
          value={ cardForm.number }
          onChange={ handleInput }
        ></input>
      </div>
      <span className='form-error'>{ errors.numberError }</span>
      <div className='container'>
        <fieldset>
          <legend>Exp. date (MM/YY)</legend>
          <label htmlFor='card-expire-month' className='sr-only'>Expiry month</label>
          <div className='flex-column'>
            <div className={ errors.monthError ? 'input-wrap input-wrap-error' : 'input-wrap input-wrap-no-error' }>
              <input
                type='text'
                maxLength='2'
                id='card-expire-month'
                placeholder={ placeholder.expiryMonth }
                name='expiryMonth'
                value={ cardForm.expiryMonth }
                onChange={ handleInput }
              ></input>
            </div>
            <span className='form-error'>{errors.monthError}</span>
          </div>
          <label htmlFor='card-expire-year' className='sr-only'>Expiry year</label>
          <div className='flex-column'>
            <div className={ errors.yearError ? 'input-wrap input-wrap-error' : 'input-wrap input-wrap-no-error' }>
              <input
                type='text'
                maxLength='2'
                id='card-expire-year'
                placeholder={ placeholder.expiryYear }
                name='expiryYear'
                value={ cardForm.expiryYear }
                onChange={ handleInput }
              ></input>
            </div>
            <span className='form-error'>{ errors.yearError }</span>
          </div>
        </fieldset>
        <div>
          <label htmlFor='card-cvc'>CVC</label>
          <div className={ errors.nameError ? 'input-wrap input-wrap-error' : 'input-wrap input-wrap-no-error' }>
            <input
              type='text'
              minLength='3'
              maxLength='4'
              id='card-cvc'
              placeholder={ `e.g. ${ placeholder.cvc }` }
              name='cvc'
              value={ cardForm.cvc }
              onChange={ handleInput }
            ></input>
          </div>
          <span className='form-error'>{ errors.cvcError }</span>
        </div>
      </div>
      <button type='submit' disabled={!validForm}>Confirm</button>
    </form>
  )
}

export default CardForm