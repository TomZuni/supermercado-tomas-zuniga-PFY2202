// Página informativa: Preguntas frecuentes (acordeón).
// El estado "abierta" guarda cuál pregunta está desplegada (o null si ninguna).
import { useState } from 'react'

const PREGUNTAS = [
  { pregunta: '¿Cómo agrego un artículo al inventario?', respuesta: 'En el menú superior entra a "Agregar artículo", completa nombre, marca, tipo, precio y stock, y pulsa "Guardar artículo". Después lo verás en la lista de artículos.' },
  { pregunta: '¿Dónde veo todos los artículos?', respuesta: 'En el menú superior, opción "Artículos". Ahí aparece la tabla con todos los productos del inventario, con buscador y filtro por tipo.' },
  { pregunta: '¿Cómo actualizo el stock de un artículo?', respuesta: 'En la tabla de artículos usa los botones − y + de cada fila para restar o sumar una unidad al stock.' },
  { pregunta: '¿Qué significa "Stock bajo"?', respuesta: 'Un artículo aparece con "Stock bajo" cuando sus unidades son iguales o menores al stock mínimo definido. Si llega a cero, se marca como "Agotado".' },
  { pregunta: '¿Se pierden los datos si recargo la página?', respuesta: 'No. El inventario se guarda en tu navegador, así que los cambios se mantienen al recargar. Con "Restablecer inventario" vuelves a los datos iniciales.' },
  { pregunta: '¿Cómo elimino un artículo?', respuesta: 'En la tabla de artículos pulsa el ícono de papelera en la fila del artículo que quieres quitar.' },
]

export default function PreguntasFrecuentes() {
  const [abierta, setAbierta] = useState(null)

  // Si se toca la pregunta ya abierta, se cierra; si no, se abre la nueva.
  const alternar = (indice) => setAbierta(abierta === indice ? null : indice)

  return (
    <section aria-labelledby="tituloPreguntas">
      <h1 id="tituloPreguntas" className="text-2xl font-bold">Preguntas frecuentes</h1>
      <p className="mt-1 mb-6 text-slate-600">Resolvemos las dudas más comunes sobre el uso del inventario.</p>

      <div className="space-y-3">
        {PREGUNTAS.map((item, indice) => {
          const estaAbierta = abierta === indice
          return (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white" key={item.pregunta}>
              <h2>
                <button
                  type="button"
                  className={`flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left font-semibold ${
                    estaAbierta ? 'bg-verde-50 text-verde-700' : 'hover:bg-slate-50'
                  }`}
                  aria-expanded={estaAbierta}
                  aria-controls={`respuesta-${indice}`}
                  onClick={() => alternar(indice)}
                >
                  <span>{item.pregunta}</span>
                  <i className={`bi ${estaAbierta ? 'bi-chevron-up' : 'bi-chevron-down'}`} aria-hidden="true"></i>
                </button>
              </h2>
              {/* Renderizado condicional: la respuesta solo existe cuando está abierta */}
              {estaAbierta && (
                <div className="border-t border-slate-200 px-4 py-3.5 text-slate-600" id={`respuesta-${indice}`}>
                  {item.respuesta}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
