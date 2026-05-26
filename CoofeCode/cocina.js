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

// --- Callbacks: Comunicación con Caja ---
function prepararPedido(pedidoId, callback) {
  // Primera parte: mostrar que se está preparando
  console.log(`\n [Cocina] Se está preparando el pedido #${pedidoId}...`);
  
  // Simulamos tiempo de preparación
  setTimeout(() => {
    const aleatorio = Math.random();
    
    if (aleatorio < 0.6) {
      // Éxito: sin error, enviamos el mensaje de éxito (ya está)
      callback(null, `El pedido #${pedidoId} ya está listo.`);
    } else {
      // Error: pasamos el error al callback (le falta / cancelado)
      callback(`El pedido #${pedidoId} fue cancelado (le falta producto/ingredientes o hubo error de cocina).`);
    }
  }, 4000); // 4 segundos de espera
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
  encontrarPrimerPostre,
  prepararPedido
};

