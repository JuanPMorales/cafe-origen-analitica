const ventas = require('./datos');

console.log(`===========
  Ventas   
============`)

console.log("Cantidad de registros: ", ventas.length)
console.log("Primera venta: ", ventas[0]);
console.log("Última venta: ", ventas[ventas.length - 1]);
console.log("Venta 4, producto: ",ventas[3].producto)
console.table(ventas)

console.log("===")
console.log(ventas.map((c) => `[${c.ciudad}]`).join(" "));
console.log("===")



console.log(ventas.map((v) => `id: ${v.id} - ciudad: ${v.ciudad}`).join(" --- "))
