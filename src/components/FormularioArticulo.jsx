// Formulario para agregar un artículo nuevo.
// Props: onGuardar (función que recibe el artículo ya validado).
// Estado propio: datos (lo que el usuario escribe) y errores (un mensaje por campo).
import { useState } from 'react'
import { TIPOS } from '../data/articulos.js'
import { boton, campo, etiqueta, textoError } from '../estilos.js'

const VACIO = { nombre: '', marca: '', tipo: '', precio: '', stock: '', stockMinimo: '5' }

export default function FormularioArticulo({ onGuardar }) {
  const [datos, setDatos] = useState(VACIO)
  const [errores, setErrores] = useState({})

  // Un solo manejador para todos los campos: usa el atributo "name" de cada input.
  const cambiar = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value })
    setErrores({ ...errores, [e.target.name]: undefined }) // quita el error del campo que se corrige
  }

  // Devuelve un objeto con los errores encontrados ({} si todo está bien).
  const validar = () => {
    const e = {}
    if (datos.nombre.trim().length < 3) e.nombre = 'El nombre debe tener al menos 3 caracteres.'
    if (datos.marca.trim().length < 2) e.marca = 'Ingresa la marca (o "Sin marca").'
    if (datos.tipo === '') e.tipo = 'Selecciona un tipo de producto.'
    if (datos.precio === '' || Number(datos.precio) <= 0) e.precio = 'Ingresa un precio mayor a 0.'
    if (datos.stock === '' || Number(datos.stock) < 0) e.stock = 'Ingresa un stock de 0 o más.'
    if (datos.stockMinimo === '' || Number(datos.stockMinimo) < 0) e.stockMinimo = 'Ingresa un mínimo de 0 o más.'
    return e
  }

  const enviar = (evento) => {
    evento.preventDefault()
    const nuevosErrores = validar()
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    onGuardar({
      nombre: datos.nombre.trim(),
      marca: datos.marca.trim(),
      tipo: datos.tipo,
      precio: Number(datos.precio),
      stock: Math.floor(Number(datos.stock)),
      stockMinimo: Math.floor(Number(datos.stockMinimo)),
    })
    setDatos(VACIO)
  }

  return (
    <form onSubmit={enviar} noValidate className="space-y-4">
      <div>
        <label htmlFor="nombre" className={etiqueta}>Nombre del artículo</label>
        <input id="nombre" name="nombre" className={campo(errores.nombre)} value={datos.nombre} onChange={cambiar} placeholder="Ej: Harina de trigo (1 kg)" />
        {errores.nombre && <p className={textoError}>{errores.nombre}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="marca" className={etiqueta}>Marca</label>
          <input id="marca" name="marca" className={campo(errores.marca)} value={datos.marca} onChange={cambiar} placeholder="Ej: Selecta" />
          {errores.marca && <p className={textoError}>{errores.marca}</p>}
        </div>
        <div>
          <label htmlFor="tipo" className={etiqueta}>Tipo de producto</label>
          <select id="tipo" name="tipo" className={campo(errores.tipo)} value={datos.tipo} onChange={cambiar}>
            <option value="">Selecciona un tipo</option>
            {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errores.tipo && <p className={textoError}>{errores.tipo}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="precio" className={etiqueta}>Precio (CLP)</label>
          <input id="precio" name="precio" type="number" min="1" className={campo(errores.precio)} value={datos.precio} onChange={cambiar} />
          {errores.precio && <p className={textoError}>{errores.precio}</p>}
        </div>
        <div>
          <label htmlFor="stock" className={etiqueta}>Stock</label>
          <input id="stock" name="stock" type="number" min="0" className={campo(errores.stock)} value={datos.stock} onChange={cambiar} />
          {errores.stock && <p className={textoError}>{errores.stock}</p>}
        </div>
        <div>
          <label htmlFor="stockMinimo" className={etiqueta}>Stock mínimo</label>
          <input id="stockMinimo" name="stockMinimo" type="number" min="0" className={campo(errores.stockMinimo)} value={datos.stockMinimo} onChange={cambiar} />
          {errores.stockMinimo && <p className={textoError}>{errores.stockMinimo}</p>}
        </div>
      </div>

      <button type="submit" className={`${boton} w-full sm:w-auto`}>
        <i className="bi bi-check-circle" aria-hidden="true"></i> Guardar artículo
      </button>
    </form>
  )
}
