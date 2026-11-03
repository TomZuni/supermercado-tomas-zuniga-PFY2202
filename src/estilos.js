// Grupos de clases de Tailwind que se repiten en varios componentes.
// Así el diseño de botones, campos y tarjetas es el mismo en todo el sitio.

export const tarjeta = 'rounded-xl border border-slate-200 bg-white p-5 shadow-sm'

export const boton =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-verde-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-verde-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-verde-600 focus-visible:ring-offset-2'

export const botonSecundario =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50'

export const etiqueta = 'mb-1 block text-sm font-medium text-slate-700'

// Campo de formulario. Si tiene error, se pinta en rojo.
export const campo = (conError) =>
  `w-full rounded-lg border bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
    conError ? 'border-red-500 focus:ring-red-300' : 'border-slate-300 focus:border-verde-600 focus:ring-verde-100'
  }`

export const textoError = 'mt-1 text-sm text-red-600'
