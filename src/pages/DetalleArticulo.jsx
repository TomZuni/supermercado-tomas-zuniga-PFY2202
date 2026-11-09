// Página de DETALLE de un artículo (ruta /articulos/:id).
// useParams entrega el id que viene en la dirección. Desde aquí el usuario
// puede agregar el artículo al carrito: cada clic resta 1 unidad del inventario.
import { Link, useParams } from 'react-router-dom'
import useArticulos from '../hooks/useArticulos.js'
import InsigniaEstado from '../components/InsigniaEstado.jsx'
import MensajeVacio from '../components/MensajeVacio.jsx'
import { formatoPrecio } from '../utils.js'
import { boton, botonSecundario, tarjeta } from '../estilos.js'

export default function DetalleArticulo() {
  const { id } = useParams()
  const { articulos, agregarAlCarrito, cantidadEnCarrito } = useArticulos()

  const articulo = articulos.find((a) => a.id === Number(id))

  // Renderizado condicional: si el id no corresponde a ningún artículo
  if (!articulo) {
    return (
      <MensajeVacio icono="bi-search" titulo="Artículo no encontrado" texto="Es posible que haya sido eliminado del inventario.">
        <Link to="/articulos" className={boton}>Volver a los artículos</Link>
      </MensajeVacio>
    )
  }

  const enCarrito = cantidadEnCarrito(articulo.id)
  const sinStock = articulo.stock === 0

  const datos = [
    { etiqueta: 'Marca', valor: articulo.marca },
    { etiqueta: 'Categoría', valor: articulo.tipo },
    { etiqueta: 'Precio', valor: formatoPrecio(articulo.precio) },
    { etiqueta: 'Disponibles', valor: articulo.stock },
    { etiqueta: 'Stock mínimo', valor: articulo.stockMinimo },
    { etiqueta: 'En tu carrito', valor: enCarrito },
  ]

  return (
    <section aria-labelledby="tituloDetalle" className="mx-auto max-w-3xl">
      <Link to="/articulos" className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-verde-700 hover:underline">
        <i className="bi bi-arrow-left" aria-hidden="true"></i> Volver a los artículos
      </Link>

      <div className={tarjeta}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold tracking-wide text-verde-600 uppercase">{articulo.tipo}</p>
            <h1 id="tituloDetalle" className="text-2xl font-bold">{articulo.nombre}</h1>
            <p className="text-slate-600">{articulo.marca}</p>
          </div>
          <InsigniaEstado articulo={articulo} />
        </div>

        <p className="mt-4 text-3xl font-bold text-verde-700">{formatoPrecio(articulo.precio)}</p>

        <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {datos.map((dato) => (
            <div key={dato.etiqueta} className="rounded-lg bg-slate-50 px-3 py-2">
              <dt className="text-xs text-slate-500">{dato.etiqueta}</dt>
              <dd className="font-semibold">{dato.valor}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {/* Renderizado condicional: el botón se desactiva cuando no queda stock */}
          <button type="button" className={`${boton} disabled:cursor-not-allowed disabled:bg-slate-300`} onClick={() => agregarAlCarrito(articulo.id)} disabled={sinStock}>
            <i className="bi bi-cart-plus" aria-hidden="true"></i> {sinStock ? 'Sin stock disponible' : 'Agregar al carrito'}
          </button>
          {enCarrito > 0 && (
            <Link to="/carrito" className={botonSecundario}>
              <i className="bi bi-cart3" aria-hidden="true"></i> Ir al carrito ({enCarrito})
            </Link>
          )}
        </div>

        <p className="mt-3 text-sm text-slate-500" aria-live="polite">
          {sinStock
            ? 'No quedan unidades disponibles de este artículo.'
            : `Quedan ${articulo.stock} unidades disponibles en el inventario.`}
        </p>
      </div>
    </section>
  )
}
