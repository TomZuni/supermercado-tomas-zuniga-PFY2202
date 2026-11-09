// Tabla con los artículos. No guarda datos propios: todo llega por props.
// Props: articulos (los que se van a mostrar), onCambiarStock(id, delta) y onEliminar(id).
// El nombre de cada artículo es un enlace a su página de detalle (/articulos/:id).
import { Link } from 'react-router-dom'
import { formatoPrecio } from '../utils.js'
import InsigniaEstado from './InsigniaEstado.jsx'
import ControlCantidad from './ControlCantidad.jsx'

export default function TablaArticulos({ articulos, onCambiarStock, onEliminar }) {
  // Renderizado condicional: mensaje cuando no hay artículos que mostrar
  if (articulos.length === 0) {
    return (
      <p className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-amber-800">
        No hay artículos que coincidan con la búsqueda.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 text-slate-600">
          <tr>
            <th className="px-1.5 py-3 font-semibold sm:px-2">Nombre</th>
            <th className="hidden px-2 py-3 font-semibold md:table-cell">Marca</th>
            <th className="hidden px-2 py-3 font-semibold md:table-cell">Categoría</th>
            <th className="px-1.5 py-3 text-right font-semibold sm:px-2">Precio</th>
            <th className="px-1.5 py-3 text-center font-semibold sm:px-2">Disponibles</th>
            <th className="hidden px-2 py-3 font-semibold md:table-cell">Estado</th>
            <th className="px-1.5 py-3 text-right font-semibold sm:px-2"><span className="sr-only">Eliminar</span></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {articulos.map((articulo) => (
            <tr key={articulo.id} className="hover:bg-slate-50">
              <td className="px-1.5 py-3 sm:px-2">
                <Link to={`/articulos/${articulo.id}`} className="font-semibold text-verde-700 underline-offset-2 hover:underline">
                  {articulo.nombre}
                </Link>
                {/* En pantallas pequeñas la marca, la categoría y el estado van bajo el nombre para que la tabla quepa */}
                <div className="text-xs text-slate-500 md:hidden">{articulo.marca} · {articulo.tipo}</div>
                <InsigniaEstado articulo={articulo} className="mt-1 md:hidden" />
              </td>
              <td className="hidden px-2 py-3 md:table-cell">{articulo.marca}</td>
              <td className="hidden px-2 py-3 md:table-cell">{articulo.tipo}</td>
              <td className="px-1.5 py-3 text-right whitespace-nowrap sm:px-2">{formatoPrecio(articulo.precio)}</td>
              <td className="px-1.5 py-3 sm:px-2">
                <ControlCantidad
                  valor={articulo.stock}
                  etiqueta={`Stock de ${articulo.nombre}`}
                  onRestar={() => onCambiarStock(articulo.id, -1)}
                  onSumar={() => onCambiarStock(articulo.id, 1)}
                />
              </td>
              <td className="hidden px-2 py-3 md:table-cell"><InsigniaEstado articulo={articulo} /></td>
              <td className="px-1.5 py-3 text-right sm:px-2">
                <button type="button" className="rounded-lg border border-red-300 px-2 py-1.5 text-red-600 hover:bg-red-50 sm:px-2.5" onClick={() => onEliminar(articulo.id)} aria-label={`Eliminar ${articulo.nombre}`}>
                  <i className="bi bi-trash3" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
