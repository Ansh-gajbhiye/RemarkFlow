import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FormInput from './Components/FormInput'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FormInput />
  </StrictMode>,
)
