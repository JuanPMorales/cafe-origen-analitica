const ventasReales = require('./datos.js');
const { generarVentas } = require('./generador.js');
const catalogo = require('./catalogo.js')

const {
    totalVendido,
    unidadesVendidas,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia
} = require("./analitica");

const {
    clientesRecurrentesSet,
    comboRegalo,
    productoEstrellaPorCiudad,
    primerClienteUnico, 
    mejorSemana,
    parMasCercano
} = require('./optimizadas.js')

const ventasDiarias = [
    320, 410, 280, 390, 510, 620, 700, 300, 290, 450,
    480, 530, 610, 680, 350, 330, 420, 470, 560, 640,
    710, 380, 360, 440, 500, 590, 650, 720, 400, 370
];


const moneda = valor => `$${valor.toLocaleString("es-CO")}`

function generarReporte(ventas) {
    const recurrentes = clientesRecurrentesSet(ventas);
    const combo = comboRegalo(catalogo, 87000);
    const estrellas = productoEstrellaPorCiudad(ventas);
    const clienteUnico = primerClienteUnico(ventas);
    const semana = mejorSemana(ventasDiarias, 7);
    const presupuestos = [100000, 140000, 40000];

    const reporte = [
        {
            categoria: "Resumen general",
            descripcion: "total vendido",
            resultado: moneda(totalVendido(ventas))
        },
        {
            categoria: "Resumen general",
            descripcion: "Unidades Vendidas",
            resultado: unidadesVendidas(ventas)
        },
         ...Object.entries(totalPorCiudad(ventas)).map(([ciudad, total]) => ({
            categoria: "Ventas por ciudad",
            descripcion: ciudad,
            resultado: moneda(total)
        })),
        ...Object.entries(unidadesPorProducto(ventas)).map(([producto,unidades ]) => ({
            categoria: "Unidades por producto",
            descripcion: producto,
            resultado: unidades
        })),
        ...topProductosPorValor(ventas, 3).map(([producto,total], i) => ({
            categoria: "Top 3",
            descripcion: `${ i + 1} - ${producto}`,
            resultado: moneda(total)

        })),
        ...["2026-09-01", "2026-09-07"].map(fecha => ({
            categoria: "Ventas del día",
            descripcion: fecha,
            resultado: ventasDelDia(ventas, fecha).length
        })),
        {
        categoria: "Clientes recurrentes",
        descripcion: "Clientes",
        resultado: recurrentes.join(", ")
        },
        ...[...estrellas].map(([ciudad, producto]) => ({
            categoria: "Producto estrella",
            descripcion: ciudad,
            resultado: producto
        })),
        {
            categoria: "Combo regalo",
            descripcion: moneda(87000),
            resultado: combo
                ? combo.map(p => p.producto).join(" + ")
                : "Sin solución"
        },
        ...presupuestos.map(presupuesto => {
            const par = parMasCercano(catalogo, presupuesto);
            return {
                categoria: "Par más cercano",
                descripcion: moneda(presupuesto),
                resultado: par
                    ? par.map(p => p.producto).join(" + ")
                    : "Sin solución"
            };
        }),
        {
            categoria: "Cliente para cupon",
            descripcion: "Primer cliente",
            resultado: clienteUnico ?? "Sin resultado"
        },
        {
            categoria: "Mejor semana",
            descripcion: "Día de inicio",
            resultado: semana.diaInicio
        },
        {
            categoria: "Mejor semana",
            descripcion: "Total vendido",
            resultado: moneda(semana.total * 1000)
        },
    ];

    return reporte;
}

console.log("========== REPORTE DE VENTAS DATOS REALES ==========");
console.table(generarReporte(ventasReales));

console.log("========== REPORTE DE VENTAS DATOS GENERADOS ==========");
console.table(generarReporte(generarVentas(40)))


// version v0.1: 

function generarReporte01(ventas){
    const total = totalVendido(ventas)
    const unidades = unidadesVendidas(ventas)
    const totalCiudad = totalPorCiudad(ventas)
    const unidadProducto = unidadesPorProducto(ventas)
    const top = topProductosPorValor(ventas, 3)
    const ventasDia = ventasDelDia(ventas, "2026-09-01")
    const ventasSinDia = ventasDelDia(ventas, "2026-09-07")

    return {
        total,
        unidades,
        totalCiudad,
        unidadProducto,
        top,
        ventasDia,
        ventasSinDia
    };
}

const cantidades = [10000, 100000];
const rendimiento = [];

for (const n of cantidades) {
    const ventasG = generarVentas(n)

    const tiempoIV01 = performance.now()
    generarReporte01(ventasG)
    const tiempoFV01 = performance.now() - tiempoIV01

    const tiempoIV1 = performance.now()
    generarReporte(ventasG)
    const tiempoFV1 = performance.now() - tiempoIV1
    
    rendimiento.push({
        ventasG: n,
        "V0.1": `${tiempoFV01.toFixed(3)} ms`,
        "V1.0": `${tiempoFV1.toFixed(3)} ms`,
        "Diferencia": `${(tiempoFV01 - tiempoFV1).toFixed(3)} ms`
    })
}

console.log("========== COMPARACIÓN DE RENDIMIENTO ==========");
console.table(rendimiento);
