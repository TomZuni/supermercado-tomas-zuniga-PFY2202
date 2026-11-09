// Página principal (home): panel con el resumen del inventario.
// Lee el estado global: cualquier artículo agregado o modificado se refleja aquí.
import { Link } from 'react-router-dom'
import ResumenInventario from '../components/ResumenInventario.jsx'
import useArticulos from '../hooks/useArticulos.js'
import InsigniaEstado from '../components/InsigniaEstado.jsx'
import { boton, botonSecundario, tarjeta } from '../estilos.js'

export default function Inicio() {
  const { articulos } = useArticulos()

  // Artículos que necesitan reposición (stock igual o menor al mínimo)
  const conStockBajo = articulos.filter((a) => a.stock <= a.stockMinimo)

  return (
    <section aria-labelledby="tituloInicio">
      <h1 id="tituloInicio" className="text-2xl font-bold">Panel de inventario</h1>
      <p className="mt-1 mb-6 text-slate-600">Resumen del estado del inventario del supermercado.</p>

      <ResumenInventario articulos={articulos} />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className={`${tarjeta} lg:col-span-2`}>
          <h2 className="mb-3 text-lg font-semibold">
            <i className="bi bi-exclamation-triangle-fill text-amber-500"></i> Artículos por reponer
          </h2>

          {/* Renderizado condicional: lista de alertas o mensaje de "todo en orden" */}
          {conStockBajo.length === 0 ? (
            <p className="text-slate-600">Todo en orden: ningún artículo tiene stock bajo.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {conStockBajo.map((articulo) => (
                <li key={articulo.id} className="flex items-center justify-between gap-3 py-2.5">
                  <div>
                    <Link to={`/articulos/${articulo.id}`} className="font-semibold text-verde-700 hover:underline">{articulo.nombre}</Link>
                    <p className="text-sm text-slate-500">{articulo.marca} · {articulo.tipo}</p>
                  </div>
                  <div className="text-right">
                    <InsigniaEstado articulo={articulo} />
                    <p className="mt-1 text-xs text-slate-500">{articulo.stock} de {articulo.stockMinimo} mínimo</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={`${tarjeta} flex flex-col gap-3`}>
          <h2 className="text-lg font-semibold">Accesos rápidos</h2>
          <Link to="/agregar-articulo" className={boton}>
            <i className="bi bi-plus-circle" aria-hidden="true"></i> Agregar artículo
          </Link>
          <Link to="/articulos" className={botonSecundario}>
            <i className="bi bi-table" aria-hidden="true"></i> Ver todos los artículos
          </Link>
        </div>
      </div>
    </section>
  )
}
