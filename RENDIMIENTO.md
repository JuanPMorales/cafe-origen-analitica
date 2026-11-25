# Analisis de rendimiento

Mediciones realizadas con 10.000 ventas generadas aleatoriamente. Los tiempos corresponden a ejecuciones locales y pueden variar entre equipos o ejecuciones. Las operaciones instrumentadas cuentan las iteraciones registradas por el contador del proyecto.

| Funcion | Que hace | Complejidad temporal | Complejidad espacial | Justificacion | Operaciones o tiempo medido con 10.000 ventas |
|---|---|---|---|---|---|
| `valorVenta(venta)` | Calcula el valor de una venta multiplicando `cantidad` por `precio`. | `O(1)` | `O(1)` | Solo realiza una multiplicacion y no depende del tamaño del arreglo. | Acceso directo; menos de 1 ms por llamada en las mediciones. |
| `normalizacion(texto)` | Elimina espacios y convierte texto a minusculas. | `O(m)` | `O(m)` | El coste depende de la longitud `m` del texto procesado. | Operacion constante respecto a las ventas; menos de 1 ms por llamada individual. |
| `totalVendido(ventas)` | Suma el valor de todas las ventas mediante un ciclo. | `O(n)` | `O(1)` | Recorre una vez las `n` ventas y conserva una sola variable acumuladora. | 10.000 operaciones instrumentadas; aproximadamente `0.799 ms` en la medicion individual. |
| `unidadesVendidas(ventas)` | Suma las cantidades positivas de todas las ventas. | `O(n)` | `O(1)` | Recorre una vez las ventas y acumula unidades en una variable. | 10.000 operaciones posibles; aproximadamente `0.684 ms` en la medicion individual. |
| `ventaMayor(ventas)` | Obtiene la venta con el mayor valor total. | `O(n)` | `O(1)` | Compara cada venta una sola vez con la venta mayor encontrada. | 10.000 operaciones instrumentadas en su variante de `instrumentada.js`. |
| `ticketPromedio(ventas)` | Calcula el promedio del valor de las ventas con cantidad positiva. | `O(n)` | `O(1)` | Recorre una vez las ventas y mantiene el total y la cantidad de ventas. | Aproximadamente `2.146 ms`. |
| `ventasPorCiudad(ventas, ciudad)` | Suma el valor de las ventas de una ciudad. | `O(n)` | `O(1)` | Recorre una vez todas las ventas y mantiene solo el total. | Aproximadamente `1.816 ms`. |
| `totalVendidoM(ventas)` | Suma las ventas con `reduce`. | `O(n)` | `O(1)` | `reduce` visita una vez cada elemento y usa un acumulador. | Aproximadamente `0.674 ms`. |
| `unidadesVendidasM(ventas)` | Suma unidades positivas mediante `reduce`. | `O(n)` | `O(1)` | Recorre una vez las ventas sin crear un arreglo intermedio. | Aproximadamente `0.303 ms`. |
| `ventasPorCiudadM(ventas, ciudad)` | Filtra una ciudad y suma sus ventas. | `O(n)` | `O(n)` | El filtro puede crear un arreglo con hasta `n` elementos antes de ejecutar `reduce`. | Aproximadamente `0.861 ms`. |
| `totalPorCiudad(ventas)` | Agrupa y suma el valor vendido por ciudad. | `O(n)` | `O(c)` | Recorre las ventas una vez y conserva una entrada por cada ciudad `c`; en el peor caso `c = n`. | Aproximadamente `0.666 ms`. |
| `unidadesPorProducto(ventas)` | Agrupa y suma unidades por producto. | `O(n)` | `O(p)` | Recorre las ventas una vez y conserva una entrada por producto `p`; en el peor caso `p = n`. | Aproximadamente `1.621 ms`. |
| `topProductosPorValor(ventas, k)` | Agrupa ventas por producto y obtiene los `k` mejores por valor. | `O(n + u log u)` | `O(u)` | El agrupamiento cuesta `O(n)` y ordenar los `u` productos cuesta `O(u log u)`. | Aproximadamente `1.485 ms`. |
| `ventasDelDia(ventas, fecha)` | Devuelve las ventas cuya fecha coincide. | `O(n)` | `O(r)` | Recorre todas las ventas y crea un arreglo con las `r` coincidencias; en el peor caso `r = n`. | Aproximadamente `0.895 ms`. |
| `totalCiudadCadena(ventas, ciudad)` | Calcula el total de una ciudad encadenando `map`, `filter`, `map` y `reduce`. | `O(n)` | `O(n)` | Aunque los recorridos son consecutivos, cada paso crea arreglos intermedios de tamaño proporcional a `n`. | Aproximadamente `12.189 ms`. |
| `totalCiudadUnaPasada(ventas, ciudad)` | Calcula el total de una ciudad con un solo recorrido `for`. | `O(n)` | `O(1)` | Un solo recorrido visita cada venta y solo conserva una variable `total`. | Aproximadamente `1.664 ms`. |
| `azar(min, max)` | Genera un entero aleatorio dentro de un intervalo. | `O(1)` | `O(1)` | Realiza operaciones aritmeticas constantes. | Aproximadamente menos de 1 ms por llamada. |
| `generarVentas(n)` | Genera `n` registros de ventas aleatorias. | `O(n)` | `O(n)` | Ejecuta un ciclo `n` veces y agrega un objeto nuevo al arreglo resultado. | Aproximadamente `2.438 ms` para generar 10.000 ventas. |
| `totalVendido(ventas, contador)` | Variante instrumentada que suma todas las ventas. | `O(n)` | `O(1)` | Hace una iteracion por venta y registra una operacion en cada iteracion. | 10.000 operaciones. |
| `ventaMayor(ventas, contador)` | Variante instrumentada que encuentra el mayor valor vendido. | `O(n)` | `O(1)` | Incrementa el contador una vez por venta y compara su valor. | 10.000 operaciones. |
| `totalPorCiudad(ventas, contador)` | Variante instrumentada que agrupa totales por ciudad. | `O(n)` | `O(c)` | Usa `reduce` una vez sobre las ventas y conserva una entrada por ciudad. | 10.000 operaciones; `c` es el numero de ciudades distintas. |
| `primeraVenta(ventas, contador)` | Devuelve el primer registro y registra una operacion. | `O(1)` | `O(1)` | Accede directamente al indice cero sin recorrer el arreglo. | 1 operacion; aproximadamente `0.092 ms`. |
| `ciclo(n)` | Ejecuta un ciclo vacio `n` veces. | `O(n)` | `O(1)` | El numero de iteraciones crece linealmente con `n`; el cuerpo no reserva memoria. | 10.000 iteraciones esperadas. |
| `clientesRecurrentes(ventas)` | Encuentra clientes que aparecen en mas de una venta. | `O(n^2)` medio/estructura principal; peor caso `O(n^3)` con `includes` | `O(r)` | Tiene dos ciclos anidados sobre pares de ventas. `includes` puede recorrer hasta `r` clientes recurrentes en cada coincidencia, por lo que el peor caso puede alcanzar `O(n^3)`. | Aproximadamente `460.968 ms`; encontro 2.682 clientes recurrentes con 10.000 ventas. |
| `clientesRecurrentesSet(ventas)` | Identifica clientes con más de una compra. | `O(n + r log r)` promedio | `O(c + r)` | Recorre las ventas utilizando dos conjuntos `Set` y ordena los `r` clientes recurrentes. | 10.000 ventas recorridas más el ordenamiento. |
| `comprasPorCliente(ventas)` | Cuenta las compras de cada cliente. | `O(n)` promedio | `O(c)` | Recorre las ventas una vez y almacena los conteos en un `Map`. | 10.000 iteraciones. |
| `comboRegalo(catalogo, valor)` | Busca dos productos que sumen exactamente el valor solicitado. | `O(m)` promedio | `O(m)` | Utiliza un `Map` para buscar el precio complementario sin ciclos anidados. | Hasta 8 productos recorridos en el catálogo actual. |
| `productoEstrellaPorCiudad(ventas)` | Identifica el producto más vendido por frecuencia en cada ciudad. | `O(n)` promedio | `O(n)` | Utiliza mapas anidados para contar productos por ciudad y seleccionar el más frecuente. | 10.000 ventas recorridas más la selección de productos. |
| `primerClienteUnico(ventas)` | Encuentra el primer cliente con una sola compra. | `O(n)` promedio | `O(c)` | Realiza un recorrido para contar compras y otro para encontrar el primer cliente único. | Hasta 20.000 iteraciones. |
| `mejorSemana(dias, k)` | Encuentra el período consecutivo con mayor total vendido. | `O(n)` | `O(1)` | Utiliza una ventana deslizante que suma el nuevo día y resta el anterior. | 30 días procesados en el reporte actual. |
| `parMasCercano(catalogo, presupuesto)` | Encuentra el par de productos más cercano al presupuesto sin superarlo. | `O(m log m)` | `O(m)` | Ordena una copia del catálogo y utiliza dos punteros para encontrar el mejor par. | Ordenamiento de 8 productos y hasta 7 iteraciones por búsqueda. |

