import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInventario } from '../context/InventarioContext.jsx'
import { CATEGORIAS } from '../data/inventarioInicial.js'
import CampoFormulario from '../components/CampoFormulario.jsx'

const vacio = { nombre: '', categoria: CATEGORIAS[0], precio: '', stock: '', descripcion: '' }
const input = 'rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600'

function validar(f) {
  const e = {}
  if (!f.nombre.trim()) e.nombre = 'El nombre es obligatorio.'
  if (f.precio === '' || Number(f.precio) <= 0) e.precio = 'Ingresa un precio mayor a 0.'
  if (f.stock === '' || !Number.isInteger(Number(f.stock)) || Number(f.stock) < 0) e.stock = 'Ingresa un stock entero (0 o más).'
  return e
}

export default function AgregarArticulo() {
  const { agregarArticulo } = useInventario()
  const navigate = useNavigate()
  const [form, setForm] = useState(vacio)
  const [errores, setErrores] = useState({})

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const enviar = (e) => {
    e.preventDefault()
    const errs = validar(form)
    setErrores(errs)
    if (Object.keys(errs).length > 0) return
    agregarArticulo({
      nombre: form.nombre.trim(),
      categoria: form.categoria,
      precio: Number(form.precio),
      stock: Number(form.stock),
      descripcion: form.descripcion.trim() || 'Sin descripción.',
    })
    navigate('/')
  }

  return (
    <section className="mx-auto max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-slate-800">Agregar artículo al inventario</h1>
      <form onSubmit={enviar} noValidate className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <CampoFormulario id="nombre" etiqueta="Nombre" error={errores.nombre}>
          <input id="nombre" name="nombre" value={form.nombre} onChange={cambiar} className={input} />
        </CampoFormulario>

        <CampoFormulario id="categoria" etiqueta="Categoría">
          <select id="categoria" name="categoria" value={form.categoria} onChange={cambiar} className={input}>
            {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </CampoFormulario>

        <div className="grid gap-4 sm:grid-cols-2">
          <CampoFormulario id="precio" etiqueta="Precio (CLP)" error={errores.precio}>
            <input id="precio" name="precio" type="number" min="1" value={form.precio} onChange={cambiar} className={input} />
          </CampoFormulario>
          <CampoFormulario id="stock" etiqueta="Cantidad en stock" error={errores.stock}>
            <input id="stock" name="stock" type="number" min="0" value={form.stock} onChange={cambiar} className={input} />
          </CampoFormulario>
        </div>

        <CampoFormulario id="descripcion" etiqueta="Descripción (opcional)">
          <textarea id="descripcion" name="descripcion" rows="3" value={form.descripcion} onChange={cambiar} className={input} />
        </CampoFormulario>

        <button type="submit" className="rounded-md bg-emerald-700 px-4 py-2 font-semibold text-white hover:bg-emerald-800">
          Guardar artículo
        </button>
      </form>
    </section>
  )
}
