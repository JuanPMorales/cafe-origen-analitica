const {
    generarVentas
} = require('./generador')

function clientesRecurrentes(ventas){
    const recurrentes = [];
    for (let i = 0; i < ventas.length; i++) {
        for (let j = i + 1; j < ventas.length; j++) {
            if (ventas[i].cliente === ventas[j].cliente && !recurrentes.includes(ventas[i].cliente)) {
                recurrentes.push(ventas[i].cliente);
            }
        }
    }
    return recurrentes;
}

const datos = [1000, 2000, 4000, 8000, 16000]
const tabla = []

for (const n of datos) {

    const v = generarVentas(n)

    console.time(`tiempo de: ${n}: `) 
    const inicio = performance.now()
    clientesRecurrentes(v)
    const fin = performance.now();
    console.timeEnd(`tiempo de: ${n}: `)

    tabla.push({
        Datos: n,
        tiempos_ms: `${(fin - inicio).toFixed(3)} ms`
    })
}

console.table(tabla);
