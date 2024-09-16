import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import ONGList from './components/ongList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ONGList/>
  </StrictMode>,
)
