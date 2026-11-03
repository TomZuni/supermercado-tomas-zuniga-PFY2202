// Página para INGRESAR nuevos artículos al inventario.
// Usa el estado global (agregarArticulo) y, al guardar, redirige a la lista con useNavigate.
import { useNavigate } from 'react-router-dom'
import FormularioArticulo from '../components/FormularioArticulo.jsx'
import useArticulos from '../hooks/useArticulos.js'
import { tarjeta } from '../estilos.js'

export default function AgregarArticulo() {
  const { agregarArticulo } = useArticulos()
  const navegar = useNavigate()

  const guardar = (articulo) => {
    agregarArticulo(articulo) // se guarda en el estado global
    // Redirige a la tabla de artículos y le envía el nombre para mostrar un aviso.
    navegar('/articulos', { state: { agregado: articulo.nombre } })
  }

  return (
    <section aria-labelledby="tituloAgregar" className="mx-auto max-w-3xl">
      <h1 id="tituloAgregar" className="text-2xl font-bold">Agregar artículo</h1>
      <p className="mt-1 mb-6 text-slate-600">Ingresa un nuevo artículo al inventario del supermercado.</p>
      <div className={tarjeta}>
        <FormularioArticulo onGuardar={guardar} />
      </div>
    </section>
  )
}
