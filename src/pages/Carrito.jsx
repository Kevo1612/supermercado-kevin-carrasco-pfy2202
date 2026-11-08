import { Link } from 'react-router-dom'
import { useInventario } from '../context/InventarioContext.jsx'
import { formatoCLP } from '../utils.js'
import LineaCarrito from '../components/LineaCarrito.jsx'

export default function Carrito() {
  const { lineasCarrito, totalUnidades, totalPagar, cambiarCantidad, quitarDelCarrito, vaciarCarrito, finalizarCompra } =
    useInventario()

  if (lineasCarrito.length === 0) {
    return (
      <section className="text-center">
        <h1 className="mb-2 text-2xl font-bold text-slate-800">Carrito de compras</h1>
        <p className="mb-4 text-slate-500">Tu carrito está vacío.</p>
        <Link to="/" className="rounded-md bg-emerald-700 px-4 py-2 font-semibold text-white hover:bg-emerald-800">
          Ir al inventario
        </Link>
      </section>
    )
  }

  return (
    <section>
      <h1 className="mb-6 text-2xl font-bold text-slate-800">Carrito de compras</h1>
      <ul className="flex flex-col gap-3">
        {lineasCarrito.map((l) => (
          <LineaCarrito key={l.id} linea={l} onCambiar={cambiarCantidad} onQuitar={quitarDelCarrito} />
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">{totalUnidades} unidad(es)</p>
          <p className="text-2xl font-bold text-slate-900">Total: {formatoCLP(totalPagar)}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={vaciarCarrito} className="rounded-md border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100">
            Vaciar carrito
          </button>
          <button onClick={finalizarCompra} className="rounded-md bg-emerald-700 px-4 py-2 font-semibold text-white hover:bg-emerald-800">
            Finalizar compra
          </button>
        </div>
      </div>
    </section>
  )
}
