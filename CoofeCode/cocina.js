// --- Catálogo de productos (array principal) ---
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

// Contador para IDs
let siguienteId = 13;

// CREATE - Agregar producto
function agregarProducto(nombre, categoria, precio) {
  const nuevoProducto = {
    id: siguienteId,
    nombre: nombre,
    categoria: categoria,
    precio: precio,
    disponible: true,
  };

  catalogo.push(nuevoProducto);

  console.log(
    `\nProducto agregado: "${nombre}" (ID: ${nuevoProducto.id}) - $${precio.toFixed(2)}`
  );

  siguienteId++;

  return nuevoProducto;
}

// READ - Listar productos
function listarCatalogo() {
  console.log("\n========== CATALOGO DE COCINA ==========\n");

  for (let i = 0; i < catalogo.length; i++) {
    const producto = catalogo[i];

    console.log(
      `[${producto.id}] ${producto.nombre} | ${producto.categoria} | $${producto.precio.toFixed(2)} | ${producto.disponible ? "Disponible" : "Agotado"}`
    );
  }
}

// Buscar producto por ID
function buscarProductoPorId(id) {
  for (let i = 0; i < catalogo.length; i++) {
    if (catalogo[i].id === id) {
      return catalogo[i];
    }
  }

  return null;
}

// Buscar productos por categoria
function buscarProductosPorCategoria(categoria) {
  const resultados = [];

  for (let i = 0; i < catalogo.length; i++) {
    if (
      catalogo[i].categoria.toLowerCase() === categoria.toLowerCase()
    ) {
      resultados.push(catalogo[i]);
    }
  }

  return resultados;
}

// UPDATE - Actualizar producto
function actualizarProducto(id, nuevosDatos) {
  const producto = buscarProductoPorId(id);

  if (!producto) {
    console.log(`\nError: No se encontro producto con ID ${id}`);
    return null;
  }

  if (nuevosDatos.nombre !== undefined) {
    producto.nombre = nuevosDatos.nombre;
  }

  if (nuevosDatos.categoria !== undefined) {
    producto.categoria = nuevosDatos.categoria;
  }

  if (nuevosDatos.precio !== undefined) {
    producto.precio = nuevosDatos.precio;
  }

  if (nuevosDatos.disponible !== undefined) {
    producto.disponible = nuevosDatos.disponible;
  }

  console.log(
    `\nProducto actualizado: [${id}] ${producto.nombre} - $${producto.precio.toFixed(2)}`
  );

  return producto;
}

// Cambiar disponibilidad
function cambiarDisponibilidad(id, disponible) {
  return actualizarProducto(id, { disponible: disponible });
}

// DELETE - Eliminar producto
function eliminarProducto(id) {
  for (let i = 0; i < catalogo.length; i++) {
    if (catalogo[i].id === id) {

      const eliminado = catalogo.splice(i, 1)[0];

      console.log(
        `\nProducto eliminado: "${eliminado.nombre}" (ID: ${id})`
      );

      return eliminado;
    }
  }

  console.log(`\nError: No se encontro producto con ID ${id}`);

  return null;
}

// Obtener productos disponibles
function obtenerProductosDisponibles() {
  const disponibles = [];

  for (let i = 0; i < catalogo.length; i++) {
    if (catalogo[i].disponible) {
      disponibles.push(catalogo[i]);
    }
  }

  return disponibles;
}

// --- Nuevas funciones usando filter() y find() ---

function buscarProductosBaratos() {
  // Retorna productos con precio menor a 50 usando filter()
  return catalogo.filter(producto => producto.precio < 50);
}

function buscarProductosCaros() {
  // Retorna productos con precio mayor o igual a 50 usando filter()
  return catalogo.filter(producto => producto.precio >= 50);
}

function buscarBebidas() {
  // Retorna productos cuya categoria incluya 'bebida' usando filter()
  return catalogo.filter(producto => producto.categoria.toLowerCase().includes('bebida'));
}

