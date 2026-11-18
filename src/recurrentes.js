const ventas = require('./datos')


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

for(const n of clientesRecurrentes(ventas)){

    console.time(`tiempo de: ${n}: `)

    clientesRecurrentes(n)

    console.timeEnd(`tiempo de: ${n}: `)

}

console.log(clientesRecurrentes(ventas));
