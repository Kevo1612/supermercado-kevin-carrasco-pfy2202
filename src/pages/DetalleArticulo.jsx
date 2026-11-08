import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useInventario } from '../context/InventarioContext.jsx'
import { formatoCLP } from '../utils.js'
import InsigniaStock from '../components/InsigniaStock.jsx'
import SelectorCantidad from '../components/SelectorCantidad.jsx'

export default function DetalleArticulo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { inventario, cambiarCantidad } = useInventario()
  const [cantidad, setCantidad] = useState(1)
  const [mensaje, setMensaje] = useState('')

  const articulo = inventario.find((a) => a.id === Number(id))

  if (!articulo) {
    return (
      <div className="text-center">
        <p className="mb-4 text-slate-600">El artículo no existe.</p>
        <Link to="/" className="text-emerald-700 underline">Volver al inventario</Link>
      </div>
    )
  }

  // Si el stock bajó (por ejemplo, desde el carrito), la cantidad elegida no puede superarlo
  const cantidadValida = Math.min(cantidad, Math.max(articulo.stock, 1))

  const agregar = () => {
    cambiarCantidad(articulo.id, cantidadValida)
    setMensaje(`Se agregaron ${cantidadValida} unidad(es) al carrito.`)
    setCantidad(1)
  }

  return (
    <section className="mx-auto max-w-2xl">
      <button onClick={() => navigate(-1)} className="mb-4 text-sm text-emerald-700 hover:underline">
        ← Volver
      </button>

      <article className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{articulo.categoria}</span>
        <h1 className="text-2xl font-bold text-slate-800">{articulo.nombre}</h1>
        <p className="text-slate-600">{articulo.descripcion}</p>
        <p className="text-3xl font-bold text-slate-900">{formatoCLP(articulo.precio)}</p>
        <InsigniaStock stock={articulo.stock} />

        {articulo.stock > 0 ? (
          <div className="flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4">
            <SelectorCantidad
              cantidad={cantidadValida}
              onMas={() => setCantidad(Math.min(cantidadValida + 1, articulo.stock))}
              onMenos={() => setCantidad(Math.max(cantidadValida - 1, 1))}
              deshabilitarMas={cantidadValida >= articulo.stock}
            />
            <button onClick={agregar} className="rounded-md bg-emerald-700 px-4 py-2 font-semibold text-white hover:bg-emerald-800">
              Agregar al carrito
            </button>
          </div>
        ) : (
          <p className="border-t border-slate-100 pt-4 font-medium text-red-600">Este artículo no tiene stock disponible.</p>
        )}

        {mensaje && (
          <p role="status" className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            {mensaje} <Link to="/carrito" className="font-semibold underline">Ver carrito</Link>
          </p>
        )}
      </article>
    </section>
  )
}
