export default function SelectorCantidad({ cantidad, onMas, onMenos, deshabilitarMas }) {
  const btn = 'h-8 w-8 rounded-md border border-slate-300 bg-white font-bold text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40'
  return (
    <div className="flex items-center gap-2">
      <button type="button" aria-label="Disminuir cantidad" onClick={onMenos} className={btn}>−</button>
      <span className="w-8 text-center font-semibold">{cantidad}</span>
      <button type="button" aria-label="Aumentar cantidad" onClick={onMas} disabled={deshabilitarMas} className={btn}>+</button>
    </div>
  )
}
