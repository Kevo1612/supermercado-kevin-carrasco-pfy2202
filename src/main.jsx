import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { InventarioProvider } from './context/InventarioContext.jsx'
import './index.css'

// HashRouter: evita errores 404 al recargar en GitHub Pages
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <InventarioProvider>
        <App />
      </InventarioProvider>
    </HashRouter>
  </React.StrictMode>
)
