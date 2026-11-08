import { NavLink } from 'react-router-dom'
import { useInventario } from '../context/InventarioContext.jsx'

const base = 'rounded-md px-3 py-2 text-sm font-medium transition'
const clase = ({ isActive }) =>
  `${base} ${isActive ? 'bg-emerald-800 text-white' : 'text-emerald-50 hover:bg-emerald-600'}`

export default function Navbar() {
  const { totalUnidades } = useInventario()
  return (
    <header className="bg-emerald-700 shadow">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <span className="text-lg font-bold text-white">🛒 Supermercado</span>
        <div className="flex flex-wrap gap-1">
          <NavLink to="/" end className={clase}>Inventario</NavLink>
          <NavLink to="/agregar" className={clase}>Agregar artículo</NavLink>
          <NavLink to="/carrito" className={clase}>
            Carrito
            <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs font-bold text-emerald-700">
              {totalUnidades}
            </span>
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
