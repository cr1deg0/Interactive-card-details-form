import {useState} from 'react'
// import {BrowserRouter} from 'react-router-dom'
import './styles/App.css';
import CardForm from './components/CardForm'
import FrontCard from './components/FrontCard'
import BackCard from './components/BackCard'

function App() {

  const [cardForm, setCardForm] = useState({
    name: '',
    number: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: ''
  })

  const placeholder = {
    name: 'Jane Appleseed',
    number: '1234 5678 9123 0000',
    expiryMonth: 'MM',
    expiryYear: 'YY',
    cvc: '123'
  }

  return (
    <main>
      <FrontCard 
        placeholder={ placeholder } 
        cardForm = { cardForm }
      />
      <BackCard cardForm={ cardForm }/>
      <CardForm 
        placeholder={ placeholder }
        cardForm={ cardForm }
        setCardForm={ setCardForm }
      />
    </main>
 )
}

export default App;
