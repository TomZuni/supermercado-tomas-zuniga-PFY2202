// ESTADO GLOBAL de la aplicación: el inventario y el carrito de compras.
//
// Se usa la Context API de React junto con useReducer:
//  - useReducer: concentra en una sola función (reducer) todas las formas de
//    modificar el estado (agregar artículos, mover unidades al carrito, etc.).
//  - Context: permite que CUALQUIER componente lea o modifique el estado sin
//    pasarlo por props de padre a hijo.
//
// Forma del estado:
//   {
//     articulos: [{ id, nombre, marca, tipo, precio, stock, stockMinimo }],
//     carrito:   [{ id, cantidad }]      // id = id del artículo
//   }
// "stock" es la cantidad DISPONIBLE: cada unidad que pasa al carrito se resta del
// stock y, si vuelve a salir del carrito, se suma otra vez.
import { createContext, useReducer, useEffect, useMemo } from 'react'
import { ARTICULOS_INICIALES } from '../data/articulos.js'

const CLAVE_GUARDADO = 'supermercado-articulos'

// Contexto (se consume con el hook useArticulos)
export const ArticulosContext = createContext(null)

const ESTADO_INICIAL = { articulos: ARTICULOS_INICIALES, carrito: [] }

// Mueve unidades entre el inventario y el carrito.
//   delta > 0: pasa unidades del inventario al carrito (resta stock).
//   delta < 0: devuelve unidades del carrito al inventario (suma stock).
// Si no hay unidades suficientes, no hace nada.
function moverAlCarrito(estado, id, delta) {
  const articulo = estado.articulos.find((a) => a.id === id)
  if (!articulo) return estado

  const enCarrito = estado.carrito.find((item) => item.id === id)?.cantidad ?? 0
  if (delta > 0 && articulo.stock < delta) return estado // no hay stock disponible
  if (delta < 0 && enCarrito < -delta) return estado // no hay tantas unidades en el carrito

  const cantidad = enCarrito + delta
  const articulos = estado.articulos.map((a) => (a.id === id ? { ...a, stock: a.stock - delta } : a))

  let carrito
  if (cantidad === 0) carrito = estado.carrito.filter((item) => item.id !== id)
  else if (enCarrito === 0) carrito = [...estado.carrito, { id, cantidad }]
  else carrito = estado.carrito.map((item) => (item.id === id ? { ...item, cantidad } : item))

  return { articulos, carrito }
}

// El reducer recibe el estado actual y una acción, y devuelve el estado nuevo.
function reducer(estado, accion) {
  switch (accion.tipo) {
    // ----- Inventario -----
    case 'agregar_articulo': {
      const id = estado.articulos.reduce((mayor, a) => Math.max(mayor, a.id), 0) + 1
      return { ...estado, articulos: [...estado.articulos, { ...accion.articulo, id }] }
    }
    case 'eliminar_articulo':
      return {
        articulos: estado.articulos.filter((a) => a.id !== accion.id),
        carrito: estado.carrito.filter((item) => item.id !== accion.id),
      }
    case 'cambiar_stock': // ajuste manual del inventario; el stock nunca baja de 0
      return {
        ...estado,
        articulos: estado.articulos.map((a) => (a.id === accion.id ? { ...a, stock: Math.max(0, a.stock + accion.delta) } : a)),
      }
    case 'restablecer':
      return ESTADO_INICIAL

    // ----- Carrito -----
    case 'agregar_al_carrito':
      return moverAlCarrito(estado, accion.id, 1)
    case 'cambiar_cantidad':
      return moverAlCarrito(estado, accion.id, accion.delta)
    case 'quitar_del_carrito': {
      const cantidad = estado.carrito.find((item) => item.id === accion.id)?.cantidad ?? 0
      return cantidad > 0 ? moverAlCarrito(estado, accion.id, -cantidad) : estado
    }
    case 'vaciar_carrito': // devuelve al inventario todas las unidades del carrito
      return estado.carrito.reduce((nuevo, item) => moverAlCarrito(nuevo, item.id, -item.cantidad), estado)
    case 'comprar': // la compra se concreta: el carrito queda vacío y el stock sigue descontado
      return { ...estado, carrito: [] }

    default:
      return estado
  }
}

// Lee el estado guardado en el navegador (o usa los datos iniciales).
// También acepta el formato de la semana anterior, que guardaba solo la lista de artículos.
function leerGuardado() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_GUARDADO))
    if (Array.isArray(guardado)) return { articulos: guardado, carrito: [] }
    if (guardado && Array.isArray(guardado.articulos) && Array.isArray(guardado.carrito)) return guardado
  } catch {
    /* si el almacenamiento falla, se usan los datos iniciales */
  }
  return ESTADO_INICIAL
}

export function ArticulosProvider({ children }) {
  const [estado, dispatch] = useReducer(reducer, undefined, leerGuardado)
  const { articulos, carrito } = estado

  // Cada vez que cambia el estado, se guarda en el navegador.
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_GUARDADO, JSON.stringify(estado))
    } catch {
      /* ignorar */
    }
  }, [estado])

  // Valor que se comparte con toda la aplicación: los datos y las acciones.
  const valor = useMemo(() => {
    // Carrito "completo": cada línea con los datos del artículo, cantidad y subtotal.
    const lineas = carrito
      .map((item) => {
        const articulo = articulos.find((a) => a.id === item.id)
        return articulo ? { articulo, cantidad: item.cantidad, subtotal: articulo.precio * item.cantidad } : null
      })
      .filter(Boolean)

    return {
      articulos,
      carrito: lineas,
      unidadesEnCarrito: lineas.reduce((suma, l) => suma + l.cantidad, 0),
      totalCarrito: lineas.reduce((suma, l) => suma + l.subtotal, 0),
      cantidadEnCarrito: (id) => carrito.find((item) => item.id === id)?.cantidad ?? 0,

      agregarArticulo: (articulo) => dispatch({ tipo: 'agregar_articulo', articulo }),
      eliminarArticulo: (id) => dispatch({ tipo: 'eliminar_articulo', id }),
      cambiarStock: (id, delta) => dispatch({ tipo: 'cambiar_stock', id, delta }),
      restablecer: () => dispatch({ tipo: 'restablecer' }),

      agregarAlCarrito: (id) => dispatch({ tipo: 'agregar_al_carrito', id }),
      cambiarCantidad: (id, delta) => dispatch({ tipo: 'cambiar_cantidad', id, delta }),
      quitarDelCarrito: (id) => dispatch({ tipo: 'quitar_del_carrito', id }),
      vaciarCarrito: () => dispatch({ tipo: 'vaciar_carrito' }),
      comprar: () => dispatch({ tipo: 'comprar' }),
    }
  }, [articulos, carrito])

  return <ArticulosContext.Provider value={valor}>{children}</ArticulosContext.Provider>
}
