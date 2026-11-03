// Funciones de ayuda reutilizables.

// 1490 -> "$1.490"
export const formatoPrecio = (numero) => `$${Number(numero).toLocaleString('es-CL')}`

// Devuelve el estado de un artículo según su stock (texto y clases de Tailwind para la insignia).
export function estadoStock(articulo) {
  if (articulo.stock === 0) return { texto: 'Agotado', clase: 'bg-red-100 text-red-700' }
  if (articulo.stock <= articulo.stockMinimo) return { texto: 'Stock bajo', clase: 'bg-amber-100 text-amber-800' }
  return { texto: 'Disponible', clase: 'bg-emerald-100 text-emerald-800' }
}