## Proyección

Las siguientes estimaciones utilizan como base los tiempos medidos con 10.000 ventas y la complejidad temporal de cada función.

Para proyectar los tiempos a 1.000.000 de ventas, se utiliza un factor de 100 para funciones O(n) y un factor de 10.000 para funciones O(n²).

Los resultados son aproximados y pueden variar según el equipo, los datos y las optimizaciones del motor de JavaScript.

| Reporte o función | Tiempo con 10.000 ventas | Estimación con 1.000.000 | Cálculo utilizado |
|---|---:|---:|---|
| `totalVendido()` | 0,799 ms | 79,9 ms | 0,799 × 100 |
| `unidadesVendidas()` | 0,684 ms | 68,4 ms | 0,684 × 100 |
| `ticketPromedio()` | 2,146 ms | 214,6 ms | 2,146 × 100 |
| `ventasPorCiudad()` | 1,816 ms | 181,6 ms | 1,816 × 100 |
| `totalPorCiudad()` | 0,666 ms | 66,6 ms | 0,666 × 100 |
| `unidadesPorProducto()` | 1,621 ms | 162,1 ms | 1,621 × 100 |
| `topProductosPorValor()` | 1,485 ms | ≈ 148,5 ms | Aproximación lineal si los productos únicos permanecen limitados |
| `ventasDelDia()` | 0,895 ms | 89,5 ms | 0,895 × 100 |
| **Reporte de ventas completo** | **6,150 ms** | **≈ 615 ms** | Suma de los seis reportes indicados |
| `totalVendidoM()` | 0,674 ms | 67,4 ms | 0,674 × 100 |
| `unidadesVendidasM()` | 0,303 ms | 30,3 ms | 0,303 × 100 |
| `ventasPorCiudadM()` | 0,861 ms | ≈ 86,1 ms | 0,861 × 100 |
| `totalCiudadCadena()` | 12,189 ms | 1.218,9 ms (≈ 1,22 s) | 12,189 × 100 |
| `totalCiudadUnaPasada()` | 1,664 ms | 166,4 ms | 1,664 × 100 |
| `generarVentas()` | 2,438 ms | 243,8 ms | 2,438 × 100 |
| `primeraVenta()` | 0,092 ms | ≈ 0,092 ms | O(1), tiempo constante |
| `ciclo()` | Sin medición directa comparable | No determinada | Requiere una medición base fiable |
| `clientesRecurrentes()` | 460,968 ms | ≈ 76,83 min | 460,968 × 10.000, suponiendo crecimiento cuadrático |

