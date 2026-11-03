// Tabla con los artículos. No guarda datos propios: todo llega por props.
// Props: articulos (los que se van a mostrar), onCambiarStock(id, delta) y onEliminar(id).
import { formatoPrecio, estadoStock } from '../utils.js'

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
            <th className="hidden px-2 py-3 font-semibold md:table-cell">Tipo</th>
            <th className="px-1.5 py-3 sm:px-2 text-right font-semibold">Precio</th>
            <th className="px-1.5 py-3 sm:px-2 text-center font-semibold">Stock</th>
            <th className="hidden px-2 py-3 font-semibold md:table-cell">Estado</th>
            <th className="px-1.5 py-3 sm:px-2 text-right font-semibold"><span className="sr-only">Eliminar</span></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {articulos.map((articulo) => {
            const estado = estadoStock(articulo)
            return (
              <tr key={articulo.id} className="hover:bg-slate-50">
                <td className="px-1.5 py-3 sm:px-2">
                  <div className="font-semibold">{articulo.nombre}</div>
                  {/* En pantallas pequeñas la marca, el tipo y el estado van bajo el nombre para que la tabla quepa */}
                  <div className="text-xs text-slate-500 md:hidden">{articulo.marca} · {articulo.tipo}</div>
                  <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold md:hidden ${estado.clase}`}>{estado.texto}</span>
                </td>
                <td className="hidden px-2 py-3 md:table-cell">{articulo.marca}</td>
                <td className="hidden px-2 py-3 md:table-cell">{articulo.tipo}</td>
                <td className="px-1.5 py-3 sm:px-2 text-right whitespace-nowrap">{formatoPrecio(articulo.precio)}</td>
                <td className="px-1.5 py-3 sm:px-2">
                  <div className="mx-auto flex w-fit items-center overflow-hidden rounded-lg border border-slate-300">
                    <button type="button" className="px-1.5 py-1 hover:bg-slate-100 sm:px-2.5" onClick={() => onCambiarStock(articulo.id, -1)} aria-label={`Restar una unidad de ${articulo.nombre}`}>−</button>
                    <span className="min-w-6 bg-slate-50 px-1 py-1 text-center font-bold sm:min-w-9 sm:px-2" aria-label={`Stock de ${articulo.nombre}`}>{articulo.stock}</span>
                    <button type="button" className="px-1.5 py-1 hover:bg-slate-100 sm:px-2.5" onClick={() => onCambiarStock(articulo.id, 1)} aria-label={`Sumar una unidad de ${articulo.nombre}`}>+</button>
                  </div>
                </td>
                <td className="hidden px-2 py-3 md:table-cell">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${estado.clase}`}>{estado.texto}</span>
                </td>
                <td className="px-1.5 py-3 sm:px-2 text-right">
                  <button type="button" className="rounded-lg border border-red-300 px-2 py-1.5 text-red-600 hover:bg-red-50 sm:px-2.5" onClick={() => onEliminar(articulo.id)} aria-label={`Eliminar ${articulo.nombre}`}>
                    <i className="bi bi-trash3" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
