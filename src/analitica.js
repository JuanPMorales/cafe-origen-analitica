const ventas = require('./datos');

const valorVenta = (ventas) => ventas.cantidad * ventas.precio;

function totalVendido(ventas) {
    let totalVentas = 0
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
