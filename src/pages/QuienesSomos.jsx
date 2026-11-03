// Página informativa: Quiénes somos.
import { tarjeta } from '../estilos.js'

const VALORES = [
  { icono: 'bi-patch-check-fill', titulo: 'Calidad', texto: 'Seleccionamos productos frescos y de proveedores confiables.' },
  { icono: 'bi-cash-coin', titulo: 'Precios justos', texto: 'Trabajamos para que comprar lo esencial sea accesible para todos.' },
  { icono: 'bi-heart-fill', titulo: 'Cercanía', texto: 'Somos un supermercado de barrio: conocemos y escuchamos a nuestros clientes.' },
  { icono: 'bi-recycle', titulo: 'Compromiso', texto: 'Reducimos mermas y cuidamos el medio ambiente con un inventario ordenado.' },
]

export default function QuienesSomos() {
  return (
    <section aria-labelledby="tituloQuienes">
      <h1 id="tituloQuienes" className="text-2xl font-bold">Quiénes somos</h1>
      <p className="mt-1 mb-6 text-lg text-slate-600">
        Supermercado Central es un supermercado de barrio que busca ofrecer productos de calidad todos los días.
      </p>

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <div className={tarjeta}>
          <h2 className="mb-2 text-lg font-semibold"><i className="bi bi-flag-fill text-verde-600"></i> Misión</h2>
          <p>
            Abastecer a las familias de nuestro sector con productos de primera necesidad, manteniendo siempre
            el stock disponible gracias a una gestión de inventario ordenada y eficiente.
          </p>
        </div>
        <div className={tarjeta}>
          <h2 className="mb-2 text-lg font-semibold"><i className="bi bi-eye-fill text-verde-600"></i> Visión</h2>
          <p>
            Ser el supermercado preferido del barrio, reconocido por su buena atención, sus precios justos y
            la confianza de sus clientes.
          </p>
        </div>
      </div>

      <h2 className="mb-3 text-lg font-semibold">Nuestros valores</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {VALORES.map((valor) => (
          <div className={`${tarjeta} text-center`} key={valor.titulo}>
            <i className={`bi ${valor.icono} text-3xl text-verde-600`} aria-hidden="true"></i>
            <h3 className="mt-2 font-semibold">{valor.titulo}</h3>
            <p className="text-sm text-slate-500">{valor.texto}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
