import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import ListaArticulos from './pages/ListaArticulos.jsx'
import AgregarArticulo from './pages/AgregarArticulo.jsx'
import DetalleArticulo from './pages/DetalleArticulo.jsx'
import Carrito from './pages/Carrito.jsx'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<ListaArticulos />} />
          <Route path="/agregar" element={<AgregarArticulo />} />
          <Route path="/articulo/:id" element={<DetalleArticulo />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="*" element={<p className="text-center text-slate-500">Página no encontrada.</p>} />
        </Routes>
      </main>
    </div>
  )
}
