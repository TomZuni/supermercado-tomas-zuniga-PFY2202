// Página principal (home): gestión del inventario.
// Recibe el inventario por props desde App.jsx. Aquí solo vive el estado de los
// filtros (búsqueda y categoría), que es propio de esta pantalla.
import { useState } from 'react'
import ResumenInventario from '../components/ResumenInventario.jsx'
import TablaInventario from '../components/TablaInventario.jsx'
import FormularioProducto from '../components/FormularioProducto.jsx'
import { CATEGORIAS } from '../data/productos.js'

export default function Inicio({ inventario }) {
  const { productos, agregar, eliminar, cambiarStock, restablecer } = inventario
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('Todas')

  // Datos derivados: la lista que se muestra depende de los filtros.
  const texto = busqueda.trim().toLowerCase()
  const filtrados = productos.filter(
    (p) => p.nombre.toLowerCase().includes(texto) && (categoria === 'Todas' || p.categoria === categoria),
  )

  return (
    <section aria-labelledby="tituloInicio">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h1 id="tituloInicio" className="h3 mb-0">Inventario del supermercado</h1>
          <p className="text-secondary mb-0">Controla los productos y avisa cuando el stock está bajo.</p>
        </div>
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={restablecer}>
          <i className="bi bi-arrow-counterclockwise" aria-hidden="true"></i> Restablecer inventario
        </button>
      </div>

      <ResumenInventario articulos={productos} />

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="tarjeta">
            <div className="row g-2 mb-3">
              <div className="col-sm-7">
                <label htmlFor="busqueda" className="visually-hidden">Buscar producto</label>
                <input id="busqueda" type="search" className="form-control" placeholder="Buscar producto..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
              </div>
              <div className="col-sm-5">
                <label htmlFor="filtroCategoria" className="visually-hidden">Filtrar por categoría</label>
                <select id="filtroCategoria" className="form-select" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                  <option value="Todas">Todas las categorías</option>
                  {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <TablaInventario productos={filtrados} onCambiarStock={cambiarStock} onEliminar={eliminar} />
          </div>
        </div>
        <div className="col-lg-4">
          <FormularioProducto onAgregar={agregar} />
        </div>
      </div>
    </section>
  )
}
