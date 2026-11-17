const ventas = require('./datos');
const {
    normalizacion
} = require('./analitica')

const productos = Array.from(new Set(ventas.map(v => v.producto)))
const precio = Array.from(new Set(ventas.map(v => v.precio)))
const ciudades = Array.from(new Set(ventas.map(v => normalizacion(v.ciudad))))


const azar = (max, min) => Math.floor(Math.random() * (max - min) + min);

function generarVentas(n) {
    const cliente = Math.max(1, Math.floor(n / 3));
    const ventasR = []
    for (let i = 1; i <= n; i++) {
        const p = productos[azar(0, productos.length - 1)];
        ventasR.push({
            id: i, fecha: "2026-09-" + String(azar(0, 30)).padStart(2, "0"), 
            cliente: "C" + String(azar(1, cliente)).padStart(2, "0"), 
            producto: p, ciudad: ciudades[azar(0, ciudades.length - 1)],
            cantidad: azar(1, 5), precio: precio[azar(0, precio.length - 1)]
        })
    }
    return ventasR
}

console.table(generarVentas(10));