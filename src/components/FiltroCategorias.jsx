// Botones para filtrar por categoría.
// Props: categorias (lista de { nombre, cantidad }), activa (nombre elegido)
//        y onCambiar (función que avisa al padre qué categoría se eligió).
// No guarda datos: solo muestra las opciones y avisa cuál se tocó.
export default function FiltroCategorias({ categorias, activa, onCambiar }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
      {categorias.map((categoria) => {
        const seleccionada = categoria.nombre === activa
        return (
          <button
            key={categoria.nombre}
            type="button"
            aria-pressed={seleccionada}
            onClick={() => onCambiar(categoria.nombre)}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
              seleccionada
                ? 'border-verde-600 bg-verde-600 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:border-verde-600 hover:text-verde-600'
            }`}
          >
            {categoria.nombre} <span className={seleccionada ? 'text-verde-100' : 'text-slate-400'}>({categoria.cantidad})</span>
          </button>
        )
      })}
    </div>
  )
}
