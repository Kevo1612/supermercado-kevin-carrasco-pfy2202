import { Link } from 'react-router-dom'
import { formatoCLP } from '../utils.js'
import InsigniaStock from './InsigniaStock.jsx'

export default function TarjetaArticulo({ articulo }) {
  return (
    <Link
      to={`/articulo/${articulo.id}`}
      className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-emerald-500 hover:shadow-md"
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{articulo.categoria}</span>
      <h3 className="text-base font-semibold text-slate-800">{articulo.nombre}</h3>
      <p className="text-lg font-bold text-slate-900">{formatoCLP(articulo.precio)}</p>
      <InsigniaStock stock={articulo.stock} />
    </Link>
  )
}
