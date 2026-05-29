const readline = require("readline");
const cocina = require("./cocina");
const caja = require("./caja");
const cliente = require("./cliente");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function pregunta(texto) {
  return new Promise(function (resolve) {
    rl.question(texto, function (respuesta) {
      resolve(respuesta.trim());
    });
  });
}

async function menuPrincipal() {
  console.log("   SISTEMA CoofeCode");
  console.log("  1. Cocina (catalogo)");
  console.log("  2. Caja (pedidos)");
  console.log("  3. Cliente (menu y pedir)");
  console.log("  0. Salir");
  const opcion = await pregunta("Selecciona una opcion: ");
  switch (opcion) {
    case "1": await menuCocina(); break;
    case "2": await menuCaja(); break;
    case "3": await menuCliente(); break;
    case "0":
      console.log("Hasta luego!");
      rl.close();
      return;
    default:
      console.log("Opcion no valida.");
  }
  await menuPrincipal();
}

// ---- MENU COCINA ----
async function menuCocina() {
  console.log("   COCINA - Catalogo de productos");
  console.log("  1. Ver catalogo");
  console.log("  2. Agregar producto");
  console.log("  3. Actualizar producto");
  console.log("  4. Eliminar producto");
  console.log("  5. Cambiar disponibilidad");
  console.log("  0. Volver");
  console.log("----------------------------------------");
  const opcion = await pregunta("Selecciona una opcion: ");
  switch (opcion) {
    case "1":
      cocina.listarCatalogo();
      break;
    case "2": {
      const nombre = await pregunta("Nombre del producto: ");
      const categoria = await pregunta("Categoria: ");
      const precio = parseFloat(await pregunta("Precio: "));
      if (isNaN(precio)) {
        console.log("Precio no valido.");
      } else {
        cocina.agregarProducto(nombre, categoria, precio);
      }
      break;
    }
    case "3": {
      cocina.listarCatalogo();
      const id = parseInt(await pregunta("ID del producto a actualizar: "));
      if (isNaN(id)) { console.log("ID no valido."); break; }
      const producto = cocina.buscarProductoPorId(id);
      if (!producto) { console.log("Producto no encontrado."); break; }
      console.log("Producto actual: " + producto.nombre + " - $" + producto.precio.toFixed(2));
      const nuevoNombre = await pregunta("Nuevo nombre (enter para no cambiar): ");
      const nuevoPrecio = await pregunta("Nuevo precio (enter para no cambiar): ");
      const datos = {};
      if (nuevoNombre !== "") datos.nombre = nuevoNombre;
      if (nuevoPrecio !== "") {
        const p = parseFloat(nuevoPrecio);
        if (!isNaN(p)) datos.precio = p;
      }
      cocina.actualizarProducto(id, datos);
      break;
    }
    case "4": {
      cocina.listarCatalogo();
      const id = parseInt(await pregunta("ID del producto a eliminar: "));
      if (isNaN(id)) { console.log("ID no valido."); break; }
      cocina.eliminarProducto(id);
      break;
    }
    case "5": {
      cocina.listarCatalogo();
      const id = parseInt(await pregunta("ID del producto: "));
      if (isNaN(id)) { console.log("ID no valido."); break; }
      const estado = await pregunta("Disponible? (s/n): ");
      cocina.cambiarDisponibilidad(id, estado.toLowerCase() === "s");
      break;
    }
    case "0": return;
    default: console.log("Opcion no valida.");
  }
  await menuCocina();
}

// ---- MENU CAJA ----
async function menuCaja() {
  console.log("   CAJA - Gestion de pedidos");
  console.log("  1. Listar pedidos");
  console.log("  2. Total acumulado");
  console.log("  3. Agregar pedido manualmente");
  console.log("  4. Cambiar estado de pedido");
  console.log("  0. Volver");
  const opcion = await pregunta("Selecciona una opcion: ");
  switch (opcion) {
    case "1":
      caja.listarPedidos();
      break;
    case "2":
      caja.mostrarTotalAcumulado();
      break;
    case "3": {
      const nombreCliente = await pregunta("Nombre del cliente: ");
      const items = [];
      let agregando = true;
      cocina.listarCatalogo();
      while (agregando) {
        const idProd = parseInt(await pregunta("ID del producto (0 para terminar): "));
        if (idProd === 0 || isNaN(idProd)) {
          agregando = false;
        } else {
          const cant = parseInt(await pregunta("Cantidad: "));
          if (isNaN(cant) || cant <= 0) {
            console.log("Cantidad no valida.");
          } else {
            items.push({ productoId: idProd, cantidad: cant });
          }
        }
      }
      if (items.length > 0) {
        caja.agregarPedido(nombreCliente, items);
      } else {
        console.log("No se agrego ningun producto al pedido.");
      }
      break;
    }
    case "4": {
      caja.listarPedidos();
      const id = parseInt(await pregunta("ID del pedido: "));
      if (isNaN(id)) { console.log("ID no valido."); break; }
      console.log("Estados: Pendiente, Preparando, Listo, Entregado");
      const estado = await pregunta("Nuevo estado: ");
      caja.cambiarEstadoPedido(id, estado);
      break;
    }
    case "0": return;
    default: console.log("Opcion no valida.");
  }
  await menuCaja();
}

// ---- MENU CLIENTE ----
async function menuCliente() {
  console.log("   CLIENTE");
  console.log("  1. Ver menu");
  console.log("  2. Hacer pedido");
  console.log("  3. Ver estado de mi pedido");
  console.log("  0. Volver");
  const opcion = await pregunta("Selecciona una opcion: ");
  switch (opcion) {
    case "1":
      cliente.mostrarMenu();
      break;
    case "2": {
      cliente.mostrarMenu();
      const nombre = await pregunta("Tu nombre: ");
      const items = [];
      let agregando = true;
      while (agregando) {
        const idProd = parseInt(await pregunta("ID del producto (0 para terminar): "));
        if (idProd === 0 || isNaN(idProd)) {
          agregando = false;
        } else {
          const cant = parseInt(await pregunta("Cantidad: "));
          if (isNaN(cant) || cant <= 0) {
            console.log("Cantidad no valida.");
          } else {
            items.push({ productoId: idProd, cantidad: cant });
          }
        }
      }
      if (items.length > 0) {
        cliente.hacerPedido(nombre, items);
      } else {
        console.log("No seleccionaste ningun producto.");
      }
      break;
    }
    case "3": {
      const id = parseInt(await pregunta("Numero de pedido: "));
      if (isNaN(id)) { console.log("ID no valido."); break; }
      cliente.verEstadoPedido(id);
      break;
    }
    case "0": return;
    default: console.log("Opcion no valida.");
  }
  await menuCliente();
}

menuPrincipal();