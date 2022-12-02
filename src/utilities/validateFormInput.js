const validateFormInput = (event, name, value, setErrors) => {

  let validInput = false
  let errorField = ''
  let errorMessage = ''

  const clearError = (error) => {
    setErrors(prevErrors => ({...prevErrors, [error]: ''}))
  }

  switch (name) {
    case 'name':
      const nameRegex = /^[A-Za-z][A-Za-z\s'-]{2,23}$/
      validInput = nameRegex.test(value)
      errorField = 'nameError'
      errorMessage = 'Enter your name as it appears in your card'
      break

    case 'number':
      const cardNumber = value.replace(/[\s]/g, "")
      const cardList = [
        "^4[0-9]{12}(?:[0-9]{3})?$",
        "^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$",
        "^3[47][0-9]{13}$"
      ]
      const cardRegex = new RegExp(cardList.join("|"))
      validInput = cardRegex.test(cardNumber)
      errorField = 'numberError'
      errorMessage = 'Invalid card number'
      break

    case 'expiryMonth':
      const monthRegex = /[0-1][0-9]/
      validInput = monthRegex.test(value)
      errorField = 'monthError'
      errorMessage = "Wrong month format"
      break
      
    case 'expiryYear':
      const yearRegex = /[0-9]{2}/
      validInput = yearRegex.test(value)
      errorField = 'yearError'
      errorMessage = 'Wrong year format'
      break

    case 'cvc':
      const cvcRegex = /[0-9]{3,4}/
      validInput = cvcRegex.test(value)
      errorField = 'cvcError'
      errorMessage = 'Wrong CVC format'
      break
    default:
      break
  }
  
  if (validInput) {
    clearError(errorField)
  } else {
    if (value.length < 1) {
      setErrors(prevErrors => ({...prevErrors, [errorField]: "Can't be blank"}))
    } else {
      setErrors(prevErrors => ({...prevErrors, [errorField]: errorMessage}))
    }
  }
}

export default validateFormInput