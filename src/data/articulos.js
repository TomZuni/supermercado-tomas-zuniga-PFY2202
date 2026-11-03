// Datos iniciales del inventario.
// Cada artículo tiene: id, nombre, marca, tipo de producto, precio (CLP), stock y stock mínimo.
// Cuando el stock es igual o menor al mínimo, la aplicación avisa "Stock bajo".

export const TIPOS = ['Abarrotes', 'Lácteos', 'Frutas y verduras', 'Bebidas', 'Aseo', 'Carnes', 'Panadería']

export const ARTICULOS_INICIALES = [
  { id: 1, nombre: 'Arroz grado 1 (1 kg)', marca: 'Tucapel', tipo: 'Abarrotes', precio: 1490, stock: 48, stockMinimo: 15 },
  { id: 2, nombre: 'Fideos spaghetti (400 g)', marca: 'Carozzi', tipo: 'Abarrotes', precio: 990, stock: 12, stockMinimo: 20 },
  { id: 3, nombre: 'Aceite vegetal (1 L)', marca: 'Chef', tipo: 'Abarrotes', precio: 2790, stock: 30, stockMinimo: 10 },
  { id: 4, nombre: 'Leche entera (1 L)', marca: 'Colún', tipo: 'Lácteos', precio: 1190, stock: 6, stockMinimo: 12 },
  { id: 5, nombre: 'Yogurt natural (150 g)', marca: 'Soprole', tipo: 'Lácteos', precio: 450, stock: 0, stockMinimo: 10 },
  { id: 6, nombre: 'Manzana roja (kg)', marca: 'Sin marca', tipo: 'Frutas y verduras', precio: 1790, stock: 25, stockMinimo: 8 },
  { id: 7, nombre: 'Bebida cola (2 L)', marca: 'Coca-Cola', tipo: 'Bebidas', precio: 2190, stock: 40, stockMinimo: 12 },
  { id: 8, nombre: 'Detergente líquido (3 L)', marca: 'Omo', tipo: 'Aseo', precio: 6990, stock: 9, stockMinimo: 5 },
]
