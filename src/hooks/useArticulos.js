// Hook para usar el estado global de artículos en cualquier componente:
//   const { articulos, agregarArticulo, eliminarArticulo, cambiarStock, restablecer } = useArticulos()
import { useContext } from 'react'
import { ArticulosContext } from '../context/ArticulosContext.jsx'

export default function useArticulos() {
  const contexto = useContext(ArticulosContext)
  if (!contexto) throw new Error('useArticulos debe usarse dentro de <ArticulosProvider>')
  return contexto
}
