import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GuitarApp from './GuitarApp.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter habilita React Router para navegar entre paginas web */}
    <BrowserRouter>
      <GuitarApp />
    </BrowserRouter>
  </StrictMode>,
)
