// Estructura común de todas las páginas.
// <Outlet /> es el lugar donde React Router dibuja la página de la ruta actual.
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Encabezado from './Encabezado.jsx'
import MenuInferior from './MenuInferior.jsx'

// Título de la pestaña del navegador según la ruta
const TITULOS = {
  '/': 'Inicio',
  '/articulos': 'Artículos',
  '/agregar-articulo': 'Agregar artículo',
  '/quienes-somos': 'Quiénes somos',
  '/preguntas-frecuentes': 'Preguntas frecuentes',
}

export default function Layout() {
  const { pathname } = useLocation() // ruta actual, por ejemplo "/articulos"

  // Cada vez que cambia la ruta: se sube al inicio de la página y se actualiza el título.
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = `${TITULOS[pathname] ?? 'Página no encontrada'} | Supermercado Central`
  }, [pathname])

  return (
    <div className="min-h-screen bg-fondo text-slate-800">
      <Encabezado />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 pb-28">
        <Outlet />
      </main>
      <MenuInferior />
    </div>
  )
}
