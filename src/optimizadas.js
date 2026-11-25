const {
    generarVentas
} = require('./generador')

const catalogo = require('./catalogo.js')

const ventas = require('./datos.js')

const {
    normalizacion,
} = require('./analitica.js')

// function clientesRecurrentes(ventas){
//     const recurrentes = [];
//     for (let i = 0; i < ventas.length; i++) {
//         for (let j = i + 1; j < ventas.length; j++) {
//             if (ventas[i].cliente === ventas[j].cliente && !recurrentes.includes(ventas[i].cliente)) {
//                 recurrentes.push(ventas[i].cliente);
//             }
//         }
//     }
//     return recurrentes.sort();
// }

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
    return [...recurrentes].sort();
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
// console.log("Original", clientesRecurrentes(ventas));
console.log("clientes recurrentes set: ",clientesRecurrentesSet(ventas));
console.log("compras por clientes",comprasPorCliente(ventas));

console.log("Ventas con 5.000 datos");
// console.log("Original", clientesRecurrentes(ventaGenerada));
console.log("clientes recurrentes set: ",clientesRecurrentesSet(ventaGenerada));
console.log("compras por clientes",comprasPorCliente(ventaGenerada));


const datos = [1000, 10000, 100000]
const tabla = []

for(const v of datos){
    let ventas = generarVentas(v)
    let tiempo = "Sin  procesar"


    // if(v <= 10000){
    //     const inicio = performance.now();
    //     clientesRecurrentes(ventas)
    //     const fin = performance.now();

    //     tiempo = (fin - inicio).toFixed(3)
    // }

    const inicioSet = performance.now();
    let resultadoSet = clientesRecurrentesSet(ventas)
    const finSet = performance.now();

    const inicioMap = performance.now();
    let resultadoMap = comprasPorCliente(ventas)
    const finMap = performance.now();

    tabla.push({
        datos: v,
        // tiempo: tiempo,
        tiempo_Set: (finSet - inicioSet).toFixed(3),
        tiempo_Map: (finMap - inicioMap).toFixed(3),
        clientesRecurrentes: resultadoSet.length,
        clientesUnicos: resultadoMap.size
    })
}

console.table(tabla);

// Funcion comboRegaloMap()
// complejidad temporal: O(n) Complejidad espacial: O(n)
function comboRegalo(catalogo, valor){
    const vistos = new Map()
    for(const p of catalogo){
        const falta = valor - p.precio
        if(vistos.has(falta)) return [vistos.get(falta), p];
        vistos.set(p.precio, p)
    }
    return null
}

const precios = [87000, 61000, 8521]
console.log("precio de:", precios[0]);
console.table(comboRegalo(catalogo, precios[0]))
console.log("precio de:", precios[1]);
console.table(comboRegalo(catalogo, precios[1]))
console.log("precio de:", precios[2]);
console.table(comboRegalo(catalogo, precios[2]))

// complejidad temporal: O(n) Complejidad espacial: O(n)
function productoEstrellaPorCiudad(ventas) {
    const ciudades = new Map()

    for(const venta of ventas){
        const ciudad = normalizacion(venta.ciudad)
        const producto = venta.producto

        if(!ciudades.has(ciudad)){
            ciudades.set(ciudad, new Map())
        }

        const productos =  ciudades.get(ciudad)

        productos.set(producto, (productos.get(producto) || 0) + 1)
    }

    const resultado = new Map();

    for (const [ciudad, productos] of ciudades) {
        let estrella = null;
        let maximo = 0;

        for (const [producto, frecuencia] of productos) {
            if (frecuencia > maximo) {
                maximo = frecuencia;
                estrella = producto;
            }
        }

        resultado.set(ciudad, estrella);
    }

    return resultado;
}

console.log(productoEstrellaPorCiudad(ventas));


// complejidad temporal: O(n) Complejidad espacial: O(n)
function primerClienteUnico(ventas) {
    const clientes = new Map();

    for (const venta of ventas) {
        const cliente = venta.cliente;
        clientes.set(cliente, (clientes.get(cliente) || 0) + 1);
    }

    for (const venta of ventas) {
        if (clientes.get(venta.cliente) === 1) {
            return venta.cliente;
        }
    }

    return null;
}

console.log(primerClienteUnico(ventas));

// Mini reto 11 de algoritmia

const ventasDiarias = [
    320, 410, 280, 390, 510, 620, 700, 300, 290, 450,
    480, 530, 610, 680, 350, 330, 420, 470, 560, 640,
    710, 380, 360, 440, 500, 590, 650, 720, 400, 370
];

// Mejor semana de la peor funcion
function mejorSemanaBruta(dias, k) {
    if (k <= 0 || k > dias.length) return null;

    let maximo = -Infinity;
    let inicio = 0;

    for (let i = 0; i <= dias.length - k; i++) {
        let total = 0;

        for (let j = i; j < i + k; j++) {
            total += dias[j];
        }

        if (total > maximo) {
            maximo = total;
            inicio = i;
        }
    }

    return {
        total: maximo,
        diaInicio: inicio + 1
    };
}

console.log(mejorSemanaBruta(ventasDiarias, 7));

// Mejor semana con ventas deslizante
function mejorSemana(dias, k) {
    if (k <= 0 || k > dias.length) return null;

    let total = 0;

    for (let i = 0; i < k; i++) {
        total += dias[i];
    }

    let maximo = total;
    let inicio = 0;

    for (let i = k; i < dias.length; i++) {
        total += dias[i] - dias[i - k];

        if (total > maximo) {
            maximo = total;
            inicio = i - k + 1;
        }
    }

    return {
        total: maximo,
        diaInicio: inicio + 1
    };
}

console.log(mejorSemana(ventasDiarias, 7));

const dias = generarVentas(100000).map(v => v.cantidad * v.precio);

const inicioBruta = performance.now();
const resultadoBruta = mejorSemanaBruta(dias, 7);
const tiempoBruta = performance.now() - inicioBruta;

const inicioOptimizada = performance.now();
const resultadoOptimizada = mejorSemana(dias, 7);
const tiempoOptimizada = performance.now() - inicioOptimizada;

console.table([
    {
        metodo: "Fuerza bruta",
        ...resultadoBruta,
        tiempo: tiempoBruta.toFixed(3) + " ms"
    },
    {
        metodo: "Ventana deslizante",
        ...resultadoOptimizada,
        tiempo: tiempoOptimizada.toFixed(3) + " ms"
    }
]);

function parMasCercano(precios, presupuesto) {
    const ordenados = [...precios].sort((a, b) => a.precio - b.precio);

    let i = 0;
    let j = ordenados.length - 1;
    let mejorSuma = 0;
    let mejorPar = null;

    while (i < j) {
        const suma = ordenados[i].precio + ordenados[j].precio;

        if (suma > presupuesto) {
            j--;
        } else {
            if (suma > mejorSuma) {
                mejorSuma = suma;
                mejorPar = [ordenados[i], ordenados[j]];
            }

            i++;
        }
    }

    return mejorPar;
}

const presupuestos = [100000, 140000, 40000];

for (const presupuesto of presupuestos) {
    console.log("Presupuesto:", presupuesto);
    console.table(parMasCercano(catalogo, presupuesto));
}
