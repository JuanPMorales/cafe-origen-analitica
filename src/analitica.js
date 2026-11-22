const ventas = require('./datos');

const valorVenta = (venta) => venta.cantidad * venta.precio;

// function valorVenta(ventas){
//     let totalVenta = 0 
//     for(const v of ventas){
//         totalVenta += v.cantidad * v.precio
//     }
// 
//     return totalVenta
// } 

function totalVendido(ventas) {
    let total = 0
    for (const v of ventas) {
        total += valorVenta(v)
    }

    return total;
}


function unidadesVendidas(ventas){
    let totalUnidades = 0;
    for(const v of ventas){
        if (v.cantidad > 0) {
            totalUnidades += v.cantidad;
        }
    }

    return totalUnidades;
}

function ventaMayor(ventas){
    if (ventas.length === 0){
        return null
    }

    let mayor = ventas[0]
    for (const v of ventas){
        if(valorVenta(v) > valorVenta(mayor))
            mayor = v
    } 

    return mayor
}

// ticket Promedio 
function ticketPromedio(ventas) {
    let total = 0;
    let cantidadVentas = 0;

    // Se utiliza for, para recorrer cada venta de la tabla y que las cantidad de la venta sea mayor a 0
    for (const v of ventas) {
        if (v.cantidad > 0) {
            total += valorVenta(v);
            cantidadVentas++;
        }
    }

    if (cantidadVentas === 0) {
        return 0;
    }

    return total / cantidadVentas;
}

// Ventas por ciudad
const normalizacion = (texto) => texto.trim().toLowerCase()

function ventasPorCiudad(ventas, ciudad) {
    let total = 0

    for(const v of ventas){
        if(normalizacion(v.ciudad) === normalizacion(ciudad)){
            total += valorVenta(v)
        }
    }
    return total
}

// Pruebas con arreglo completo, un elemento y arreglo vacío.
// Decisiones para un arreglo vacío:
// - totalVendido, unidadesVendidas, ticketPromedio y ventasPorCiudad devuelven 0.
// - ventaMayor devuelve null porque no existe una venta mayor.
const unaVenta = [ventas[0]];
const sinVentas = [];

console.log("\nPruebas con totalVendido:");
console.log("Completo:", totalVendido(ventas));
console.log("Un elemento:", totalVendido(unaVenta));
console.log("Vacío:", totalVendido(sinVentas));

console.log("\nPruebas con unidadesVendidas:");
console.log("Completo:", unidadesVendidas(ventas));
console.log("Un elemento:", unidadesVendidas(unaVenta));
console.log("Vacío:", unidadesVendidas(sinVentas));

console.log("\nPruebas con ventaMayor:");
console.log("Completo:", ventaMayor(ventas));
console.log("Un elemento:", ventaMayor(unaVenta));
console.log("Vacío:", ventaMayor(sinVentas));

console.log("\nPruebas con ticketPromedio:");
console.log("Completo:", ticketPromedio(ventas));
console.log("Un elemento:", ticketPromedio(unaVenta));
console.log("Vacío:", ticketPromedio(sinVentas));

console.log("\nPruebas con ventasPorCiudad:");
console.log("Completo:", ventasPorCiudad(ventas, "Medellín"));
console.log("Un elemento:", ventasPorCiudad(unaVenta, "Medellín"));
console.log("Vacío:", ventasPorCiudad(sinVentas, "Medellín"));


function totalVendidoM(ventas){
    return ventas.reduce((acc, v) => acc + valorVenta(v), 0);
}

function unidadesVendidasM(ventas){
    return ventas.reduce((acc, v) => acc + (v.cantidad > 0 ? v.cantidad : 0), 0)
}

function ventasPorCiudadM(ventas, ciudad){
    return ventas
        .filter((v) => normalizacion(v.ciudad) === normalizacion(ciudad))
        .reduce((acc, v) => acc + valorVenta(v), 0)
}

function totalPorCiudad(ventas){
    return ventas.reduce((acc, v) => {
        const ciudad = normalizacion(v.ciudad);
        acc[ciudad] = (acc[ciudad] || 0) + valorVenta(v);
        return acc;
    }, {});
}

console.log("Total por Ciudad",totalPorCiudad(ventas));

function unidadesPorProducto(ventas) {
    return ventas.reduce((acc, v) => {
        const producto = normalizacion(v.producto)
        // Acumula la cantidad vendida de cada producto en el acumulador.
        acc[producto] = (acc[producto] || 0) + v.cantidad;
        return acc 
    }, {})
}

console.log("unidades Por Producto: ", unidadesPorProducto(ventas));

function topProductosPorValor(ventas, k){
    const totales =  ventas.reduce((acc, v) => {
        const producto = normalizacion(v.producto)
        acc[producto] = (acc[producto] || 0) + valorVenta(v);
        return acc
    }, {})

    const productos =  Object.entries(totales)
    const ordenados = [...productos].sort((a, b) => b[1] - a[1]);
    const top = ordenados.slice(0, k)

    return top
}
console.log(topProductosPorValor(ventas, 3));

function ventasDelDia(ventas, fecha) {
    return ventas.filter((v) => v.fecha === fecha)
}


function totalCiudadCadena(ventas, ciudad) {
    return ventas.map(c => ({...c,ciudad: normalizacion(c.ciudad)}))
    .filter(v => v.ciudad === normalizacion(ciudad))
    .map(valor => valorVenta(valor))
    .reduce((acc, v) => acc + v, 0)
}


console.log(`Total de medellín: ${totalCiudadCadena(ventas, "Medellín")}`);

function totalCiudadUnaPasada(ventas, ciudad) {
    let total = 0
    for(const v of ventas){
        if(normalizacion(v.ciudad) === normalizacion(ciudad)){
            total += valorVenta(v) 
        }
    }

    return total
}

console.log(`total Ciudad una pasada: ${totalCiudadUnaPasada(ventas, "Medellín")}`)


module.exports = {
    totalVendido, totalVendidoM,
    unidadesVendidas, unidadesVendidasM,
    ventasPorCiudad, ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia,
    ticketPromedio,
    normalizacion,
    valorVenta,
    totalCiudadCadena,
    totalCiudadUnaPasada,
};