### Conclusión

Las funciones de complejidad O(n) presentan un crecimiento aproximadamente proporcional a la cantidad de ventas. Al multiplicar los datos por 100, el tiempo estimado también se multiplica por 100.

Las funciones de complejidad O(1), como `primeraVenta()`, mantienen un costo aproximadamente constante.

La función `clientesRecurrentes()` presenta un crecimiento mucho mayor debido a sus ciclos anidados. La proyección cuadrática supone que la cantidad de clientes recurrentes distintos permanece limitada; si también crece, el uso de `includes()` puede elevar la complejidad del peor caso a O(n³).

Por último, `topProductosPorValor()` tiene complejidad O(n + u log u), donde `u` representa la cantidad de productos diferentes. Su estimación es aproximadamente lineal si el número de productos únicos permanece limitado.

## Riesgos

Las funciones se ordenan de mayor a menor riesgo al aumentar la cantidad de datos. El criterio combina complejidad temporal, uso de memoria, tiempo medido y proyección a 1.000.000 de ventas.

## Riesgos

Las funciones se clasifican de mayor a menor riesgo según su comportamiento al aumentar la cantidad de ventas.

### Criterios de clasificación

- **Complejidad temporal:** las funciones O(n²) o superiores presentan mayor riesgo que las O(n) y O(1).
- **Complejidad espacial:** las funciones que crean arreglos u objetos proporcionales a los datos pueden consumir más memoria.
- **Tiempo medido:** se consideran los resultados obtenidos con 10.000 ventas.
- **Proyección:** se analiza el posible comportamiento de las funciones al trabajar con 1.000.000 de ventas.

### Tabla de riesgos

