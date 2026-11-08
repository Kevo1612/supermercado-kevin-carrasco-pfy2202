export default function FiltroCategoria({ categorias, seleccionada, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <label htmlFor="categoria" className="text-sm font-medium text-slate-700">Categoría:</label>
      <select
        id="categoria"
        value={seleccionada}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
      >
        <option value="Todas">Todas</option>
        {categorias.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  )
}
