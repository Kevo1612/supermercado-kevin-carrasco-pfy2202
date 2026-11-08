import { createContext, useContext, useMemo, useReducer } from 'react'
import { inventarioInicial } from '../data/inventarioInicial.js'

/*
 * Estado global:
 *  - inventario: [{ id, nombre, categoria, precio, stock, descripcion }]
 *  - carrito:    [{ id, cantidad }]   (solo guarda id y cantidad; el resto se obtiene del inventario)
 *
 * Regla de negocio: stock del inventario + cantidad en carrito = stock total del artículo.
 * Al agregar al carrito se resta del stock; al quitar o disminuir se devuelve.
 */
const InventarioContext = createContext(null)

const estadoInicial = { inventario: inventarioInicial, carrito: [] }

function reducer(state, action) {
  switch (action.type) {
    case 'AGREGAR_ARTICULO': {
      const nuevoId = state.inventario.reduce((max, a) => Math.max(max, a.id), 0) + 1
      return { ...state, inventario: [...state.inventario, { ...action.articulo, id: nuevoId }] }
    }

    case 'CAMBIAR_CANTIDAD': {
      // delta puede ser positivo (agregar) o negativo (quitar)
      const { id, delta } = action
      const articulo = state.inventario.find((a) => a.id === id)
      if (!articulo) return state

      const linea = state.carrito.find((l) => l.id === id)
      const cantidadActual = linea ? linea.cantidad : 0

      // Limita el delta: no puede superar el stock disponible ni bajar de 0 en el carrito
      const deltaReal = Math.max(-cantidadActual, Math.min(delta, articulo.stock))
      if (deltaReal === 0) return state

      const nuevaCantidad = cantidadActual + deltaReal
      const inventario = state.inventario.map((a) =>
        a.id === id ? { ...a, stock: a.stock - deltaReal } : a
      )
      let carrito
      if (nuevaCantidad === 0) carrito = state.carrito.filter((l) => l.id !== id)
      else if (linea) carrito = state.carrito.map((l) => (l.id === id ? { ...l, cantidad: nuevaCantidad } : l))
      else carrito = [...state.carrito, { id, cantidad: nuevaCantidad }]

      return { inventario, carrito }
    }

    case 'QUITAR_DEL_CARRITO': {
      const linea = state.carrito.find((l) => l.id === action.id)
      if (!linea) return state
      return {
        inventario: state.inventario.map((a) =>
          a.id === action.id ? { ...a, stock: a.stock + linea.cantidad } : a
        ),
        carrito: state.carrito.filter((l) => l.id !== action.id),
      }
    }

    case 'VACIAR_CARRITO': {
      const inventario = state.inventario.map((a) => {
        const linea = state.carrito.find((l) => l.id === a.id)
        return linea ? { ...a, stock: a.stock + linea.cantidad } : a
      })
      return { inventario, carrito: [] }
    }

    case 'FINALIZAR_COMPRA':
      // La compra se concreta: el stock ya fue descontado, solo se limpia el carrito
      return { ...state, carrito: [] }

    default:
      return state
  }
}

export function InventarioProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, estadoInicial)

  const value = useMemo(() => {
    const lineasCarrito = state.carrito
      .map((l) => {
        const articulo = state.inventario.find((a) => a.id === l.id)
        return articulo ? { ...articulo, cantidad: l.cantidad, stockDisponible: articulo.stock } : null
      })
      .filter(Boolean)

    return {
      inventario: state.inventario,
      lineasCarrito,
      totalUnidades: lineasCarrito.reduce((s, l) => s + l.cantidad, 0),
      totalPagar: lineasCarrito.reduce((s, l) => s + l.cantidad * l.precio, 0),
      agregarArticulo: (articulo) => dispatch({ type: 'AGREGAR_ARTICULO', articulo }),
      cambiarCantidad: (id, delta) => dispatch({ type: 'CAMBIAR_CANTIDAD', id, delta }),
      quitarDelCarrito: (id) => dispatch({ type: 'QUITAR_DEL_CARRITO', id }),
      vaciarCarrito: () => dispatch({ type: 'VACIAR_CARRITO' }),
      finalizarCompra: () => dispatch({ type: 'FINALIZAR_COMPRA' }),
    }
  }, [state])

  return <InventarioContext.Provider value={value}>{children}</InventarioContext.Provider>
}

export function useInventario() {
  const ctx = useContext(InventarioContext)
  if (!ctx) throw new Error('useInventario debe usarse dentro de <InventarioProvider>')
  return ctx
}
