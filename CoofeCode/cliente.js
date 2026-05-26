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

  const categorias = [...new Set(productos.map(p => p.categoria))];

  categorias.forEach(categoria => {
    console.log("\n" + categoria.toUpperCase());
    const productosCategoria = productos.filter(p => p.categoria === categoria);

    productosCategoria.forEach(producto => {
      console.log(`[${producto.id}] ${producto.nombre} - $${producto.precio.toFixed(2)}`);
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
// HACER PEDIDO CON ESTADOS
// ================================
function hacerPedido(nombre, items) {
  const pedido = caja.agregarPedido(nombre, items);

  if (!pedido) {
    console.log("Error al crear pedido.");
    return;
  }

  console.log(`\nPedido #${pedido.id} recibido para ${pedido.cliente}.`);

  // Flujo asincrónico de estados
  setTimeout(() => {
    pedido.estado = "Preparando";
    verEstadoPedido(pedido.id);
  }, 2000);

  setTimeout(() => {
    pedido.estado = "Empacando";
    verEstadoPedido(pedido.id);
  }, 4000);

  setTimeout(() => {
    // Aquí decides si se entrega o se cancela
    const entregado = Math.random() > 0.2; // 80% entregado, 20% cancelado
    pedido.estado = entregado ? "Entregado" : "Cancelado";
    verEstadoPedido(pedido.id);
  }, 6000);

  return pedido;
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
