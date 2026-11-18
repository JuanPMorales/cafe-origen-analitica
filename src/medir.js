const {
    generarVentas
} = require('./generador')

const {
    totalVendido,
    ventaMayor,
    totalPorCiudad,
    primeraVenta
} = require('./instrumentada.js')

const n = [100, 1000, 10000, 100000]

const resultado = []

for (let i = 0; i < n.length; i++ ){

    let v = generarVentas(n[i])

    let contadorVendido = { ops: 0 }
    let contadorMayor = { ops: 0 }
    let contadorCiudad = { ops: 0 }
    let contadorPrimera = { ops: 0 };


    totalVendido(v, contadorVendido)
    ventaMayor(v, contadorMayor)
    totalPorCiudad(v, contadorCiudad)
    primeraVenta(v, contadorPrimera)


    resultado.push({
        n: n[i],
        totalVendido: contadorVendido.ops.toLocaleString("es-CO"),
        ventaMayor: contadorMayor.ops.toLocaleString("es-CO"),
        totalPorCiudad: contadorCiudad.ops.toLocaleString("es-CO"),
        primeraVenta: contadorPrimera.ops
    })
}


console.table(resultado);