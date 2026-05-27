
//  Módulo de caja: gestión de pedidos y totales
//  Usa: let, const, funciones, arrays


const cocina = require("./cocina");

// Almacén de pedidos
const pedidos = [];

// Contador para pedidos
let siguientePedidoId = 1;

// ttal acumulado de ventas
let totalAcumulado = 0;

//  Función de Agregar Pedido
function agregarPedido(nombreCliente, items) {
  // Validar que haya items
  if (!items || items.length === 0) {
    console.log("\n  error: El pedido debe tener al menos un producto.");
    return null;
  }

  // Construir los detalles del pedido
  const detalles = [];

  for (let i = 0; i < items.length; i++) {
    const producto = cocina.buscarProductoPorId(items[i].productoId);

    if (!producto) {
      console.log(`\n  error: Producto con ID ${items[i].productoId} no encontrado`);
      return null;
    }

    if (!producto.disponible) {
      console.log(`\n  error: "${producto.nombre}" no está disponible`);
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
  }

  // Calcular subtotal, IVA y total usando reduce y destructuring
  const subtotalPedido = detalles.reduce((acc, { subtotal }) => acc + subtotal, 0);
  const ivaPedido = subtotalPedido * 0.16; // IVA del 16%
  const totalPedido = subtotalPedido + ivaPedido;

  // Crear el pedido
  const nuevoPedido = {
    id: siguientePedidoId,
    cliente: nombreCliente,
    detalles: detalles,
    subtotal: subtotalPedido,
    iva: ivaPedido,
    total: totalPedido,
    fecha: new Date().toLocaleString("es-MX"),
    estado: "Pendiente",
  };

  pedidos.push(nuevoPedido);
  siguientePedidoId++;

  // Sumar al total acumulado
  totalAcumulado += totalPedido;


  console.log("                PEDIDO REGISTRADO EN CAJA              ");

  console.log(`   Pedido #${nuevoPedido.id}`);
  console.log(`   Cliente: ${nuevoPedido.cliente}`);
  console.log(`   Fecha:   ${nuevoPedido.fecha}`);
  

  for (let d = 0; d < detalles.length; d++) {
    console.log(`${detalles[d].cantidad}x ${detalles[d].nombre.padEnd(22)} $${detalles[d].subtotal.toFixed(2).padStart(7)}`);
  }

  console.log(`SUBTOTAL: $${nuevoPedido.subtotal.toFixed(2)}`);
  console.log(`IVA (16%): $${nuevoPedido.iva.toFixed(2)}`);
  console.log(`TOTAL: $${nuevoPedido.total.toFixed(2)}`);

  // Cambiar estado a Preparando
  cambiarEstadoPedido(nuevoPedido.id, "Preparando");

  // Comunicación con cocina mediante Callbacks
  cocina.prepararPedido(nuevoPedido.id, (error, mensajeExito) => {
    if (error) {
      console.log(`\n ALERTA DE COCINA: ${error}`);
      cambiarEstadoPedido(nuevoPedido.id, "Cancelado");
    } else {
      console.log(`\n NOTIFICACIÓN DE COCINA: ${mensajeExito}`);
      cambiarEstadoPedido(nuevoPedido.id, "Listo");
    }
  });

  return nuevoPedido;
}


//  Función: Listar Pedidos
function listarPedidos() {
  console.log("              LISTA DE PEDIDOS - CoofeCode            ");

  if (pedidos.length === 0) {
    console.log("     No hay pedidos registrados.\n");
    return;
  }

  for (let p = 0; p < pedidos.length; p++) {
    const pedido = pedidos[p];
    const estadoIcono = pedido.estado === "Pendiente" ?  
                         pedido.estado === "Preparando" ?  
                         pedido.estado === "Listo" ?  
                         "" : "" : "" : "";

    console.log(`  Cliente: ${pedido.cliente}`);
    console.log(`  Fecha:   ${pedido.fecha}`);
    console.log(`  Estado:  ${estadoIcono} ${pedido.estado}`);
    console.log("  Productos:");

    for (let d = 0; d < pedido.detalles.length; d++) {
      const det = pedido.detalles[d];
      console.log(`  ${det.cantidad}x ${det.nombre.padEnd(20)} $${det.subtotal.toFixed(2).padStart(7)}`);
    }

    console.log(`Subtotal: $${(pedido.subtotal || 0).toFixed(2)}`);
    console.log(`IVA (16%): $${(pedido.iva || 0).toFixed(2)}`);
    console.log(`Total: $${pedido.total.toFixed(2)}\n`);
  }
}


//  Función: Total Acumulado
function mostrarTotalAcumulado() {
  console.log("TOTAL ACUMULADO - CoofeCode             ");
  console.log(`  `);
  console.log(`Total de pedidos:  ${pedidos.length}`);
  console.log(`Ventas acumuladas: $${totalAcumulado.toFixed(2)}`);
  console.log(`  `);
  return totalAcumulado;
}


//  Función para ambiar estado de pedido
function cambiarEstadoPedido(pedidoId, nuevoEstado) {
  for (let i = 0; i < pedidos.length; i++) {
    if (pedidos[i].id === pedidoId) {
      pedidos[i].estado = nuevoEstado;
      console.log(`\n  Pedido #${pedidoId} → Estado: ${nuevoEstado}`);
      return pedidos[i];
    }
  }
  console.log(`\n  rror: No se encontró pedido con ID ${pedidoId}`);
  return null;
}

//  Función auxiliar: Buscar pedido por ID
function buscarPedido(pedidoId) {
  for (let i = 0; i < pedidos.length; i++) {
    if (pedidos[i].id === pedidoId) {
      return pedidos[i];
    }
  }
  return null;
}

//  Función: Calcular Compra (subtotal, IVA y total)
//  Usa: reduce() con destructuring, IVA del 16%
function calcularCompra(productos) {
  // Validar que haya productos
  if (!productos || productos.length === 0) {
    console.log("\n  error: La compra debe tener al menos un producto.");
    return null;
  }

  // Calcular subtotal usando reduce() con destructuring
  const subtotal = productos.reduce((acumulador, { nombre, precio, cantidad }) => {
    // Validar que el producto tenga datos válidos
    if (!nombre || precio <= 0 || cantidad <= 0) {
      console.log(`\n  error: Producto inválido → ${nombre || "sin nombre"}`);
      return acumulador;
    }

    const subtotalProducto = precio * cantidad;
    console.log(`  ${cantidad}x ${nombre.padEnd(22)} $${subtotalProducto.toFixed(2).padStart(7)}`);
    return acumulador + subtotalProducto;
  }, 0);

  // Calcular IVA (16%)
  const iva = subtotal * 0.16;

  // Calcular total
  const total = subtotal + iva;

  // Mostrar resumen
  console.log("              TICKET DE COMPRA - CoofeCode             ");
  console.log(`         Subtotal:  $${subtotal.toFixed(2)}`);
  console.log(`         IVA (16%): $${iva.toFixed(2)}`);
  console.log(`         TOTAL:     $${total.toFixed(2)}`);

  // Retornar objeto con subtotal, iva y total
  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    iva: parseFloat(iva.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
  };
}

//  Exportar 
module.exports = {
  pedidos,
  agregarPedido,
  listarPedidos,
  mostrarTotalAcumulado,
  cambiarEstadoPedido,
  buscarPedido,
  calcularCompra,
};
