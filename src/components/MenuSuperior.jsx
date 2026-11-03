// MENÚ SUPERIOR (nuevo): lleva a las dos páginas de gestión de artículos.
// Igual que el menú inferior, usa NavLink de React Router.
import { NavLink } from 'react-router-dom'

const OPCIONES = [
  { ruta: '/agregar-articulo', texto: 'Agregar artículo', icono: 'bi-plus-circle-fill' },
  { ruta: '/articulos', texto: 'Artículos', icono: 'bi-table' },
]

export default function MenuSuperior() {
  return (
    <nav aria-label="Menú de artículos">
      <ul className="flex gap-2">
        {OPCIONES.map((opcion) => (
          <li key={opcion.ruta}>
            <NavLink
              to={opcion.ruta}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive ? 'bg-white text-verde-700 shadow' : 'text-white hover:bg-verde-700'
                }`
              }
            >
              <i className={`bi ${opcion.icono}`} aria-hidden="true"></i>
              {opcion.texto}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
