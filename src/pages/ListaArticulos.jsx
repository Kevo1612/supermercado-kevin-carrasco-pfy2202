import { useMemo, useState } from 'react'
import { useInventario } from '../context/InventarioContext.jsx'
import { CATEGORIAS } from '../data/inventarioInicial.js'
import FiltroCategoria from '../components/FiltroCategoria.jsx'
import TarjetaArticulo from '../components/TarjetaArticulo.jsx'

export default function ListaArticulos() {
  const { inventario } = useInventario()
  // Solo se guarda la categoría elegida; la lista filtrada se DERIVA del inventario,
  // por lo que el inventario original nunca se modifica ni se pierde.
  const [categoria, setCategoria] = useState('Todas')

  const articulosFiltrados = useMemo(
    () => (categoria === 'Todas' ? inventario : inventario.filter((a) => a.categoria === categoria)),
    [inventario, categoria]
  )

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Inventario</h1>
          <p className="text-sm text-slate-500">
            Mostrando {articulosFiltrados.length} de {inventario.length} artículos
          </p>
        </div>
        <FiltroCategoria categorias={CATEGORIAS} seleccionada={categoria} onChange={setCategoria} />
      </div>

      {articulosFiltrados.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
          No hay artículos en esta categoría.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articulosFiltrados.map((a) => (
            <TarjetaArticulo key={a.id} articulo={a} />
          ))}
        </div>
      )}
    </section>
  )
}
