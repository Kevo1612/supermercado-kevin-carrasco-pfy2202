import { formatoCLP } from '../utils.js'
import SelectorCantidad from './SelectorCantidad.jsx'

export default function LineaCarrito({ linea, onCambiar, onQuitar }) {
  return (
    <li className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="font-semibold text-slate-800">{linea.nombre}</h3>
        <p className="text-sm text-slate-500">{linea.categoria} · {formatoCLP(linea.precio)} c/u</p>
        <p className="text-xs text-slate-400">Disponibles en inventario: {linea.stockDisponible}</p>
      </div>
      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <SelectorCantidad
          cantidad={linea.cantidad}
          onMas={() => onCambiar(linea.id, 1)}
          onMenos={() => onCambiar(linea.id, -1)}
          deshabilitarMas={linea.stockDisponible === 0}
        />
        <span className="w-24 text-right font-bold">{formatoCLP(linea.precio * linea.cantidad)}</span>
        <button type="button" onClick={() => onQuitar(linea.id)} className="text-sm text-red-600 hover:underline">
          Quitar
        </button>
      </div>
    </li>
  )
}
