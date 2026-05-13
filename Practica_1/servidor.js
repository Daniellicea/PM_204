console.log("hola mundo js desde el servidor");




/*despues ejecutamoe node servidor.js en la crossOriginIsolated, recordar abrir desde la carpeta

/* promedio 2 varibales*/
let edad1 = 5;
let edad2 = 10;
let promedio = (edad1 + edad2) / 2;
console.log("El promedio es: " + promedio);
console.log((edad1 + edad2) / 2);

/*medir tiempo de procesos*/
console.time("proceso");
for (let i = 0; i < 1000000; i++) {
    // proceso pesado
}
console.timeEnd("proceso");


/*objetos tipo tabla*/
let usuarios = [
    { nombre: "Juan", edad: 25 },
    { nombre: "María", edad: 30 }
];