// Hook para usar el estado global (inventario y carrito) en cualquier componente:
//   const { articulos, carrito, agregarAlCarrito, ... } = useArticulos()
import { useContext } from 'react'
import { ArticulosContext } from '../context/ArticulosContext.jsx'

export default function useArticulos() {
  const contexto = useContext(ArticulosContext)
  if (!contexto) throw new Error('useArticulos debe usarse dentro de <ArticulosProvider>')
  return contexto
}
