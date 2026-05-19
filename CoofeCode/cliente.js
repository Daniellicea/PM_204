// CLIENTE - Delicias Mexicanas
// Todo en un solo archivo
//


const readline = require("readline");

// ================================
// PRODUCTOS
// ================================
const productos = [
  {
    id: 1,
    nombre: "Cafe Americano",
    precio: 45,
    categoria: "Bebidas"
  },
  {
    id: 2,
    nombre: "Capuccino",
    precio: 60,
    categoria: "Bebidas"
  },
  {
    id: 3,
    nombre: "Croissant",
    precio: 40,
    categoria: "Panaderia"
  },
  {
    id: 4,
    nombre: "Pan Dulce",
    precio: 25,
    categoria: "Panaderia"
  }
];

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

  // Obtener categorias usando map()
  const categorias = [
    ...new Set(
      productos.map(producto => producto.categoria)
    )
  ];

  // Mostrar categorias
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
// MOSTRAR PROMOCIONES
// ================================
function mostrarPromociones() {

  console.log("\n===== PROMOCIONES =====");

  promociones.forEach((promo, index) => {

    console.log(
      (index + 1) + ". " + promo
    );

  });

  console.log("========================");
}

// ================================
// MOSTRAR PRODUCTOS DISPONIBLES
// ================================
function mostrarProductosDisponibles() {

  console.log("\n===== PRODUCTOS DISPONIBLES =====");

  // Crear lista usando map()
  const lista = productos.map(producto => {

    return (
      producto.nombre +
      " - $" +
      producto.precio.toFixed(2)
    );

  });

  lista.forEach(producto => {

    console.log("- " + producto);

  });

  console.log("=================================");
}

// ================================
// MENU INTERACTIVO
// ================================
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ================================
// MENU PRINCIPAL
// ================================
function menuPrincipal() {

  console.log("\n====== DELICIAS MEXICANAS ======");
  console.log("1. Ver menu");
  console.log("2. Ver promociones");
  console.log("3. Ver productos disponibles");
  console.log("4. Salir");
  console.log("================================");

  rl.question("\nSelecciona una opcion: ", function(opcion) {

    switch(opcion) {

      case "1":
        mostrarMenu();
        volverMenu();
        break;

      case "2":
        mostrarPromociones();
        volverMenu();
        break;

      case "3":
        mostrarProductosDisponibles();
        volverMenu();
        break;

      case "4":
        console.log("\nGracias por visitar Delicias Mexicanas ");
        rl.close();
        break;

      default:
        console.log("\nOpcion invalida.");
        volverMenu();
        break;
    }

  });

}

// ================================
// VOLVER MENU
// ================================
function volverMenu() {

  rl.question(
    "\nPresiona ENTER para volver al menu...",
    function() {

      menuPrincipal();

    }
  );

}

// ================================
// INICIAR SISTEMA
// ================================
menuPrincipal();