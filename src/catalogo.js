const { normalizacion } = require("./analitica")

const catalogo = [
    { producto: "Origen Nariño 250 g", precio: 26000 },
    { producto: "Origen Huila 500 g", precio: 42000 },
    { producto: "Origen Sierra 500 g", precio: 45000 },
    { producto: "Filtros de papel x100", precio: 18000 },
    { producto: "Taza de cerámica", precio: 35000 },
    { producto: "Origen Huila 1 kg", precio: 79000 },
    { producto: "Prensa francesa", precio: 95000 },
    { producto: "Molino manual", precio: 120000 },
]

// funcion comboRegalo() fuerza bruta 
// Complejidad temporal: O(n²).
// Complejidad espacial: O(1), porque no necesitamos una estructura de datos adicional que crezca con el catálogo.
function comboRegaloBruta(catalogo, valor){
    for(let i = 0; i < catalogo.length; i++){
        for(let j = i + 1; j < catalogo.length; j++ ){
            if(catalogo[i].precio + catalogo[j].precio === valor){
                return[catalogo[i], catalogo[j]]
            }
        }
    }

    return null
}
// console.table(comboRegaloBruta(catalogo, 68000));



module.exports = catalogo;