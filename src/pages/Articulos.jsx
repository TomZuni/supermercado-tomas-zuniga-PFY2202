// Página que LISTA en una tabla todos los artículos del inventario.
// Los datos vienen del estado global (useArticulos). Aquí solo viven los filtros.
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import TablaArticulos from '../components/TablaArticulos.jsx'
import useArticulos from '../hooks/useArticulos.js'
import { TIPOS } from '../data/articulos.js'
import { boton, botonSecundario, campo, tarjeta } from '../estilos.js'

export default function Articulos() {
  const { articulos, eliminarArticulo, cambiarStock, restablecer } = useArticulos()
  const [busqueda, setBusqueda] = useState('')
  const [tipo, setTipo] = useState('Todos')
  const [avisoCerrado, setAvisoCerrado] = useState(false)

  // Si se llegó desde "Agregar artículo", el router entrega el nombre del artículo nuevo.
  const { state } = useLocation()
  const agregado = state?.agregado

  // Datos derivados: la lista que se muestra depende de los filtros.
  const texto = busqueda.trim().toLowerCase()
  const filtrados = articulos.filter(
    (a) =>
      (a.nombre.toLowerCase().includes(texto) || a.marca.toLowerCase().includes(texto)) &&
      (tipo === 'Todos' || a.tipo === tipo),
  )

  // Los tipos del filtro incluyen los de la lista base y cualquier otro que se haya usado.
  const tipos = [...new Set([...TIPOS, ...articulos.map((a) => a.tipo)])]

  return (
    <section aria-labelledby="tituloArticulos">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 id="tituloArticulos" className="text-2xl font-bold">Artículos del inventario</h1>
          <p className="text-slate-600">Todos los artículos disponibles en el supermercado.</p>
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
        <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_14rem]">
          <div>
            <label htmlFor="busqueda" className="sr-only">Buscar artículo</label>
            <input id="busqueda" type="search" className={campo(false)} placeholder="Buscar por nombre o marca..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
          </div>
          <div>
            <label htmlFor="filtroTipo" className="sr-only">Filtrar por tipo</label>
            <select id="filtroTipo" className={campo(false)} value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="Todos">Todos los tipos</option>
              {tipos.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
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
