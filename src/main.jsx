import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProvider } from './Context/Firebase.jsx'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AppProvider>
    <App />
    </AppProvider>
    </BrowserRouter>
  </StrictMode>,
)
