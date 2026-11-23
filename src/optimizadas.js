const {
    generarVentas
} = require('./generador')

const ventas = require('./datos.js')

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

function clientesRecurrentesSet(ventas){
    const clientesVistos = new Set()
    const recurrentes = new Set()

    for(const venta of ventas){
        if(clientesVistos.has(venta.cliente)){
            recurrentes.add(venta.cliente);
        } else {
            clientesVistos.add(venta.cliente)
        }
    }
    return [...recurrentes];
}

function comprasPorCliente(ventas) {
    const compras = new Map()
    for(const venta of ventas){
        compras.set((venta.cliente), (compras.get(venta.cliente) || 0) + 1)
    }
    return compras
}



const ventaGenerada = generarVentas(5000)

console.table(ventas);

console.log("Ventas con datos originales");
console.log("Original", clientesRecurrentes(ventas));
console.log("clientes recurrentes set: ",clientesRecurrentesSet(ventas));
console.log("compras por clientes",comprasPorCliente(ventas));

console.log("Ventas con 5.000 datos");
console.log("Original", clientesRecurrentes(ventaGenerada));
console.log("clientes recurrentes set: ",clientesRecurrentesSet(ventaGenerada));
console.log("compras por clientes",comprasPorCliente(ventaGenerada));


const datos = [1000, 10000, 100000]
const tabla = []

for(const v of datos){
    let ventas = generarVentas(v)
    let tiempo = "Sin  procesar"


    if(v <= 10000){
        const inicio = performance.now();
        clientesRecurrentes(ventas)
        const fin = performance.now();

        tiempo = (fin - inicio).toFixed(3)
    }

    const inicioSet = performance.now();
    let resultadoSet = clientesRecurrentesSet(ventas)
    const finSet = performance.now();

    const inicioMap = performance.now();
    let resultadoMap = comprasPorCliente(ventas)
    const finMap = performance.now();

    tabla.push({
        datos: v,
        tiempo: tiempo,
        tiempo_Set: (finSet - inicioSet).toFixed(3),
        tiempo_Map: (finMap - inicioMap).toFixed(3),
        clientesRecurrentes: resultadoSet.length,
        clientesUnicos: resultadoMap.size
    })
}

console.table(tabla);


