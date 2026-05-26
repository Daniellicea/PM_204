// ================================
// CAJA
// ================================

// Lista de pedidos en memoria
let pedidos = [];
let contadorId = 1;

// Importamos cocina para obtener precios de productos
const cocina = require("./cocina");

// Calcular subtotal a partir de items [{id, cantidad}]
function calcularSubtotal(items) {
  const productos = cocina.obtenerProductosDisponibles();
  let subtotal = 0;

  items.forEach(item => {
    const producto = productos.find(p => p.id === item.id);
    if (producto) {
      subtotal += producto.precio * item.cantidad;
    }
  });

  return subtotal;
}

// Agregar pedido
function agregarPedido(cliente, items) {
  const subtotal = calcularSubtotal(items);
  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  const pedido = {
    id: contadorId++,
    cliente,
    items,
    subtotal,
    iva,
    total,
    estado: "Recibido"
  };

  pedidos.push(pedido);
  return pedido;
}

// Buscar pedido por ID
function buscarPedido(id) {
  return pedidos.find(p => p.id === id);
}

// ================================
// EXPORTAR MODULO
// ================================
module.exports = {
  agregarPedido,
  buscarPedido
};
