//   CLIENTE - CoofeCode

// --- Módulo Cocina ---
const cocina = {
  productos: [
    { id: 1, nombre: "Café Americano", precio: 25.00, categoria: "Bebidas Calientes" },
    { id: 2, nombre: "Capuchino", precio: 35.00, categoria: "Bebidas Calientes" },
    { id: 3, nombre: "Pan Dulce", precio: 15.00, categoria: "Panadería" },
    { id: 4, nombre: "Sandwich", precio: 40.00, categoria: "Comida" },
    { id: 5, nombre: "Frappé", precio: 45.00, categoria: "Bebidas Frías" }
  ],

  obtenerProductosDisponibles() {
    return this.productos;
  },

  buscarProductoPorId(id) {
    return this.productos.find(p => p.id === id);
  }
};

// --- Módulo Caja ---
const caja = {
  pedidos: [],
  contador: 1,

  agregarPedido(nombreCliente, itemsPedido) {
    let total = 0;
    for (const item of itemsPedido) {
      const producto = cocina.buscarProductoPorId(item.productoId);
      if (producto) {
        total += producto.precio * item.cantidad;
      }
    }
    const pedido = {
      id: this.contador++,
      cliente: nombreCliente,
      items: itemsPedido,
      total,
      estado: "Pendiente"
    };
    this.pedidos.push(pedido);
    return pedido;
  },

  buscarPedido(pedidoId) {
    return this.pedidos.find(p => p.id === pedidoId);
  }
};

// --- Cliente ---
function mostrarMenu() {
  const productos = cocina.obtenerProductosDisponibles();
  console.log("\n===== MENÚ COOFECODE =====");
  const categorias = [...new Set(productos.map(p => p.categoria))];

  for (const cat of categorias) {
    console.log(`\n${cat.toUpperCase()}`);
    const items = productos.filter(p => p.categoria === cat);
    for (const item of items) {
      console.log(`[${item.id}] ${item.nombre} - $${item.precio.toFixed(2)}`);
    }
  }
}

function hacerPedido(nombreCliente, itemsPedido) {
  console.log(`\nCliente: ${nombreCliente}`);
  const pedido = caja.agregarPedido(nombreCliente, itemsPedido);
  console.log("Pedido realizado con éxito!");
  return pedido;
}

function verEstadoPedido(pedidoId) {
  const pedido = caja.buscarPedido(pedidoId);
  if (!pedido) {
    console.log(`No se encontró el pedido #${pedidoId}`);
    return;
  }
  console.log(`\nPedido #${pedido.id} - Estado: ${pedido.estado}`);
  console.log(`Total: $${pedido.total.toFixed(2)}`);
}

// --- Ejemplos de uso ---
mostrarMenu();

const pedido1 = hacerPedido("Alberto", [
  { productoId: 1, cantidad: 2 },
  { productoId: 3, cantidad: 1 }
]);

verEstadoPedido(pedido1.id);
