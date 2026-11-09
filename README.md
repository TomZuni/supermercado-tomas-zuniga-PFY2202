# Supermercado Central – Gestión de inventario

- **Curso:** Desarrollo Frontend II (PFY2202) · Duoc UC
- **Actividades:** Formativa 1 (React Router), Formativa 2 (estado y framework CSS) y Semana 3 (React avanzado: filtro, detalle y carrito)
- **Alumno:** Tomás Zúñiga
- **Repositorio:** `supermercado-tomas-zuniga-PFY2202`

Sitio web de gestión de inventario para un supermercado, hecho con **React**, **React Router**, **estado global con Context API** y **Tailwind CSS**. Permite listar y filtrar artículos, ver su detalle, agregarlos a un carrito y ajustar sus cantidades, actualizando siempre el inventario general.

## Páginas y rutas

| Ruta | Página | Menú | Contenido |
|---|---|---|---|
| `/` | **Inicio** | Inferior | Panel con el resumen del inventario y los artículos por reponer. |
| `/agregar-articulo` | **Agregar artículo** | Superior | Formulario para ingresar un artículo nuevo al inventario. |
| `/articulos` | **Artículos** | Superior | Tabla con todos los artículos, con **filtro por categoría** y buscador. |
| `/articulos/:id` | **Detalle del artículo** | — | Datos completos del artículo y botón **Agregar al carrito**. |
| `/carrito` | **Carrito** | Inferior | Artículos agregados, con botones para subir o bajar la cantidad. |
| `/quienes-somos` | **Quiénes somos** | Inferior | Misión, visión y valores. |
| `/preguntas-frecuentes` | **Preguntas frecuentes** | Inferior | Acordeón con preguntas sobre el uso del inventario. |
| cualquier otra | **Página no encontrada** | — | Mensaje de error con enlace al inicio. |

El sitio tiene **dos menús**: el **inferior** (Inicio, Carrito, Quiénes somos y Preguntas; el carrito muestra una insignia con las unidades agregadas) y el **superior** (Agregar artículo y Artículos).

## Navegación con React Router

- `main.jsx`: envuelve la app en `<HashRouter>` (rutas con `#`, para que funcione al recargar en GitHub Pages).
- `App.jsx`: define las rutas con `<Routes>` y `<Route>`, incluida la ruta comodín `*`.
- `Layout.jsx`: estructura común con `<Outlet />`; usa `useLocation` para actualizar el título de la pestaña.
- `MenuSuperior.jsx` y `MenuInferior.jsx`: usan `<NavLink>` y marcan la opción activa.
- `DetalleArticulo.jsx`: usa `useParams` para leer el `id` de la ruta `/articulos/:id`.
- `AgregarArticulo.jsx`: usa `useNavigate` para redirigir a la tabla al guardar y le envía un aviso con el estado de la navegación.

## Estado global (Context API + useReducer)

La lista de artículos vive en un **estado global** definido en `src/context/ArticulosContext.jsx`:

- `useReducer` concentra todas las modificaciones en una sola función (`reducer`) con las acciones `agregar_articulo`, `eliminar_articulo`, `cambiar_stock`, `restablecer` y las del carrito (`agregar_al_carrito`, `cambiar_cantidad`, `quitar_del_carrito`, `vaciar_carrito`, `comprar`).
- `ArticulosProvider` envuelve la aplicación en `App.jsx` y comparte la lista y las acciones con todos los componentes.
- `hooks/useArticulos.js` es el hook que usan las páginas para leer o modificar el estado.
- Cada artículo guarda: **nombre, marca, tipo de producto**, precio, stock y stock mínimo.
- El estado guarda `articulos` (el inventario) y `carrito` (solo el `id` y la `cantidad` de cada línea; el resto de los datos se toma del inventario).
- Con `useEffect` la lista se guarda en el navegador, de modo que se mantiene al recargar.

## Filtro por categoría

En `Articulos.jsx` la categoría elegida y el texto de búsqueda se guardan con `useState`, pero la lista original **nunca se modifica**: en cada render se calcula una lista nueva con `filter` a partir del inventario completo. Por eso al cambiar de categoría, volver a **Todas** o borrar la búsqueda se recuperan todos los artículos. Los botones muestran cuántos artículos tiene cada categoría.

## Detalle y carrito: cómo se actualiza el inventario

- En la tabla, el nombre de cada artículo es un enlace a `/articulos/:id`.
- **Agregar al carrito** resta 1 al stock disponible (la función `moverAlCarrito` del reducer).
- En el **Carrito**, los botones **+** y **−** suben o bajan la cantidad y el inventario cambia en sentido contrario: +1 en el carrito = −1 disponible, −1 en el carrito = +1 disponible.
- No se puede superar el stock disponible, y al llegar a 0 unidades el artículo sale del carrito.
- **Quitar** o **Vaciar carrito** devuelven las unidades al inventario; **Finalizar compra** vacía el carrito y deja el stock descontado.

Como el estado es global, un artículo agregado en **Agregar artículo** aparece de inmediato en **Artículos** y en el resumen de **Inicio**.

