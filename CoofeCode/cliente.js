// CLIENTE - CoofeCode
// Modulo de cliente: muestra menu y hace pedidos
// Usa: funciones, arrays

const cocina = require("./cocina");
const caja = require("./caja");

// Mostrar menu en consola
function mostrarMenu() {
  const productos = cocina.obtenerProductosDisponibles();

  console.log("\n===== MENU COOFECODE =====");

  // Agrupar por categoria
  const categorias = [];
  for (let i = 0; i < productos.length; i++) {
    if (categorias.indexOf(productos[i].categoria) === -1) {
      categorias.push(productos[i].categoria);
    }
  }

  for (let c = 0; c < categorias.length; c++) {
    console.log("\n" + categorias[c].toUpperCase());
    for (let i = 0; i < productos.length; i++) {
      if (productos[i].categoria === categorias[c]) {
        console.log("[" + productos[i].id + "] " + productos[i].nombre + " - $" + productos[i].precio.toFixed(2));
      }
    }
  }

  console.log("\n==========================");
}

// Hacer pedido a caja
function hacerPedido(nombreCliente, itemsPedido) {
  console.log("\nCliente: " + nombreCliente);

  if (!itemsPedido || itemsPedido.length === 0) {
    console.log("No seleccionaste ningun producto.");
    return null;
  }

  // Mostrar resumen
  console.log("Resumen de tu pedido:");
  for (let i = 0; i < itemsPedido.length; i++) {
    const producto = cocina.buscarProductoPorId(itemsPedido[i].productoId);
    if (producto) {
      console.log("  " + itemsPedido[i].cantidad + "x " + producto.nombre + " - $" + (producto.precio * itemsPedido[i].cantidad).toFixed(2));
    }
  }

  // Enviar pedido a caja
  const pedido = caja.agregarPedido(nombreCliente, itemsPedido);
  return pedido;
}

// Ver estado de un pedido
function verEstadoPedido(pedidoId) {
  const pedido = caja.buscarPedido(pedidoId);

  if (!pedido) {
    console.log("No se encontro el pedido #" + pedidoId);
    return null;
  }

  console.log("\nPedido #" + pedido.id + " - Estado: " + pedido.estado);
  console.log("Total: $" + pedido.total.toFixed(2));
  return pedido;
}

// Exportar modulo
module.exports = {
  mostrarMenu,
  hacerPedido,
  verEstadoPedido,
};
