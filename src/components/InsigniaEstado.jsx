// Insignia de color con el estado del stock: Disponible, Stock bajo o Agotado.
// Se reutiliza en la tabla, el panel de inicio, el detalle y el carrito.
// Props: articulo (usa su stock y su stock mínimo) y className (opcional, para márgenes).
import { estadoStock } from '../utils.js'

export default function InsigniaEstado({ articulo, className = '' }) {
  const estado = estadoStock(articulo)
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${estado.clase} ${className}`}>
      {estado.texto}
    </span>
  )
}
