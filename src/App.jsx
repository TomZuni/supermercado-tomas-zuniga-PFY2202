// Define las RUTAS de la aplicación con React Router y entrega el ESTADO GLOBAL
// (ArticulosProvider) a todas las páginas.
//   /                      -> Inicio (panel con resumen)
//   /articulos             -> Tabla con todos los artículos (con filtro por categoría)
//   /articulos/:id         -> Detalle de un artículo (agregar al carrito)
//   /carrito               -> Carrito de compras
//   /agregar-articulo      -> Formulario para ingresar un artículo
//   /quienes-somos         -> Quiénes somos
//   /preguntas-frecuentes  -> Preguntas frecuentes
//   cualquier otra         -> Página no encontrada
// Todas comparten el mismo Layout (encabezado + contenido + menú inferior).
import { Routes, Route } from 'react-router-dom'
import { ArticulosProvider } from './context/ArticulosContext.jsx'
import Layout from './components/Layout.jsx'
import Inicio from './pages/Inicio.jsx'
import Articulos from './pages/Articulos.jsx'
import DetalleArticulo from './pages/DetalleArticulo.jsx'
import Carrito from './pages/Carrito.jsx'
import AgregarArticulo from './pages/AgregarArticulo.jsx'
import QuienesSomos from './pages/QuienesSomos.jsx'
import PreguntasFrecuentes from './pages/PreguntasFrecuentes.jsx'
import NoEncontrada from './pages/NoEncontrada.jsx'

export default function App() {
  return (
    // Todo lo que está dentro del Provider puede leer y modificar la lista de artículos.
    <ArticulosProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="articulos" element={<Articulos />} />
          <Route path="articulos/:id" element={<DetalleArticulo />} />
          <Route path="carrito" element={<Carrito />} />
          <Route path="agregar-articulo" element={<AgregarArticulo />} />
          <Route path="quienes-somos" element={<QuienesSomos />} />
          <Route path="preguntas-frecuentes" element={<PreguntasFrecuentes />} />
          <Route path="*" element={<NoEncontrada />} />
        </Route>
      </Routes>
    </ArticulosProvider>
  )
}
