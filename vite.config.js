import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' usa rutas relativas: la app funciona en local y en GitHub Pages
// sin importar el nombre del repositorio.
// El plugin de Tailwind CSS genera las clases de utilidad que se usan en el código.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
