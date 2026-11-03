// Barra superior con el nombre del supermercado.
export default function Encabezado() {
  return (
    <header className="sticky top-0 z-10 bg-verde-600 text-white shadow">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3">
        <i className="bi bi-basket3-fill text-3xl" aria-hidden="true"></i>
        <div className="leading-tight">
          <p className="text-lg font-bold">Supermercado Central</p>
          <p className="text-sm text-verde-100">Gestión de inventario</p>
        </div>
      </div>
    </header>
  )
}
