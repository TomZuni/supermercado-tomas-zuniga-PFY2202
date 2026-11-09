// Página del CARRITO de compras (ruta /carrito).
// Lista los artículos agregados y permite aumentar o disminuir su cantidad.
// Cada cambio actualiza el inventario general (el stock disponible) porque
// todo vive en el estado global.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useArticulos from '../hooks/useArticulos.js'
import ControlCantidad from '../components/ControlCantidad.jsx'
import MensajeVacio from '../components/MensajeVacio.jsx'
import { formatoPrecio } from '../utils.js'
import { boton, botonSecundario, tarjeta } from '../estilos.js'

export default function Carrito() {
  const { carrito, unidadesEnCarrito, totalCarrito, cambiarCantidad, quitarDelCarrito, vaciarCarrito, comprar } = useArticulos()
  const [compra, setCompra] = useState(null) // datos de la última compra realizada

  const finalizarCompra = () => {
    setCompra({ unidades: unidadesEnCarrito, total: totalCarrito })
    comprar()
  }

  // Renderizado condicional: compra realizada, carrito vacío o carrito con artículos
  if (carrito.length === 0) {
    return compra ? (
      <MensajeVacio icono="bi-bag-check-fill" colorIcono="text-verde-600" titulo="¡Compra realizada!" texto={`Compraste ${compra.unidades} unidades por ${formatoPrecio(compra.total)}. El inventario quedó actualizado.`}>
        <Link to="/articulos" className={boton}>Seguir comprando</Link>
      </MensajeVacio>
    ) : (
      <MensajeVacio icono="bi-cart-x" titulo="Tu carrito está vacío" texto="Entra al detalle de un artículo y agrégalo al carrito.">
        <Link to="/articulos" className={boton}>Ver artículos</Link>
      </MensajeVacio>
    )
  }

  return (
    <section aria-labelledby="tituloCarrito">
      <h1 id="tituloCarrito" className="text-2xl font-bold">Carrito de compras</h1>
      <p className="mt-1 mb-6 text-slate-600">Ajusta las cantidades: el inventario se actualiza con cada cambio.</p>

      <div className="grid gap-4 lg:grid-cols-3">
        <ul className="space-y-3 lg:col-span-2">
          {carrito.map(({ articulo, cantidad, subtotal }) => (
            <li key={articulo.id} className={`${tarjeta} !p-4`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Link to={`/articulos/${articulo.id}`} className="font-semibold text-verde-700 hover:underline">{articulo.nombre}</Link>
                  <p className="text-sm text-slate-500">{articulo.marca} · {articulo.tipo}</p>
                  <p className="text-sm text-slate-500">{formatoPrecio(articulo.precio)} c/u</p>
                </div>
                <button type="button" className="rounded-lg border border-red-300 px-2.5 py-1.5 text-red-600 hover:bg-red-50" onClick={() => quitarDelCarrito(articulo.id)} aria-label={`Quitar ${articulo.nombre} del carrito`}>
                  <i className="bi bi-trash3" aria-hidden="true"></i>
                </button>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <div className="text-center">
                  <ControlCantidad
                    valor={cantidad}
                    etiqueta={`Cantidad de ${articulo.nombre}`}
                    onRestar={() => cambiarCantidad(articulo.id, -1)}
                    onSumar={() => cambiarCantidad(articulo.id, 1)}
                    sumarDeshabilitado={articulo.stock === 0}
                  />
                  {/* Muestra cómo cambia el inventario con cada ajuste */}
                  <p className="mt-1 text-xs text-slate-500">Quedan {articulo.stock} disponibles</p>
                </div>
                <p className="text-lg font-bold">{formatoPrecio(subtotal)}</p>
              </div>
            </li>
          ))}
        </ul>

        <aside className={`${tarjeta} h-fit lg:sticky lg:top-24`} aria-label="Resumen de la compra">
          <h2 className="mb-3 text-lg font-semibold">Resumen</h2>
          <dl className="space-y-2">
            <div className="flex justify-between"><dt className="text-slate-600">Artículos distintos</dt><dd className="font-semibold">{carrito.length}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-600">Unidades</dt><dd className="font-semibold">{unidadesEnCarrito}</dd></div>
            <div className="flex justify-between border-t border-slate-200 pt-2 text-lg"><dt className="font-semibold">Total</dt><dd className="font-bold text-verde-700">{formatoPrecio(totalCarrito)}</dd></div>
          </dl>
          <div className="mt-5 flex flex-col gap-2">
            <button type="button" className={boton} onClick={finalizarCompra}>
              <i className="bi bi-bag-check" aria-hidden="true"></i> Finalizar compra
            </button>
            <button type="button" className={botonSecundario} onClick={vaciarCarrito}>
              <i className="bi bi-x-circle" aria-hidden="true"></i> Vaciar carrito
            </button>
          </div>
        </aside>
      </div>
    </section>
  )
}
