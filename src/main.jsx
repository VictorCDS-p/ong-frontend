import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// import ONGList from './components/ONGList/index.jsx'
// import ONGForm from './components/ONGForm/index.jsx'
import Home from './pages/home'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ONGList />
    <ONGForm /> */}
    <Home />
  </StrictMode>,
)
