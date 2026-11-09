// Página que LISTA en una tabla todos los artículos del inventario.
// Los datos vienen del estado global (useArticulos). Aquí solo viven los filtros.
//
// FILTRO POR CATEGORÍA: la lista original (articulos) nunca se modifica.
// En cada render se calcula una lista nueva (filtrados) a partir de ella; así,
// al cambiar de categoría o de búsqueda no se pierden los datos del inventario.
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import TablaArticulos from '../components/TablaArticulos.jsx'
import FiltroCategorias from '../components/FiltroCategorias.jsx'
import useArticulos from '../hooks/useArticulos.js'
import { boton, botonSecundario, campo, tarjeta } from '../estilos.js'

export default function Articulos() {
  const { articulos, eliminarArticulo, cambiarStock, restablecer } = useArticulos()
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [avisoCerrado, setAvisoCerrado] = useState(false)

  // Si se llegó desde "Agregar artículo", el router entrega el nombre del artículo nuevo.
  const { state } = useLocation()
  const agregado = state?.agregado

  // Categorías que existen hoy en el inventario, con la cantidad de artículos de cada una.
  const nombres = [...new Set(articulos.map((a) => a.tipo))]
  const categorias = [
    { nombre: 'Todas', cantidad: articulos.length },
    ...nombres.map((nombre) => ({ nombre, cantidad: articulos.filter((a) => a.tipo === nombre).length })),
  ]
  // Si la categoría elegida ya no existe (por ejemplo, se eliminó su último artículo), se vuelve a "Todas".
  const categoriaActiva = categorias.some((c) => c.nombre === categoria) ? categoria : 'Todas'

  // Datos derivados: la lista que se muestra depende de los filtros.
  const texto = busqueda.trim().toLowerCase()
  const filtrados = articulos.filter(
    (a) =>
      (categoriaActiva === 'Todas' || a.tipo === categoriaActiva) &&
      (a.nombre.toLowerCase().includes(texto) || a.marca.toLowerCase().includes(texto)),
  )

  return (
    <section aria-labelledby="tituloArticulos">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 id="tituloArticulos" className="text-2xl font-bold">Artículos del inventario</h1>
          <p className="text-slate-600">Filtra por categoría y toca un artículo para ver su detalle.</p>
        </div>
        <Link to="/agregar-articulo" className={boton}>
          <i className="bi bi-plus-circle" aria-hidden="true"></i> Agregar artículo
        </Link>
      </div>

      {/* Renderizado condicional: aviso al volver desde "Agregar artículo" */}
      {agregado && !avisoCerrado && (
        <div role="status" className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-emerald-800">
          <span><i className="bi bi-check-circle-fill"></i> El artículo <strong>{agregado}</strong> se agregó correctamente.</span>
          <button type="button" className="text-sm underline" onClick={() => setAvisoCerrado(true)}>Cerrar</button>
        </div>
      )}

      <div className={tarjeta}>
        <FiltroCategorias categorias={categorias} activa={categoriaActiva} onCambiar={setCategoria} />

        <div className="mt-4 mb-3">
          <label htmlFor="busqueda" className="sr-only">Buscar artículo</label>
          <input id="busqueda" type="search" className={campo(false)} placeholder="Buscar por nombre o marca..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        </div>

        <p className="mb-2 text-sm text-slate-500" aria-live="polite">
          Mostrando {filtrados.length} de {articulos.length} artículos
        </p>

        <TablaArticulos articulos={filtrados} onCambiarStock={cambiarStock} onEliminar={eliminarArticulo} />

        <div className="mt-4 text-right">
          <button type="button" className={botonSecundario} onClick={restablecer}>
            <i className="bi bi-arrow-counterclockwise" aria-hidden="true"></i> Restablecer inventario
          </button>
        </div>
      </div>
    </section>
  )
}
