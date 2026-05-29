const cocina = require("./cocina");

const pedidos = [];
let siguientePedidoId = 1;
let totalAcumulado = 0;

function agregarPedido(nombreCliente, items) {

  if (!items || items.length === 0) {
    console.log("\nerror: El pedido debe tener al menos un producto.");
    return null;
  }

  const detalles = [];
  let totalPedido = 0;

  for (let i = 0; i < items.length; i++) {

    const producto = cocina.buscarProductoPorId(items[i].productoId);

    if (!producto) {
      console.log(`\nerror: Producto con ID ${items[i].productoId} no encontrado`);
      return null;
    }

    if (!producto.disponible) {
      console.log(`\nerror: "${producto.nombre}" no está disponible`);
      return null;
    }

    const cantidad = items[i].cantidad;
    const subtotal = producto.precio * cantidad;

    detalles.push({
      productoId: producto.id,
      nombre: producto.nombre,
      precioUnitario: producto.precio,
      cantidad: cantidad,
      subtotal: subtotal,
    });

    totalPedido += subtotal;
  }

  const nuevoPedido = {
    id: siguientePedidoId,
    cliente: nombreCliente,
    detalles: detalles,
    total: totalPedido,
    fecha: new Date().toLocaleString("es-MX"),
    estado: "Pendiente",
  };

  pedidos.push(nuevoPedido);
  siguientePedidoId++;
  totalAcumulado += totalPedido;

  console.log("\nPEDIDO REGISTRADO EN CAJA");
  console.log(`Pedido #${nuevoPedido.id}`);
  console.log(`Cliente: ${nuevoPedido.cliente}`);
  console.log(`Fecha: ${nuevoPedido.fecha}`);

  for (let d = 0; d < detalles.length; d++) {
    console.log(
      `${detalles[d].cantidad}x ${detalles[d].nombre.padEnd(22)} $${detalles[d].subtotal.toFixed(2).padStart(7)}`
    );
  }

  console.log(`TOTAL: $${nuevoPedido.total.toFixed(2)}`);

  return nuevoPedido;
}

function listarPedidos() {

  console.log("LISTA DE PEDIDOS - CoofeCode");

  if (pedidos.length === 0) {
    console.log("No hay pedidos registrados.\n");
    return;
  }

  for (let p = 0; p < pedidos.length; p++) {

    const pedido = pedidos[p];

    console.log(`\nCliente: ${pedido.cliente}`);
    console.log(`Fecha: ${pedido.fecha}`);
    console.log(`Estado: ${pedido.estado}`);

    for (let d = 0; d < pedido.detalles.length; d++) {
      const det = pedido.detalles[d];

      console.log(
        `${det.cantidad}x ${det.nombre.padEnd(20)} $${det.subtotal.toFixed(2).padStart(7)}`
      );
    }

    console.log(`Total: $${pedido.total.toFixed(2)}`);
  }
}

function mostrarTotalAcumulado() {
  console.log("TOTAL ACUMULADO - CoofeCode");
  console.log(`Pedidos: ${pedidos.length}`);
  console.log(`Ventas: $${totalAcumulado.toFixed(2)}`);
}

function cambiarEstadoPedido(pedidoId, nuevoEstado) {

  for (let i = 0; i < pedidos.length; i++) {
    if (pedidos[i].id === pedidoId) {
      pedidos[i].estado = nuevoEstado;
      console.log(`Pedido #${pedidoId} → Estado: ${nuevoEstado}`);
      return pedidos[i];
    }
  }

  console.log(`error: No se encontró pedido con ID ${pedidoId}`);
  return null;
}

function buscarPedido(pedidoId) {
  for (let i = 0; i < pedidos.length; i++) {
    if (pedidos[i].id === pedidoId) {
      return pedidos[i];
    }
  }
  return null;
}

module.exports = {
  pedidos,
  agregarPedido,
  listarPedidos,
  mostrarTotalAcumulado,
  cambiarEstadoPedido,
  buscarPedido
};