const cocina = require("./cocina");
const caja = require("./caja");

const promociones = [
  "2x1 en Café Americano",
  "10% de descuento en Panadería",
  "Frappé gratis en compras mayores a $200"
];

// ================================
// MOSTRAR MENU
// ================================
function mostrarMenu() {

  console.log("\n===== MENU DELICIAS MEXICANAS =====");

  const productos = cocina.obtenerProductosDisponibles();

  const categorias = [
    ...new Set(
      productos.map(producto => producto.categoria)
    )
  ];

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
// PROMOCIONES
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
// VER ESTADO PEDIDO (ARREGLADO)
// ================================
function verEstadoPedido(id) {

  const pedido = caja.buscarPedido(id);

  if (pedido) {

    console.log(`\n=== Estado del Pedido #${pedido.id} ===`);
    console.log(`Cliente: ${pedido.cliente}`);
    console.log(`Estado actual: ${pedido.estado}`);

    // SOLO ESTO ES CORRECCIÓN (no inventar subtotal/iva)
    console.log(`Total: $${pedido.total.toFixed(2)}\n`);

  } else {

    console.log(`\nError: No se encontró el pedido con número #${id}.`);
  }
}

module.exports = {
  mostrarMenu,
  mostrarPromociones,
  hacerPedido,
  verEstadoPedido
};