function buscarPostres() {
  // Retorna productos de panaderia o postres usando filter()
  return catalogo.filter(producto =>
    producto.categoria.toLowerCase() === 'panaderia' ||
    producto.categoria.toLowerCase() === 'postre'
  );
}

function encontrarPrimerPostre() {
  // Retorna el PRIMER postre/panaderia que encuentre usando find()
  return catalogo.find(producto =>
    producto.categoria.toLowerCase() === 'panaderia' ||
    producto.categoria.toLowerCase() === 'postre'
  );
}

// Exportar modulo
module.exports = {
  catalogo,
  agregarProducto,
  listarCatalogo,
  buscarProductoPorId,
  buscarProductosPorCategoria,
  actualizarProducto,
  cambiarDisponibilidad,
  eliminarProducto,
  obtenerProductosDisponibles,
  buscarProductosBaratos,
  buscarProductosCaros,
  buscarBebidas,
  buscarPostres,
  encontrarPrimerPostre
};

// INTERFAZ DE CONSOLA DINAMICA
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function imprimirResultados(resultados) {
  if (!resultados || resultados.length === 0) {
    console.log("No se encontraron productos.");
    return;
  }
  for (let i = 0; i < resultados.length; i++) {
    const producto = resultados[i];
    console.log(
      `[${producto.id}] ${producto.nombre} | ${producto.categoria} | $${producto.precio.toFixed(2)} | ${producto.disponible ? "Disponible" : "Agotado"}`
    );
  }
}

function mostrarMenu() {
  console.log("\n========== MENU ==========");
  console.log("1. Listar catalogo completo");
  console.log("2. Registrar nuevo producto (Consola)");
  console.log("3. Buscar productos baratos (< $50) [filter]");
  console.log("4. Buscar productos caros (>= $50) [filter]");
  console.log("5. Buscar bebidas [filter]");
  console.log("6. Buscar postres / panaderia [filter]");
  console.log("7. Encontrar el primer postre [find]");
  console.log("8. Salir");
  console.log("======================================\n");

  rl.question('Selecciona una opcion: ', (opcion) => {
    switch (opcion) {
      case '1':
        listarCatalogo();
        mostrarMenu();
        break;
      case '2':
        rl.question('Nombre del producto: ', (nombre) => {
          rl.question('Categoria: ', (categoria) => {
            rl.question('Precio: ', (precio) => {
              const precioNum = parseFloat(precio);
              if (!isNaN(precioNum)) {
                agregarProducto(nombre, categoria, precioNum);
              } else {
                console.log("\nError: El precio debe ser un numero.");
              }
              mostrarMenu();
            });
          });
        });
        break;
      case '3':
        console.log("\n--- Productos Baratos ---");
        imprimirResultados(buscarProductosBaratos());
        mostrarMenu();
        break;
      case '4':
        console.log("\n--- Productos Caros ---");
        imprimirResultados(buscarProductosCaros());
        mostrarMenu();
        break;
      case '5':
        console.log("\n--- Bebidas ---");
        imprimirResultados(buscarBebidas());
        mostrarMenu();
        break;
      case '6':
        console.log("\n--- Postres / Panaderia ---");
        imprimirResultados(buscarPostres());
        mostrarMenu();
        break;
      case '7':
        console.log("\n--- Primer Postre Encontrado ---");
        const postre = encontrarPrimerPostre();
        if (postre) {
          console.log(`[${postre.id}] ${postre.nombre} | ${postre.categoria} | $${postre.precio.toFixed(2)} | ${postre.disponible ? "Disponible" : "Agotado"}`);
        } else {
          console.log("No se encontro ningun postre.");
        }
        mostrarMenu();
        break;
      case '8':
        console.log("\nSaliendo del programa... ¡Hasta luego!");
        rl.close();
        break;
      default:
        console.log("\nOpcion no valida. Intenta de nuevo.");
        mostrarMenu();
        break;
    }
  });
}

// Iniciar el menu interactivo
mostrarMenu();