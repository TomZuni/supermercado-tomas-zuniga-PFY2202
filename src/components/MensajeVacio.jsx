// Mensaje centrado para pantallas sin contenido (carrito vacío, artículo inexistente, compra realizada...).
// Props: icono (clase de Bootstrap Icons), titulo, texto y children (por ejemplo, un botón).
import { tarjeta } from '../estilos.js'

export default function MensajeVacio({ icono, titulo, texto, colorIcono = 'text-slate-400', children }) {
  return (
    <div className={`${tarjeta} py-10 text-center`}>
      <i className={`bi ${icono} text-5xl ${colorIcono}`} aria-hidden="true"></i>
      <h2 className="mt-3 text-xl font-bold">{titulo}</h2>
      {texto && <p className="mx-auto mt-1 max-w-md text-slate-600">{texto}</p>}
      {children && <div className="mt-5 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  )
}
