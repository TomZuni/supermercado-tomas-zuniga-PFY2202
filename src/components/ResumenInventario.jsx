// Tarjetas con el resumen del inventario.
// Props: articulos (lista completa). Los totales se calculan en cada render.
import { formatoPrecio } from '../utils.js'
import { tarjeta } from '../estilos.js'

export default function ResumenInventario({ articulos }) {
  const unidades = articulos.reduce((suma, a) => suma + a.stock, 0)
  const valor = articulos.reduce((suma, a) => suma + a.stock * a.precio, 0)
  const alertas = articulos.filter((a) => a.stock <= a.stockMinimo).length

  const datos = [
    { icono: 'bi-box-seam-fill', titulo: 'Artículos', valor: articulos.length },
    { icono: 'bi-stack', titulo: 'Unidades en stock', valor: unidades.toLocaleString('es-CL') },
    { icono: 'bi-currency-dollar', titulo: 'Valor del inventario', valor: formatoPrecio(valor) },
    { icono: 'bi-exclamation-triangle-fill', titulo: 'Con stock bajo', valor: alertas, alerta: alertas > 0 },
  ]

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {datos.map((dato) => (
        <div className={`${tarjeta} flex items-center gap-3 !p-4`} key={dato.titulo}>
          <i className={`bi ${dato.icono} text-3xl ${dato.alerta ? 'text-amber-500' : 'text-verde-600'}`} aria-hidden="true"></i>
          <div>
            <div className="text-xl font-bold leading-none">{dato.valor}</div>
            <small className="text-slate-500">{dato.titulo}</small>
          </div>
        </div>
      ))}
    </div>
  )
}
