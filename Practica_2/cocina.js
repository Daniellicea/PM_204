// cocina.js

const catalogo = [
  { id: 1, nombre: "Cafe Americano", categoria: "Bebidas Calientes", precio: 35.00, disponible: true },
  { id: 2, nombre: "Cappuccino", categoria: "Bebidas Calientes", precio: 55.00, disponible: true },
  { id: 3, nombre: "Latte", categoria: "Bebidas Calientes", precio: 50.00, disponible: true },
  { id: 4, nombre: "Mocha", categoria: "Bebidas Calientes", precio: 60.00, disponible: true },
  { id: 5, nombre: "Espresso", categoria: "Bebidas Calientes", precio: 30.00, disponible: true },
  { id: 6, nombre: "Frappe de Cafe", categoria: "Bebidas Frias", precio: 65.00, disponible: true },
  { id: 7, nombre: "Smoothie de Fresa", categoria: "Bebidas Frias", precio: 55.00, disponible: true },
  { id: 8, nombre: "Te Helado", categoria: "Bebidas Frias", precio: 40.00, disponible: true },
  { id: 9, nombre: "Croissant", categoria: "Panaderia", precio: 35.00, disponible: true },
  { id: 10, nombre: "Muffin de Arandano", categoria: "Panaderia", precio: 40.00, disponible: true },
  { id: 11, nombre: "Sandwich Club", categoria: "Comida", precio: 75.00, disponible: true },
  { id: 12, nombre: "Panini Caprese", categoria: "Comida", precio: 80.00, disponible: true },
];

let siguienteId = 13;

// CREATE
function agregarProducto(nombre, categoria, precio) {
  const nuevo = {
    id: siguienteId++,
    nombre,
    categoria,
    precio,
    disponible: true
  };

  catalogo.push(nuevo);
  return nuevo;
}

// READ
function listarCatalogo() {
  console.log("\nCATALOGO:");

  catalogo.forEach(p => {
    console.log(`[${p.id}] ${p.nombre} | ${p.categoria} | $${p.precio.toFixed(2)}`);
  });
}

// FIND
function buscarProductoPorId(id) {
  return catalogo.find(p => p.id === id);
}

// FILTER
function obtenerProductosDisponibles() {
  return catalogo.filter(p => p.disponible);
}

function buscarProductosPorCategoria(categoria) {
  return catalogo.filter(
    p => p.categoria.toLowerCase() === categoria.toLowerCase()
  );
}

// UPDATE
function actualizarProducto(id, datos) {
  const p = buscarProductoPorId(id);
  if (!p) return null;

  if (datos.nombre !== undefined) p.nombre = datos.nombre;
  if (datos.categoria !== undefined) p.categoria = datos.categoria;
  if (datos.precio !== undefined) p.precio = datos.precio;
  if (datos.disponible !== undefined) p.disponible = datos.disponible;

  return p;
}

// DELETE
function eliminarProducto(id) {
  const index = catalogo.findIndex(p => p.id === id);
  if (index === -1) return null;

  return catalogo.splice(index, 1)[0];
}

module.exports = {
  catalogo,
  agregarProducto,
  listarCatalogo,
  buscarProductoPorId,
  obtenerProductosDisponibles,
  buscarProductosPorCategoria,
  actualizarProducto,
  eliminarProducto
};