| Posición | Archivo | Función | Riesgo | Justificación |
| ---: | --- | --- | --- | --- |
| 1 | `recurrentes.js` | `clientesRecurrentes()` | Crítico | Utiliza ciclos anidados e `includes()`. Puede alcanzar O(n³) en el peor caso. |
| 2 | `analitica.js` | `topProductosPorValor()` | Alto | Agrupa ventas y ordena productos. Tiempo O(n + u log u) y espacio O(u). |
| 3 | `analitica.js` | `totalCiudadCadena()` | Alto | Realiza cuatro etapas de recorrido y crea tres arreglos intermedios. Tiempo y espacio O(n). |
| 4 | `generador.js` | `generarVentas()` | Medio-alto | Genera un arreglo con `n` objetos nuevos. Tiempo y espacio O(n). |
| 5 | `analitica.js` | `ventasPorCiudadM()` | Medio-alto | Utiliza `filter()` y crea un arreglo auxiliar de hasta `n` elementos. |
| 6 | `analitica.js` | `ventasDelDia()` | Medio | Crea un arreglo que puede contener todas las ventas. |
| 7 | `analitica.js` | `totalPorCiudad()` | Medio | Agrupa ventas en un objeto que crece con las ciudades diferentes. |
| 8 | `analitica.js` | `unidadesPorProducto()` | Medio | Agrupa unidades en un objeto que crece con los productos diferentes. |
| 9 | `instrumentada.js` | `totalPorCiudad()` | Medio | Agrupa las ventas por ciudad y registra operaciones. |
| 10 | `analitica.js` | `ticketPromedio()` | Medio-bajo | Realiza un recorrido O(n) con memoria O(1). |
| 11 | `analitica.js` | `ventasPorCiudad()` | Medio-bajo | Recorre las ventas una vez y utiliza un acumulador. |
| 12 | `analitica.js` | `totalCiudadUnaPasada()` | Medio-bajo | Recorre las ventas una vez sin crear arreglos intermedios. |
| 13 | `analitica.js` | `totalVendido()` | Bajo | Recorrido O(n) con un acumulador. |
| 14 | `analitica.js` | `unidadesVendidas()` | Bajo | Recorrido O(n) con memoria constante. |
| 15 | `analitica.js` | `ventaMayor()` | Bajo | Recorre las ventas y conserva una referencia a la venta mayor. |
| 16 | `analitica.js` | `totalVendidoM()` | Bajo | Utiliza `reduce()` con un acumulador numérico. |
| 17 | `analitica.js` | `unidadesVendidasM()` | Bajo | Utiliza `reduce()` sin generar arreglos. |
| 18 | `instrumentada.js` | `totalVendido()` | Bajo | Recorre las ventas y actualiza un contador existente. |
| 19 | `instrumentada.js` | `ventaMayor()` | Bajo | Recorre las ventas y registra las operaciones. |
| 20 | `medir.js` | `ciclo()` | Bajo | Ejecuta `n` iteraciones sin crear estructuras adicionales. |
| 21 | `analitica.js` | `normalizacion()` | Muy bajo | Su costo depende de la longitud del texto. |
| 22 | `generador.js` | `azar()` | Muy bajo | Realiza operaciones matemáticas constantes. |
| 23 | `analitica.js` | `valorVenta()` | Muy bajo | Realiza una multiplicación. Tiempo y espacio O(1). |
| 24 | `instrumentada.js` | `primeraVenta()` | Muy bajo | Accede directamente al primer elemento. Tiempo y espacio O(1). |

### Conclusión del análisis

La función de mayor riesgo es `clientesRecurrentes()`, porque compara ventas mediante ciclos anidados y utiliza `includes()` para verificar si un cliente ya fue registrado.

Con 10.000 ventas, su tiempo medido fue aproximadamente **460,968 ms**. Una proyección basada únicamente en crecimiento cuadrático da aproximadamente **76,83 minutos** para 1.000.000 de ventas. Sin embargo, el tiempo podría ser mayor si también aumenta la cantidad de clientes recurrentes distintos.

Las funciones O(n) presentan un crecimiento más controlado. Entre ellas, `totalCiudadCadena()` utiliza más memoria que `totalCiudadUnaPasada()` porque genera arreglos intermedios.

El orden de las funciones con complejidades similares es aproximado y puede variar según los datos utilizados.

---
complejidades
## Plan de optimización

### Función seleccionada: `clientesRecurrentes()`

**Problema identificado**

