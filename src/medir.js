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
    console.time(`tiempo de ${n[i]}: `)
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
    console.timeEnd(`tiempo de ${n[i]}: `)
}


console.log("===========");

function ciclo(n){
    for(let i = 0; i < n; i++){
    }
}

const tiempos = [1000, 2000, 4000, 8000, 16000, 100000, 1000000]
const tabla = []

for (const n of tiempos){

    console.time(`tiempo de: ${n}: `)
    const inicio = performance.now();

    let v = generarVentas(n)

    ciclo(v)

    const fin = performance.now();
    console.timeEnd(`tiempo de: ${n}: `)


    tabla.push({
        Datos: n,
        tiempos_ms: `${(fin - inicio).toFixed(3)} ms`
    })
}

console.table(tabla);
console.table(resultado);