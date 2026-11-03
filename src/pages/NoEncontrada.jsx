// Se muestra cuando la ruta no existe (ruta comodín "*").
import { Link } from 'react-router-dom'
import { boton } from '../estilos.js'

export default function NoEncontrada() {
  return (
    <section className="py-12 text-center">
      <i className="bi bi-exclamation-triangle-fill text-6xl text-amber-500" aria-hidden="true"></i>
      <h1 className="mt-4 text-2xl font-bold">Página no encontrada</h1>
      <p className="mt-1 mb-6 text-slate-600">La dirección que buscas no existe.</p>
      <Link to="/" className={boton}>Volver al inicio</Link>
    </section>
  )
}
