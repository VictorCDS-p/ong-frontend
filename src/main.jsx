import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import ONGList from './pages/ONGList/index.jsx'
import ONGForm from './pages/ONGForm/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ONGList/>
    <ONGForm/>
  </StrictMode>,
)
