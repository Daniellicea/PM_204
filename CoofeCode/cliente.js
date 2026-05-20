const cocina = require("./cocina");
const caja = require("./caja");

// ================================
// PROMOCIONES
// ================================
const promociones = [
  "2x1 en Cafe Americano",
  "10% de descuento en pan dulce",
  "Combo cafe + croissant por $85"
];

// ================================
// MOSTRAR MENU
// ================================
function mostrarMenu() {
  console.log("\n===== MENU DELICIAS MEXICANAS =====");

  const productos = cocina.obtenerProductosDisponibles();

  // Obtener categorias usando map() y Set
  const categorias = [
    ...new Set(
      productos.map(producto => producto.categoria)
    )
  ];

  // Mostrar categorias
  categorias.forEach(categoria => {
    console.log("\n" + categoria.toUpperCase());
    
    const productosCategoria = productos.filter(
      producto => producto.categoria === categoria
    );

    productosCategoria.forEach(producto => {
      console.log(
        "[" + producto.id + "] " +
        producto.nombre +
        " - $" +
        producto.precio.toFixed(2)
      );
    });
  });

  console.log("\n==================================");
}

// ================================
// MOSTRAR PROMOCIONES
// ================================
function mostrarPromociones() {
  console.log("\n===== PROMOCIONES =====");
  promociones.forEach((promo, index) => {
    console.log((index + 1) + ". " + promo);
  });
  console.log("========================");
}

// ================================
// HACER PEDIDO
// ================================
function hacerPedido(nombre, items) {
  return caja.agregarPedido(nombre, items);
}

// ================================
// VER ESTADO PEDIDO
// ================================
function verEstadoPedido(id) {
  const pedido = caja.buscarPedido(id);
  if (pedido) {
    console.log(`\n=== Estado del Pedido #${pedido.id} ===`);
    console.log(`Cliente: ${pedido.cliente}`);
    console.log(`Estado actual: ${pedido.estado}`);
    console.log(`Subtotal: $${(pedido.subtotal || 0).toFixed(2)}`);
    console.log(`IVA (16%): $${(pedido.iva || 0).toFixed(2)}`);
    console.log(`Total: $${pedido.total.toFixed(2)}\n`);
  } else {
    console.log(`\nError: No se encontró el pedido con número #${id}.`);
  }
}

// ================================
// EXPORTAR MODULO
// ================================
module.exports = {
  mostrarMenu,
  mostrarPromociones,
  hacerPedido,
  verEstadoPedido
};