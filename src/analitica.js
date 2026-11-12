const ventas = require('./datos');

const normalizacion = texto => texto.trim().toLowerCase()

const valorVenta = (ventas) => ventas.cantidad * ventas.precio;

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
    for (const v of ventas) totalVentas += valorVenta(v)
    return totalVentas;
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

console.log("===", valorVenta(ventas))
console.log(totalVendido(ventas));
console.log(unidadesVendidas(ventas));
console.log(ventaMayor(ventas));