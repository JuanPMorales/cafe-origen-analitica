const ventas = require('./datos');

const {
    totalVendido, totalVendidoM,
    unidadesVendidas, unidadesVendidasM,
    ventasPorCiudad, ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor
} = require('./analitica');


const totalVendidoCiclo = totalVendido(ventas)
const totalVendidoMetodo  = totalVendidoM(ventas)
const unidadesVendidasCiclo = unidadesVendidas(ventas)
const unidadesVendidasMetodo = unidadesVendidasM(ventas)
const ventasPorCiudadCiclo = ventasPorCiudad(ventas, "Medellín")
const ventasPorCiudadMetodo = ventasPorCiudadM(ventas, "Medellín")
const totalesCiudades = totalPorCiudad(ventas);
const unidadesProductos = unidadesPorProducto(ventas);
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

const ciudadesCorrectas = ["medellín", "bogotá", "cali", "pereira"].every(ciudad => ciudad in totalesCiudades);
console.log("Total por ciudad:", ciudadesCorrectas ? "OK" : "DIFERENTE");

const sumaUnidades = Object.values(unidadesProductos)
    .reduce((acc, cantidad) => acc + cantidad, 0);

const productosCorrectos = sumaUnidades === unidadesVendidas(ventas);

console.log("Unidades por producto:", productosCorrectos ? "OK" : "DIFERENTE");




const top = topProductosPorValor(ventas, 3)

const cantidadCorrecta = top.length === 3
const ordenCorrecto = top[0][1] >= top[1][1] && top[1][1] >= top[2][1]

console.log("Cantidad:", cantidadCorrecta ? "OK" : "DIFERENTE");
console.log("Orden:", ordenCorrecto ? "OK" : "DIFERENTE");


