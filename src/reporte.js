const ventas = require('./datos');

const {
    totalVendido,
    unidadesVendidas,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia
} = require("./analitica");


console.log("=========================")
console.log("=== REPORTE DE VENTAS ===")
console.log("=========================")

const total = totalVendido(ventas)
const unidades = unidadesVendidas(ventas)
const totalCiudad = totalPorCiudad(ventas)
const unidadProducto = unidadesPorProducto(ventas)
const top = topProductosPorValor(ventas, 3)
const ventasDia = ventasDelDia(ventas, "2026-09-01")
const ventasSinDia = ventasDelDia(ventas, "2026-09-07")


console.log("\n--- RESUMEN GENERAL ---");
console.log(`Total vendido: $${total.toLocaleString("es-CO")}`);
console.log(`Unidades vendidas: ${unidades}`);

console.log("\n--- VENTAS POR CIUDAD ---");
Object.entries(totalCiudad).forEach(([ciudad, totall]) => {
    console.log(`${ciudad}: $${totall.toLocaleString("es-CO")}`);
})
console.log("\n--- UNIDADES POR PRODUCTO ---");
Object.entries(unidadProducto).forEach(([producto, unidad]) => {
    console.log(`${producto}: ${unidad} unidades`);
})
console.log("\n--- TOP 3 ---");
top.forEach(([producto, total], posicion) =>{
    console.log(`${posicion + 1} - ${producto}: $${total.toLocaleString("es-CO")}`);
})

console.log("\n--- Ventas del Día ---");
console.log(`ventas del día "2026-09-01": ${ventasDia.length}`);
console.log(`ventas del día "2026-09-07": ${ventasSinDia.length}`);