## Framework CSS: Tailwind CSS

Se usa **Tailwind CSS 4** con su plugin para Vite (`@tailwindcss/vite`):

- `src/styles/app.css` importa Tailwind y define la paleta verde de la marca con `@theme`.
- El diseño se escribe con clases de utilidad en los componentes (por ejemplo `grid`, `flex`, `rounded-xl`, `bg-verde-600`).
- Se usan variantes responsivas (`sm:`, `md:`, `lg:`) para adaptar el sitio a celulares y escritorio.
- `src/estilos.js` agrupa las clases que se repiten (botones, tarjetas y campos) para mantener un diseño consistente.

## Estructura del proyecto

```
.
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                     Punto de entrada y HashRouter
    ├── App.jsx                      Rutas + ArticulosProvider
    ├── estilos.js                   Clases de Tailwind reutilizables
    ├── utils.js                     Formato de precio y estado del stock
    ├── context/
    │   └── ArticulosContext.jsx     Estado global (Context + useReducer)
    ├── hooks/
    │   └── useArticulos.js          Hook para usar el estado global
    ├── data/
    │   └── articulos.js             Artículos y tipos iniciales
    ├── components/
    │   ├── Layout.jsx               Estructura común con <Outlet />
    │   ├── Encabezado.jsx           Barra superior
    │   ├── MenuSuperior.jsx         Menú superior (agregar y listar artículos)
    │   ├── MenuInferior.jsx         Menú inferior con insignia del carrito
    │   ├── ResumenInventario.jsx    Tarjetas de resumen
    │   ├── TablaArticulos.jsx       Tabla de artículos
    │   ├── FiltroCategorias.jsx     Botones de filtro por categoría
    │   ├── ControlCantidad.jsx      Control − número + (tabla y carrito)
    │   ├── InsigniaEstado.jsx       Etiqueta Disponible / Stock bajo / Agotado
    │   ├── MensajeVacio.jsx         Mensaje para pantallas sin contenido
    │   └── FormularioArticulo.jsx   Formulario con validación
    ├── pages/
    │   ├── Inicio.jsx               Panel con resumen
    │   ├── AgregarArticulo.jsx      Formulario para agregar
    │   ├── Articulos.jsx            Tabla con filtro por categoría
    │   ├── DetalleArticulo.jsx      Detalle y agregar al carrito
    │   ├── Carrito.jsx              Carrito de compras
    │   ├── QuienesSomos.jsx
    │   ├── PreguntasFrecuentes.jsx
    │   └── NoEncontrada.jsx         Ruta comodín (404)
    └── styles/
        └── app.css                  Tailwind y colores de la marca
```

## Cómo probar las funcionalidades

1. Entra a **Agregar artículo** (menú superior), envía el formulario vacío y revisa los mensajes de error.
2. Completa nombre, marca, tipo, precio y stock, y pulsa **Guardar artículo**: el sitio te lleva a la tabla y el artículo aparece al final.
3. En **Artículos**, filtra por categoría (por ejemplo **Lácteos**), busca por nombre o marca, y vuelve a **Todas**: la lista completa reaparece.
4. Toca el nombre de un artículo (por ejemplo *Arroz grado 1*) para ver su **detalle** y pulsa **Agregar al carrito** dos veces: las unidades disponibles bajan de 48 a 46 y el carrito del menú inferior muestra 2.
5. Entra a **Carrito**, sube y baja la cantidad con **+** y **−** y observa cómo cambia "Quedan N disponibles". Vuelve a **Artículos** para ver el inventario actualizado.
6. Prueba **Finalizar compra**, **Vaciar carrito** y el botón de eliminar de una línea. Un artículo sin stock (*Yogurt*) tiene el botón de agregar desactivado.
7. Recarga la página: los datos se mantienen. **Restablecer inventario** vuelve a los datos iniciales.

## Instalación y uso

Requiere [Node.js](https://nodejs.org) 18 o superior.

```bash
npm install        # instala las dependencias
npm run dev        # modo desarrollo en http://localhost:5173
npm run build      # genera la carpeta dist para producción
npm run preview    # prueba la versión de producción
```

## Publicar en GitHub Pages

1. Sube el código a la rama `main` del repositorio público.
2. Ejecuta `npm run deploy`: compila el proyecto y sube la carpeta `dist` a la rama `gh-pages`.
3. En GitHub: **Settings → Pages → Branch: `gh-pages` / `/ (root)`** y guarda.
4. El sitio queda en `https://TU-USUARIO.github.io/supermercado-tomas-zuniga-PFY2202/`.

## Trabajo colaborativo con Git

El repositorio se comparte con el docente desde **Settings → Collaborators** (o con el enlace, al ser público). El historial de commits muestra la evolución del proyecto: configuración inicial, React Router, inventario, migración a Tailwind, estado global, carrito, filtro por categoría y detalle de artículo.

## Tecnologías

React 19 · React Router 7 · Context API + useReducer · Tailwind CSS 4 · Vite · Bootstrap Icons · JavaScript (ES6)
