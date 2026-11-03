// ESTADO GLOBAL de la aplicación: la lista de artículos del inventario.
//
// Se usa la Context API de React junto con useReducer:
//  - useReducer: concentra en una sola función (reducer) todas las formas de
//    modificar la lista (agregar, eliminar, cambiar stock, restablecer).
//  - Context: permite que CUALQUIER componente lea o modifique la lista sin
//    tener que pasarla por props de padre a hijo.
// Así, el artículo que se agrega en una página aparece en las demás.
import { createContext, useReducer, useEffect, useMemo } from 'react'
import { ARTICULOS_INICIALES } from '../data/articulos.js'

const CLAVE_GUARDADO = 'supermercado-articulos'

// Contexto (se consume con el hook useArticulos)
export const ArticulosContext = createContext(null)

// El reducer recibe el estado actual y una acción, y devuelve el estado nuevo.
function reducer(articulos, accion) {
  switch (accion.tipo) {
    case 'agregar': {
      const id = articulos.reduce((mayor, a) => Math.max(mayor, a.id), 0) + 1
      return [...articulos, { ...accion.articulo, id }]
    }
    case 'eliminar':
      return articulos.filter((a) => a.id !== accion.id)
    case 'cambiar_stock': // delta = +1 o -1; el stock nunca baja de 0
      return articulos.map((a) => (a.id === accion.id ? { ...a, stock: Math.max(0, a.stock + accion.delta) } : a))
    case 'restablecer':
      return ARTICULOS_INICIALES
    default:
      return articulos
  }
}

// Lee el inventario guardado en el navegador (o usa los datos iniciales).
function leerGuardado() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_GUARDADO))
    if (Array.isArray(guardado)) return guardado
  } catch {
    /* si el almacenamiento falla, se usan los datos iniciales */
  }
  return ARTICULOS_INICIALES
}

export function ArticulosProvider({ children }) {
  const [articulos, dispatch] = useReducer(reducer, undefined, leerGuardado)

  // Cada vez que cambia la lista, se guarda en el navegador.
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_GUARDADO, JSON.stringify(articulos))
    } catch {
      /* ignorar */
    }
  }, [articulos])

  // Valor que se comparte con toda la aplicación: los datos y las acciones.
  const valor = useMemo(
    () => ({
      articulos,
      agregarArticulo: (articulo) => dispatch({ tipo: 'agregar', articulo }),
      eliminarArticulo: (id) => dispatch({ tipo: 'eliminar', id }),
      cambiarStock: (id, delta) => dispatch({ tipo: 'cambiar_stock', id, delta }),
      restablecer: () => dispatch({ tipo: 'restablecer' }),
    }),
    [articulos],
  )

  return <ArticulosContext.Provider value={valor}>{children}</ArticulosContext.Provider>
}
