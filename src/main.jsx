// Punto de entrada de la aplicación.
// HashRouter activa React Router en toda la app. Se usa HashRouter (rutas con "#")
// para que al recargar una página interna GitHub Pages no entregue error 404.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css' // solo los íconos
import './styles/app.css' // Tailwind CSS
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
