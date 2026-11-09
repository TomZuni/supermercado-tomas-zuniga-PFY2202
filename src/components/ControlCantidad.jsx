// Control "− número +" para subir o bajar una cantidad.
// Se reutiliza para ajustar el stock en la tabla y la cantidad en el carrito.
// Props: valor, etiqueta (texto para lectores de pantalla), onRestar, onSumar
//        y restarDeshabilitado / sumarDeshabilitado (para bloquear los botones).
const BOTON = 'px-1.5 py-1 hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent sm:px-2.5'

export default function ControlCantidad({ valor, etiqueta, onRestar, onSumar, restarDeshabilitado = false, sumarDeshabilitado = false }) {
  return (
    <div className="mx-auto flex w-fit items-center overflow-hidden rounded-lg border border-slate-300 bg-white" role="group" aria-label={etiqueta}>
      <button type="button" className={BOTON} onClick={onRestar} disabled={restarDeshabilitado} aria-label={`Restar una unidad (${etiqueta})`}>−</button>
      <span className="min-w-6 bg-slate-50 px-1 py-1 text-center font-bold sm:min-w-9 sm:px-2" aria-live="polite">{valor}</span>
      <button type="button" className={BOTON} onClick={onSumar} disabled={sumarDeshabilitado} aria-label={`Sumar una unidad (${etiqueta})`}>+</button>
    </div>
  )
}
