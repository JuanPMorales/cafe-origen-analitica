const ventas = require('./datos');

const {
    totalVendido, totalVendidoM,
    unidadesVendidas, unidadesVendidasM,
    ventasPorCiudad, ventasPorCiudadM
} = require('./analitica');


const totalVendidoCiclo = totalVendido(ventas)
const totalVendidoMetodo  = totalVendidoM(ventas)
const unidadesVendidasCiclo = unidadesVendidas(ventas)
const unidadesVendidasMetodo = unidadesVendidasM(ventas)
const ventasPorCiudadCiclo = ventasPorCiudad(ventas, "Medellín")
const ventasPorCiudadMetodo = ventasPorCiudadM(ventas, "Medellín")

{
    const estado = totalVendidoCiclo === totalVendidoMetodo ? "OK" : "DIFERENTE";
    console.log("Total Vendido: ", estado);
}
{
    const estado = unidadesVendidasCiclo === unidadesVendidasMetodo ? "OK" : "DIFERENTE";
    console.log("unidades Vendidas: ", estado);
}
{
    const estado = ventasPorCiudadCiclo === ventasPorCiudadMetodo ? "OK" : "DIFERENTE";
    console.log("ventas por ciudad: ", estado);
    
    console.log("Resultado ciclo:", ventasPorCiudadCiclo);
    console.log("Resultado método:", ventasPorCiudadMetodo);
}

