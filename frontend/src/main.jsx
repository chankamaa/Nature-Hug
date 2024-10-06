import { StrictMode } from 'react'
import react from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './context/StoreContext.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
/>

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StoreContextProvider>
   <App />
  </StoreContextProvider>
  </BrowserRouter>
   
)
