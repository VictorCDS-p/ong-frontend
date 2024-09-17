import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import ONGList from './components/ONGList/ONGList.jsx'
import ONGForm from './components/ONGForm/ONGForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ONGList/>
    <ONGForm/>
  </StrictMode>,
)