La función utiliza dos ciclos anidados para comparar cada venta con las ventas posteriores y determinar si un cliente aparece más de una vez.

Además, cuando encuentra una coincidencia, utiliza `includes()` para comprobar si el cliente ya está almacenado en el arreglo `recurrentes`.

Esto genera trabajo repetitivo y puede afectar considerablemente el rendimiento cuando aumenta la cantidad de ventas.

### ¿Qué trabajo se repite?

1. Se compara el mismo cliente con múltiples ventas para buscar coincidencias.
2. Se vuelve a recorrer parte del arreglo de ventas para comprobar si un cliente aparece nuevamente.
3. Se utiliza `includes()` para buscar repetidamente si un cliente ya está registrado como recurrente.

### ¿Qué información se podría guardar?

Se podría utilizar una estructura `Map` o `Set` para almacenar información de los clientes mientras se recorren las ventas.

Por ejemplo:

- Un `Set` para guardar los clientes que ya aparecieron.
- Otro `Set` para identificar los clientes que aparecen más de una vez.

De esta manera, no sería necesario comparar cada venta con todas las demás ni buscar repetidamente en el arreglo de resultados.

### Mejora propuesta

La idea consiste en recorrer las ventas una sola vez y consultar si el cliente ya fue registrado.

Si aparece por primera vez, se guarda su identificador. Si vuelve a aparecer, se marca como recurrente.

Esto permitiría reducir la complejidad temporal de O(n²) o peor a **O(n) en promedio**, utilizando operaciones de búsqueda e inserción eficientes en `Set`.

La complejidad espacial aumentaría a O(c), donde `c` representa la cantidad de clientes diferentes, debido a la información almacenada.

### Beneficios esperados

- Reducir las comparaciones repetidas.
- Evitar los ciclos anidados.
- Mejorar el tiempo de ejecución con grandes cantidades de ventas.
- Mantener un registro eficiente de los clientes recurrentes.
- Facilitar el mantenimiento y la comprensión del algoritmo.

**Estado:** optimización propuesta, pendiente de implementación y pruebas.

---

## Revisión por un compañero

### Solicitud de revisión

Se solicitó a un compañero revisar el informe de complejidad algorítmica, especialmente la clasificación de riesgos, las proyecciones de rendimiento y la propuesta de optimización de `clientesRecurrentes()`.

### Registro de revisión

**Compañero que realizó la revisión:** \[Juan Sebastian Ortega Mesa\]

**Fecha:** \[23/11/2026\]

**Observación recibida:**

\[las estadisticas de rendimiento del BIG O "O(n), N(LOG)N y O() " y sus derivados concuerdan con el nivel de crecimiento de la funcion, siendo catalogados adecuadamente los casos de niveles de riesgos de las funciones, la solucion propuesta  al problema de clientesRecurrentes me parece acertada y permite optimizar el codigo de manera adecuada".\]

**Mi respuesta a la observación:**

\[Estoy de acuerdo con mi compañero a la hora de revisar mi bitacora de rendimiento, tal vez podria hacer un cambio añadiendo el codigo optimizado de clientesRecurrentes. Pero estoy de acuerdo con todo.\]

**Cambio realizado:**

```
function clientesRecurrentes(ventas) {
    const clientesVistos = new Set();
    const recurrentes = new Set();

    for (const venta of ventas) {
        const cliente = venta.cliente;

        if (clientesVistos.has(cliente)) { //.has comprueba si el cliente ya apareció.
            recurrentes.add(cliente);
        } else {
            clientesVistos.add(cliente);
        }
    }

    return [...recurrentes];
}
```


# Total rendimiento del reporte v0.1 y v1.0 con 10.000 y 100.000

| Cantidad de ventas | v0.1 | v1.0 | Tiempo adicional |
|---:|---:|---:|---:|
| 10.000 | 5.584 ms | 10.114 ms | 4.530 ms |
| 100.000 | 34.007 ms | 70.391 ms | 36.384 ms |

### Análisis de resultados

- Con 10.000 ventas, la v1.0 tarda 1.81 veces lo que tarda la v0.1.
- Con 100.000 ventas, la v1.0 tarda 2.07 veces lo que tarda la v0.1.
- Al multiplicar las ventas por 10, el tiempo de la v1.0
  aumenta aproximadamente 6.96 veces.

La versión v1.0 procesa 100.000 ventas en aproximadamente
70 ms, ofreciendo más información con un tiempo de
ejecución inferior a 100 ms en la prueba realizada.