import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { Switch, Route } from 'react-router-dom'

import './styles/App.css';

import CardForm from './components/CardForm'
import FrontCard from './components/FrontCard'
import BackCard from './components/BackCard'
import ThankYou from './components/ThankYou'

function App() {

  const [cardForm, setCardForm] = useState({
    name: '',
    number: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: ''
  })

  const [sentForm, setSentForm] = useState(false)

  const placeholder = {
    name: 'Jane Appleseed',
    number: '1234 5678 9123 0000',
    expiryMonth: 'MM',
    expiryYear: 'YY',
    cvc: '123'
  }

  const sendFormData = (data) => {
    //API call
    setTimeout(() => {
      console.log('data sent: ', data)
    }, 500);
    setSentForm(true);
  } 

  const router = createBrowserRouter([
    {
      path: '/',
      element: <CardForm 
        placeholder={ placeholder }
        cardForm={ cardForm }
        setCardForm={ setCardForm }
        sentForm={ sentForm }
        sendFormData= { sendFormData }
        />
    },
    {
      path: 'thankyou',
      element: <ThankYou 
        setSentForm= { setSentForm }
        setCardForm= { setCardForm }
      />
    }
  ])

  return (
    <main>
      <FrontCard 
        placeholder={ placeholder } 
        cardForm = { cardForm }
      />
      <BackCard cardForm={ cardForm }/>
      <RouterProvider router={ router }/>
    </main>
 )
}

export default App;
