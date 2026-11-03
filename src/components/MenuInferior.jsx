// Menú de navegación INFERIOR (queda fijo abajo de la pantalla).
// Usa NavLink de React Router: cambia de página sin recargar y, con la función
// de className, se le puede dar un estilo distinto a la opción activa.
import { NavLink } from 'react-router-dom'

const OPCIONES = [
  { ruta: '/', texto: 'Inicio', icono: 'bi-house-door-fill', exacta: true },
  { ruta: '/quienes-somos', texto: 'Quiénes somos', icono: 'bi-people-fill' },
  { ruta: '/preguntas-frecuentes', texto: 'Preguntas', icono: 'bi-question-circle-fill' },
]

export default function MenuInferior() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-20 h-[68px] border-t border-slate-200 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.06)]"
      aria-label="Navegación principal"
    >
      <ul className="mx-auto flex h-full max-w-xl">
        {OPCIONES.map((opcion) => (
          <li key={opcion.ruta} className="flex-1">
            <NavLink
              to={opcion.ruta}
              end={opcion.exacta} // "/" solo se marca activo cuando la ruta es exactamente "/"
              className={({ isActive }) =>
                `flex h-full flex-col items-center justify-center gap-0.5 border-t-[3px] text-xs font-semibold transition-colors ${
                  isActive
                    ? 'border-verde-600 bg-verde-50 text-verde-600'
                    : 'border-transparent text-slate-500 hover:text-verde-600'
                }`
              }
            >
              <i className={`bi ${opcion.icono} text-xl`} aria-hidden="true"></i>
              <span>{opcion.texto}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
