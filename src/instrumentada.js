const {generarVentas} = require('./generador');

const {
    valorVenta,
    normalizacion
} = require('./analitica')


const contador = { 
    ops: 0
}

function totalVendido(ventas, contador){
    let total = 0
    for (const v of ventas) {
        contador.ops++; 
        total += valorVenta(v)
    }
    return total;
}

console.log("Total vendido: ", totalVendido(generarVentas(10), contador));
console.log("Operaciones realizadas: ", contador.ops);

function ventaMayor(ventas, contador){
    let mayor = 0;
    for (const v of ventas) {
        contador.ops++;
        if (valorVenta(v) > mayor) {
            mayor = valorVenta(v);
        }
    }
    return mayor;
}

console.log("Venta mayor: ", ventaMayor(generarVentas(10), contador));
console.log("Operaciones realizadas: ", contador.ops);

function totalPorCiudad(ventas, contador){
    return ventas.reduce((acc, v) => {
            const ciudad = normalizacion(v.ciudad);
            contador.ops++;
            acc[ciudad] = (acc[ciudad] || 0) + valorVenta(v);
            return acc;
        }, {});
}

console.log("Total por ciudad: ", totalPorCiudad(generarVentas(10), contador));
console.log("Operaciones realizadas: ", contador.ops);



function primeraVenta(ventas, contador){
    contador.ops++

    return ventas[0]
}

console.log("Operaciones", contador.ops);


module.exports = {
    totalVendido,
    ventaMayor,
    totalPorCiudad,
    primeraVenta
}