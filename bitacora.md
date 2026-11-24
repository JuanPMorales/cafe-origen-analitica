# Bitacora

## Diccionario de datos

La información corresponde a un arreglo de registros de ventas de productos
de café y accesorios. Cada objeto representa una venta.

| Propiedad | Tipo en JavaScript | Significado |
|---|---|---|
| `id` | `number` | Identificador único de la venta. |
| `fecha` | `string` | Fecha en la que se realizó la venta, con formato `AAAA-MM-DD`. |
| `cliente` | `string` | Código que identifica al cliente, por ejemplo `C01`. |
| `producto` | `string` | Nombre del producto vendido. |
| `ciudad` | `string` | Ciudad donde se realizó la venta. |
| `cantidad` | `number` | Número de unidades vendidas en la operación. |
| `precio` | `number` | Precio unitario del producto, expresado en pesos colombianos. |

## Casos borde y decisiones

| Propiedad o dato | Problema | Decisión |
|---|---|---|
| `ciudad` | El mismo nombre aparece con diferente capitalización, por ejemplo `Medellín` y `medellín`. | Normalizar los nombres usando una capitalización consistente. En este caso, `medellín` se tratará como `Medellín` para evitar contar la misma ciudad como dos ciudades diferentes. |
| `cantidad` | Existen registros con cantidad `0`, lo que no representa unidades vendidas. | Conservar el registro original para no perder trazabilidad, pero marcarlo como una venta sin unidades y excluirlo de los cálculos de unidades e ingresos hasta validarlo. |
| `cliente` | Un mismo cliente aparece en varias ventas. | No eliminar los registros repetidos: cada fila representa una venta diferente. Para análisis por cliente, agrupar las ventas usando el código del cliente. |

## Plan en pseudocódigo de cada indicador

| Qué recorres | Qué condición aplicas | Qué acumulas | Qué valor inicias |
|---|---|---|---|
| Todas las ventas. | Calcular `cantidad * precio`. | El valor de cada venta en `total`. | `total = 0`. |
| Todas las ventas. | Si `cantidad > 0`, sumar la cantidad. | Las unidades en `totalUnidades`. | `totalUnidades = 0`. |
| Todas las ventas. | Si el valor de la venta es mayor que el valor de la venta guardada, reemplazarla. | La venta de mayor valor. | La primera venta; si el arreglo está vacío, `null`. |
| Todas las ventas. | Si `cantidad > 0`, sumar el valor y aumentar `cantidadVentas`. | `total` y `cantidadVentas`. | Ambos empiezan en `0`; si no hay compras, el promedio es `0`. |
| Todas las ventas. | Comparar las ciudades normalizadas. | El valor de las ventas que coinciden. | `total = 0`. |

### Pseudocódigo

```text
función totalVendido(ventas):
    total = 0
    para cada venta en ventas:
        total = total + venta.cantidad * venta.precio
    devolver total

función unidadesVendidas(ventas):
    totalUnidades = 0
    para cada venta en ventas:
        si venta.cantidad > 0:
            totalUnidades = totalUnidades + venta.cantidad
    devolver totalUnidades

función ventaMayor(ventas):
    si ventas está vacío:
        devolver nulo
    mayor = primera venta de ventas
    para cada venta en ventas:
        si venta.cantidad * venta.precio > mayor.cantidad * mayor.precio:
            mayor = venta
    devolver mayor

función ticketPromedio(ventas):
    total = 0
    cantidadVentas = 0
    para cada venta en ventas:
        si venta.cantidad > 0:
            total = total + venta.cantidad * venta.precio
            cantidadVentas = cantidadVentas + 1
    si cantidadVentas es 0:
        devolver 0
    devolver total / cantidadVentas

función ventasPorCiudad(ventas, ciudad):
    total = 0
    para cada venta en ventas:
        si normalizar(venta.ciudad) == normalizar(ciudad):
            total = total + venta.cantidad * venta.precio
    devolver total
```

## Verificación manual con tablas de traza

### Traza de `totalVendido(ventas)`

| ID | Cantidad | Precio | Operación | Total acumulado |
|---:|---:|---:|---:|---:|
| 1 | 2 | 42000 | 2 * 42000 = 84000 | 84000 |
| 2 | 1 | 26000 | 1 * 26000 = 26000 | 110000 |
| 3 | 1 | 95000 | 1 * 95000 = 95000 | 205000 |
| 4 | 1 | 42000 | 1 * 42000 = 42000 | 247000 |
| 5 | 3 | 45000 | 3 * 45000 = 135000 | 382000 |
| 6 | 2 | 26000 | 2 * 26000 = 52000 | 434000 |
| 7 | 1 | 120000 | 1 * 120000 = 120000 | 554000 |
| 8 | 0 | 42000 | 0 * 42000 = 0 | 554000 |
| 9 | 2 | 45000 | 2 * 45000 = 90000 | 644000 |
| 10 | 4 | 42000 | 4 * 42000 = 168000 | 812000 |
| 11 | 1 | 95000 | 1 * 95000 = 95000 | 907000 |
| 12 | 3 | 26000 | 3 * 26000 = 78000 | 985000 |

Resultado manual: `985000`
Resultado del programa: `totalVendido(ventas) = 985000`
Los resultados coinciden.

### Traza de `ventasPorCiudad(ventas, "Medellín")`

| ID | Ciudad normalizada | ¿Coincide? | Valor de la venta | Total acumulado |
|---:|---|---|---:|---:|
| 1 | medellín | Sí | 84000 | 84000 |
| 2 | bogotá | No | 26000 | 84000 |
| 3 | cali | No | 95000 | 84000 |
| 4 | medellín | Sí | 42000 | 126000 |
| 5 | medellín | Sí | 135000 | 261000 |
| 6 | bogotá | No | 52000 | 261000 |
| 7 | bogotá | No | 120000 | 261000 |
| 8 | cali | No | 0 | 261000 |
| 9 | cali | No | 90000 | 261000 |
| 10 | pereira | No | 168000 | 261000 |
| 11 | medellín | Sí | 95000 | 356000 |
| 12 | bogotá | No | 78000 | 356000 |

Resultado manual: `356000`
Resultado del programa: `ventasPorCiudad(ventas, "Medellín") = 356000`
Los resultados coinciden.

## Preguntas de la sesión por función

### `valorVenta(venta)`

- **¿Qué recorro?** No recorro una colección; recibo una venta.
- **¿Qué filtro?** No filtro registros.
- **¿Qué transformo?** Transformo una venta en su valor monetario multiplicando `cantidad * precio`.
- **¿Qué acumulo?** No acumulo; calculo un único valor.
- **¿Cómo agrupo?** No agrupo.

### `normalizacion(texto)`

- **¿Qué recorro?** No recorro una colección; recibo un texto.
- **¿Qué filtro?** No filtro datos.
- **¿Qué transformo?** Transformo el texto quitando espacios al inicio y al final y convirtiéndolo a minúsculas.
- **¿Qué acumulo?** No acumulo.
- **¿Cómo agrupo?** No agrupo directamente, pero dejo textos equivalentes con una misma representación para poder agruparlos después.

### `totalVendido(ventas)`

- **¿Qué recorro?** Recorro todas las ventas.
- **¿Qué filtro?** No filtro ventas; también considero las que tienen cantidad `0`.
- **¿Qué transformo?** Transformo cada venta en su valor mediante `valorVenta`.
- **¿Qué acumulo?** Acumulo el valor de cada venta en `total`.
- **¿Cómo agrupo?** No agrupo por una categoría; reúno todos los valores en un total general.

### `unidadesVendidas(ventas)`

- **¿Qué recorro?** Recorro todas las ventas.
- **¿Qué filtro?** Considero únicamente las ventas cuya `cantidad` es mayor que `0`.
- **¿Qué transformo?** Tomo la cantidad de unidades de cada venta válida.
- **¿Qué acumulo?** Acumulo las unidades en `totalUnidades`.
- **¿Cómo agrupo?** No agrupo por una categoría; reúno las unidades en un total general.

### `ventaMayor(ventas)`

- **¿Qué recorro?** Recorro todas las ventas para compararlas.
- **¿Qué filtro?** Selecciono la venta cuyo valor es mayor que el de la venta guardada como `mayor`.
- **¿Qué transformo?** Transformo cada venta en su valor monetario para poder compararla.
- **¿Qué acumulo?** No acumulo una suma; conservo la mejor venta encontrada hasta el momento.
- **¿Cómo agrupo?** No agrupo; reduzco todas las ventas a una sola venta mayor.

### `ticketPromedio(ventas)`

- **¿Qué recorro?** Recorro todas las ventas.
- **¿Qué filtro?** Considero únicamente las ventas cuya `cantidad` es mayor que `0`.
- **¿Qué transformo?** Transformo cada venta válida en su valor monetario.
- **¿Qué acumulo?** Acumulo el valor total en `total` y la cantidad de ventas válidas en `cantidadVentas`.
- **¿Cómo agrupo?** Agrupo conceptualmente las ventas válidas para calcular su promedio: `total / cantidadVentas`.

### `ventasPorCiudad(ventas, ciudad)`

- **¿Qué recorro?** Recorro todas las ventas.
- **¿Qué filtro?** Selecciono las ventas cuya ciudad normalizada coincide con la ciudad solicitada.
- **¿Qué transformo?** Normalizo las ciudades y transformo las ventas coincidentes en su valor monetario.
- **¿Qué acumulo?** Acumulo el valor de las ventas coincidentes en `total`.
- **¿Cómo agrupo?** Agrupo las ventas por la ciudad indicada, tratando igual las diferencias de mayúsculas y minúsculas.

### `totalVendidoM(ventas)`

- **¿Qué recorro?** Recorro todas las ventas mediante `reduce`.
- **¿Qué filtro?** No filtro ventas.
- **¿Qué transformo?** Transformo cada venta en su valor mediante `valorVenta`.
- **¿Qué acumulo?** Acumulo los valores en el acumulador `acc`.
- **¿Cómo agrupo?** No agrupo por categoría; calculo un total general.

### `unidadesVendidasM(ventas)`

- **¿Qué recorro?** Recorro todas las ventas mediante `reduce`.
- **¿Qué filtro?** Solo sumo la cantidad cuando `cantidad > 0`.
- **¿Qué transformo?** Transformo cada venta en su cantidad válida o en `0`.
- **¿Qué acumulo?** Acumulo las unidades en `acc`.
- **¿Cómo agrupo?** No agrupo por categoría; calculo un total general de unidades.

### `ventasPorCiudadM(ventas, ciudad)`

- **¿Qué recorro?** Recorro todas las ventas mediante `filter` y luego las ventas coincidentes mediante `reduce`.
- **¿Qué filtro?** `filter` conserva las ventas cuya ciudad normalizada coincide con la ciudad solicitada.
- **¿Qué transformo?** Normalizo las ciudades y transformo cada venta filtrada en su valor monetario.
- **¿Qué acumulo?** Acumulo los valores de las ventas filtradas en `acc`.
- **¿Cómo agrupo?** Agrupo por la ciudad solicitada antes de calcular su total.

### `totalPorCiudad(ventas)`

- **¿Qué recorro?** Recorro todas las ventas mediante `reduce`.
- **¿Qué filtro?** No filtro ventas.
- **¿Qué transformo?** Normalizo la ciudad de cada venta y transformo la venta en su valor monetario.
- **¿Qué acumulo?** Acumulo el valor de cada venta en el total asociado a su ciudad.
- **¿Cómo agrupo?** Agrupo por ciudad normalizada usando un objeto cuyas claves son las ciudades.

### `unidadesPorProducto(ventas)`

- **¿Qué recorro?** Recorro todas las ventas mediante `reduce`.
- **¿Qué filtro?** No filtro ventas; incluyo también las que tienen cantidad `0`.
- **¿Qué transformo?** Normalizo el nombre del producto y tomo su cantidad.
- **¿Qué acumulo?** Acumulo las unidades vendidas en el total asociado a cada producto.
- **¿Cómo agrupo?** Agrupo por producto normalizado usando un objeto cuyas claves son los productos.

### `topProductosPorValor(ventas, k)`

- **¿Qué recorro?** Recorro todas las ventas para calcular los totales por producto; después recorro las entradas para ordenarlas.
- **¿Qué filtro?** Después de ordenar, conservo únicamente los primeros `k` productos mediante `slice`.
- **¿Qué transformo?** Normalizo los nombres de producto, transformo cada venta en su valor monetario y convierto los totales en pares `[producto, valor]`.
- **¿Qué acumulo?** Acumulo el valor total de cada producto.
- **¿Cómo agrupo?** Agrupo por producto normalizado, ordeno los grupos de mayor a menor valor y selecciono los primeros `k`.

## Error 1: Bogotá aparece duplicada

**Síntoma:** En una versión preliminar, Bogotá aparecía dos veces al agrupar las ventas por ciudad.

**Entrada que lo produce:** Dos ventas con los nombres `"Bogotá"` y `" BOGOTÁ "`.

**Hipótesis:** Las diferencias entre mayúsculas, minúsculas y espacios provocaban que una misma ciudad se identificara como dos grupos diferentes.

**Prueba realizada:** Se creó un arreglo con dos ventas de Bogotá escritas de manera diferente y se ejecutó `totalPorCiudad(ventasPrueba)`.

**Resultado obtenido:**
```text
{ 'bogotá': 25000 }
```

**Causa:** La falta de normalización de los nombres puede provocar grupos duplicados.

**Corrección:** La función utiliza `normalizacion()`, que aplica `trim()` y `toLowerCase()` para unificar los nombres antes de agruparlos. La prueba confirma que nuestra versión agrupa ambas ventas correctamente.

---

## Error 2: Ticket promedio devuelve NaN

**Síntoma:** En una versión preliminar, el ticket promedio mostraba `NaN` cuando se consultaba un día sin ventas.

**Entrada que lo produce:** Un arreglo vacío `[]`, correspondiente a un día sin ventas.

**Hipótesis:** Se estaba dividiendo el total vendido entre cero.

**Prueba realizada:** Se ejecutó `ticketPromedio(ventasSinDia)` utilizando un día sin ventas.

**Resultado obtenido:**
```text
Ticket promedio sin ventas: 0
```

**Causa:** Si se realiza una división `0 / 0`, JavaScript devuelve `NaN`.

**Corrección:** La función verifica si `cantidadVentas === 0` y devuelve `0` antes de realizar la división. La prueba confirma que nuestra versión evita el resultado `NaN`.

## Predicción al multiplicar `n` por 10

Aquí, `n` representa la cantidad de ventas de entrada. Antes de ejecutar la
prueba, predigo cómo cambiará el número de operaciones:

| Función | Operaciones realizadas por cada venta | Complejidad | Predicción si `n` pasa a `10n` |
|---|---|---|---|
| `totalVendido` | Llamar a `valorVenta`, multiplicar `cantidad * precio` y sumar al acumulador. | `O(n)` | El recorrido y las operaciones se multiplican por `10`. |
| `ventaMayor` | Llamar a `valorVenta` para la venta actual y para `mayor`, multiplicar, comparar y, algunas veces, asignar una nueva venta mayor. | `O(n)` | Las comparaciones y multiplicaciones se multiplican aproximadamente por `10`; las asignaciones dependen de los datos. |
| `totalPorCiudad` | Normalizar la ciudad, buscar su grupo, llamar a `valorVenta`, multiplicar y sumar al acumulador de esa ciudad. | `O(n)` | El recorrido y las operaciones se multiplican aproximadamente por `10`; habrá más grupos solo si aparecen más ciudades distintas. |

Las tres funciones son `O(n)` porque trabajan de forma lineal. Cada función
recorre una sola vez el arreglo de ventas que haya. Es decir, si hay 100
ventas, cada función va a recorrer las 100 ventas una sola vez. Si la cantidad
de ventas aumenta, la cantidad de operaciones también aumenta en la misma
proporción.

## Predicciones con los resultados

La tabla mostrada por `console.table(resultado)` fue:

| `n` | `totalVendido` | `ventaMayor` | `totalPorCiudad` | `primeraVenta` |
|---:|---:|---:|---:|---:|
| 100 | 100 | 100 | 100 | 1 |
| 1.000 | 1.000 | 1.000 | 1.000 | 1 |
| 10.000 | 10.000 | 10.000 | 10.000 | 1 |
| 100.000 | 100.000 | 100.000 | 100.000 | 1 |

| Función | Predicción | Resultado al multiplicar n por 10 | Complejidad |
|---|---|---|---|
| `totalVendido` | Las operaciones aumentan 10 veces. | De 100 a 1.000, luego 10.000 y 100.000. | **O(n)** |
| `ventaMayor` | Las operaciones aumentan aproximadamente 10 veces. | De 100 a 1.000, luego 10.000 y 100.000. | **O(n)** |
| `totalPorCiudad` | Las operaciones aumentan aproximadamente 10 veces. | De 100 a 1.000, luego 10.000 y 100.000. | **O(n)** |
| `primeraVenta` | Las operaciones permanecen constantes. | Siempre registra 1 operación. | **O(1)** |

Al comparar los resultados, pude comprobar que mis predicciones fueron correctas. Las funciones totalVendido, ventaMayor y totalPorCiudad son O(n) porque recorren todas las ventas y, cuando la cantidad de datos aumenta 10 veces, sus operaciones también aumentan 10 veces.

En cambio, primeraVenta es O(1) porque solo obtiene la primera venta, sin importar cuántos datos existan.

## Traza de comparaciones de `ventaMayor`

Para la traza tomé las primeras cinco ventas de `datos.js`. El valor de cada
venta se calcula como `cantidad * precio`. La función inicia con la primera
venta como `mayor` y compara cada venta del arreglo con ese valor:

| Comparación | ID de la venta | Valor de la venta | Mayor antes | ¿Es mayor? | Mayor después |
|---:|---:|---:|---:|---|---:|
| 1 | 1 | 84.000 | 84.000 | No | 84.000 |
| 2 | 2 | 26.000 | 84.000 | No | 84.000 |
| 3 | 3 | 95.000 | 84.000 | Sí | 95.000 |
| 4 | 4 | 42.000 | 95.000 | No | 95.000 |
| 5 | 5 | 135.000 | 95.000 | Sí | 135.000 |

Con este arreglo de cinco ventas, `ventaMayor` hace **5 comparaciones** y devuelve la venta con ID 5, cuyo valor es 135.000. En la implementación actual, el ciclo también compara la primera venta consigo misma, porque
recorre el arreglo completo después de inicializar `mayor`.

Generalizando, con `n` ventas la función hace **n comparaciones**, por lo que su complejidad es `O(n)`. Si el ciclo comenzara desde la segunda venta, podría hacer `n - 1` comparaciones; sin embargo, con el código actual el resultado es `n`.



***
*Esta comparación hace parte de la medición realizada por las funciones definidas en `medir.js`.*
 ## Comparacion de `Tabla de Tiempos de [1.000, 2.000, 4.000, 8.000, 16.000.]`

|Datos|Tiempos_ms|Incremento|
|---:|---:|---:|
|1000|'0.147 ms'|---
|2000|'0.243 ms'| x1.65|
|4000|'0.692 ms'| x2.84|
|8000|'1.714 ms'| x2.47|
|16000|'3.458 ms'|x2.01|


En la tabla se pueden ver que cuando duplicamos la cantidad de datos, el tiempo de ejecucion aumenta de forma progresiva, pero este no se duplica como se espera en O(n²). 

Un ejemplo es cuando se pasa de 8.000 a 16.000 el tiempo se duplica. Lo que demuestra que el tiempo de ejecución aumenta a medida que crecen los datos. La complejidad de esta tabla se acerca más a O(n) que a una complejidad O(n²) ya que el tiempo aumenta aproximadamente x2 que un x4 que es lo que se espera en la complejidad O(n²).


## Estimacion de cuanto tardaría la función con 100.000 y con 1.000.000 de ventas.

Si con `16.000` ventas el contador tarda `3.458 ms`. Si calculamos `100.000` entre las `16.000` ventas tendremos `6.25` veces más ventas. Y nos daria un tiempo estimado de `21.613 ms` y para `1.000.000` ventas entre `16.000` ventas hay `62.5` veces más ventas, y un tiempo aprox de `216.125 ms`

| Ventas | Factor respecto a 16.000 ventas | Tiempo estimado |Tiempo Real
|---:|---:|---:|---:|
| 16.000 | 1x | 3.458 ms | - |
| 100.000 | 6.25x | 21.613 ms | 26.909 ms | 
| 1.000.000 | 62.5x | 216.125 ms | 312.451 ms |


***
*Esta comparacion hace parte de `Recurentes`*
## Comparación de `Tabla de Tiempos de [1.000, 2.000, 4.000, 8.000, 16.000]`

| Datos | Tiempos_ms | Incremento |
|---:|---:|---:|
| 1000 | 6.523 ms | --- |
| 2000 | 17.344 ms | x2.66 |
| 4000 | 52.113 ms | x3.00 |
| 8000 | 253.317 ms | x4.86 |
| 16000 | 914.986 ms | x3.61 |

En la tabla podemos observar que cuando duplicamos la cantidad de datos, el tiempo de ejecución aumenta considerablemente, acercándose al comportamiento esperado de una complejidad O(n²).

Por ejemplo, cuando pasamos de 8.000 a 16.000 datos, el tiempo aumenta de `253.317 ms` a `914.986 ms`, aproximadamente `3.61 veces`.

Esto demuestra un crecimiento cercano al cuadrático, ya que en una complejidad O(n²), cuando duplicamos la cantidad de datos, esperamos que el tiempo de ejecución aumente aproximadamente `4 veces`.

Aunque los incrementos no son exactamente x4, los resultados son compatibles con una complejidad O(n²), considerando las variaciones que pueden presentarse durante la ejecución.

## Estimación de cuánto tardaría la función con 100.000 y con 1.000.000 de ventas

Si con `16.000` ventas la función tarda `914.986 ms`, podemos estimar cuánto tardaría con cantidades mayores utilizando la complejidad O(n²).

Para `100.000` ventas, dividimos `100.000 / 16.000`, obteniendo un factor de `6.25`.

Como la complejidad es O(n²), elevamos ese factor al cuadrado:

`914.986 × (6.25)² = 35.741,64 ms`

Esto equivale aproximadamente a `35.74 segundos`.

Para `1.000.000` de ventas, dividimos `1.000.000 / 16.000`, obteniendo un factor de `62.5`.

Aplicamos nuevamente la complejidad cuadrática:

`914.986 × (62.5)² = 3.574.164,06 ms`

Esto equivale aproximadamente a `59.57 minutos`.

| Ventas | Factor respecto a 16.000 | Tiempo estimado O(n²) | Tiempo real |
|---:|---:|---:|---:|
| 16.000 | 1x | 914.986 ms | 914.986 ms |
| 100.000 | 6.25x | 35.741,64 ms (35.74 s) | 97479.765 ms () |
| 1.000.000 | 62.5x | 3.574.164,06 ms (59.57 min) | No ejecutado |

### Conclusión

Con las nuevas mediciones, el comportamiento del algoritmo es compatible con una complejidad O(n²), porque el tiempo de ejecución crece aproximadamente de forma cuadrática al aumentar la cantidad de datos.

La estimación para `100.000` ventas es de `35.74 segundos`, por lo que podemos ejecutar la prueba, ya que es inferior al límite de `2 minutos` establecido en el ejercicio.

Para `1.000.000` de ventas, el tiempo estimado es de aproximadamente `59.57 minutos`, por lo que no sería recomendable ejecutar esa prueba para esta actividad.

Al ejecutar la prueba con `100.000` ventas, obtuvimos un tiempo real de `97.479,765 ms`, equivalente a `97.48 segundos`.

Inicialmente, estimamos que la ejecución tardaría aproximadamente `38.39 segundos`, utilizando como referencia las `16.000` ventas y una complejidad O(n²).

Sin embargo, el tiempo real fue aproximadamente `2.54 veces` mayor que el estimado.

Esto demuestra que el tiempo de ejecución aumenta considerablemente al incrementar la cantidad de datos, lo cual es compatible con una complejidad O(n²).

La prueba se completó dentro del límite de `2 minutos`, aunque tardó más de lo esperado.

## Costo oculto de `recurrentes.includes`

La función `clientesRecurrentes` compara todas las parejas posibles de ventas con dos ciclos anidados. Con `n` ventas, los ciclos realizan aproximadamente `n(n - 1) / 2` revisiones, por lo que esta parte del algoritmo tiene complejidad O(n²).

Sin embargo, dentro de esas revisiones existe otra operación: `recurrentes.includes(ventas[i].cliente)`. Este método también recorre un arreglo. En el peor caso, cuando el cliente aún no está registrado, debe revisar hasta todos los elementos de `recurrentes`.

Como `recurrentes` puede crecer hasta tener `n` elementos, cada llamada a `includes` puede tomar O(n). Al tener hasta O(n²) parejas que requieren esta búsqueda, el costo combinado puede llegar a O(n³) en el peor caso.

Este costo oculto hace que, al aumentar los registros, el reporte tarde mucho más de lo que sugiere ver únicamente los dos ciclos principales.

### Conclusión para la gerente

El reporte se vuelve lento porque el sistema compara muchas ventas entre sí y, además, vuelve a recorrer una lista cada vez que encuentra un cliente repetido. Al duplicarse la cantidad de ventas, el trabajo puede crecer varias veces más rápido y no solo al doble. Por eso, con pocos datos parece rápido, pero con muchos datos el tiempo de espera aumenta considerablemente.

## Complejidad temporal de las funciones

Ambas funciones, `totalCiudadCadena()` y `totalCiudadUnaPasada()`, tienen una complejidad temporal de **O(n)**.

Aunque `totalCiudadCadena()` utiliza cuatro métodos (`map`, `filter`, `map` y `reduce`), estos realizan recorridos consecutivos, no anidados.

Por ejemplo, si tenemos 100 ventas (`n`) y suponemos que cada método recorre las 100 ventas, tendríamos:

```text
100 + 100 + 100 + 100 = 400 operaciones
```

Esto se representa como:

**T(n) = 4n**

En notación Big O se eliminan las constantes multiplicativas, por lo que **O(4n) se simplifica a O(n)**.

Por otro lado, `totalCiudadUnaPasada()` utiliza un solo ciclo `for...of`, que recorre las ventas una vez.

**T(n) = n**

Por lo tanto, ambas funciones tienen complejidad temporal **O(n)**, aunque `totalCiudadCadena()` realiza más operaciones y crea arreglos intermedios.

La diferencia es que `totalCiudadUnaPasada()` utiliza menos recursos, pero ambas presentan un crecimiento lineal respecto a la cantidad de ventas.

## Punto 6. Clasificación de complejidad espacial

La complejidad espacial representa la memoria adicional que utiliza una función durante su ejecución.

| Archivo | Función | Complejidad espacial | Justificación |
|---|---|---|---|
| `analitica.js` | `valorVenta()` | O(1) | Realiza una multiplicación sin crear estructuras adicionales. |
| `analitica.js` | `totalVendido()` | O(1) | Utiliza únicamente un acumulador. |
| `analitica.js` | `unidadesVendidas()` | O(1) | Utiliza un contador de unidades. |
| `analitica.js` | `ventaMayor()` | O(1) | Guarda una referencia a la venta de mayor valor. |
| `analitica.js` | `ticketPromedio()` | O(1) | Utiliza dos acumuladores. |
| `analitica.js` | `normalizacion()` | O(1)* | Normaliza una cadena de texto sin crear arreglos. |
| `analitica.js` | `ventasPorCiudad()` | O(1)* | Utiliza un acumulador sin crear arreglos. |
| `analitica.js` | `totalVendidoM()` | O(1) | Utiliza `reduce()` con un acumulador numérico. |
| `analitica.js` | `unidadesVendidasM()` | O(1) | Utiliza `reduce()` sin generar arreglos. |
| `analitica.js` | `ventasPorCiudadM()` | O(n) | `filter()` crea un arreglo con las ventas que coinciden. |
| `analitica.js` | `totalPorCiudad()` | O(n) | Crea un objeto con una propiedad por cada ciudad diferente. |
| `analitica.js` | `unidadesPorProducto()` | O(n) | Crea un objeto con una propiedad por cada producto diferente. |
| `analitica.js` | `topProductosPorValor()` | O(n) | Crea un objeto y varios arreglos para agrupar, ordenar y seleccionar productos. |
| `analitica.js` | `ventasDelDia()` | O(n) | `filter()` genera un arreglo nuevo de resultados. |
| `analitica.js` | `totalCiudadCadena()` | O(n) | Crea tres arreglos intermedios mediante `map()`, `filter()` y `map()`. |
| `analitica.js` | `totalCiudadUnaPasada()` | O(1)* | Utiliza un acumulador y no genera arreglos intermedios. |
| `generador.js` | `azar()` | O(1) | Realiza operaciones matemáticas simples. |
| `generador.js` | `generarVentas()` | O(n) | Crea un arreglo que almacena las ventas generadas. |
| `instrumentada.js` | `totalVendido()` | O(1) | Utiliza un acumulador y actualiza un contador existente. |
| `instrumentada.js` | `ventaMayor()` | O(1) | Utiliza una variable para almacenar el mayor valor. |
| `instrumentada.js` | `totalPorCiudad()` | O(n) | Crea un objeto que almacena los totales por ciudad. |
| `instrumentada.js` | `primeraVenta()` | O(1) | Accede directamente al primer elemento del arreglo. |
| `medir.js` | `ciclo()` | O(1) | No crea estructuras adicionales. |
| `recurrentes.js` | `clientesRecurrentes()` | O(n) | Crea un arreglo que puede crecer con la cantidad de clientes recurrentes. |

### Análisis de las funciones principales

**`totalPorCiudad()` — O(n)**

Utiliza `reduce()` para crear un objeto que almacena el total vendido por cada ciudad. Aunque su memoria depende realmente de la cantidad de ciudades diferentes, en el peor caso puede almacenar una ciudad por cada venta. Por eso se clasifica como O(n).

**`topProductosPorValor()` — O(n)**

Primero crea un objeto con los totales de cada producto. Después, `Object.entries()` genera un arreglo, `[...productos]` crea una copia y `slice()` crea otro arreglo con los primeros productos del ranking.

La memoria depende de la cantidad de productos diferentes. En el peor caso, cada venta podría tener un producto distinto, por lo que su complejidad espacial es O(n).

### Conclusión

- **O(1):** funciones que utilizan memoria adicional constante, como acumuladores, contadores o referencias.
- **O(n):** funciones que crean arreglos u objetos cuyo tamaño puede crecer proporcionalmente a los datos procesados.

**Nota:** Para esta clasificación se considera que los textos tienen una longitud limitada. Si se analiza la memoria utilizada por las cadenas, `normalizacion()` y las funciones que la llaman pueden requerir espacio adicional proporcional a la longitud del texto.

## Elección de la implementación

Decidí utilizar `totalCiudadUnaPasada()` porque realiza un solo recorrido con `for...of` y no genera arreglos intermedios.

Aunque ambas funciones tienen complejidad temporal O(n), `totalCiudadCadena()` utiliza más memoria debido a los arreglos creados por `map()` y `filter()`.

En cuanto a legibilidad, considero que `totalCiudadUnaPasada()` es fácil de entender porque utiliza un ciclo, una condición y un acumulador.

Por lo tanto, elijo `totalCiudadUnaPasada()` porque ofrece un buen equilibrio entre legibilidad y eficiencia, especialmente cuando trabajamos con grandes cantidades de ventas.


# Optimización de clientes recurrentes

## 1. Entender el problema

El marketplace necesita que los reportes del proveedor respondan en menos de un segundo cuando se procesan 100.000 ventas.

La función `clientesRecurrentes()` debe identificar los clientes que han realizado dos o más compras, evitando repetir sus identificadores en el resultado.

**Entradas:**
- `ventas`: arreglo de objetos que contienen información de las ventas.
- Cada venta contiene la propiedad `cliente`, que identifica al comprador.

**Salida:**
- Un arreglo con los identificadores de los clientes que aparecen dos o más veces.

**Restricciones:**
- No repetir clientes en el resultado.
- No modificar el arreglo original.
- Funcionar con arreglos vacíos y clientes que aparecen una sola vez.
- Evitar recorridos innecesarios.
- Cumplir el objetivo de rendimiento de menos de un segundo para 100.000 ventas.

## Ejemplos y casos borde

### Ejemplo 1. Clientes recurrentes

```js
const ventas = [
    { cliente: "C001" },
    { cliente: "C002" },
    { cliente: "C001" },
    { cliente: "C003" },
    { cliente: "C002" }
];
```

**Resultado esperado:**

```js
["C001", "C002"]
```

Los clientes `C001` y `C002` aparecen dos veces.

### Ejemplo 2. Sin clientes recurrentes

```js
const ventas = [
    { cliente: "C001" },
    { cliente: "C002" },
    { cliente: "C003" }
];
```

**Resultado esperado:**

```js
[]
```

Ningún cliente aparece más de una vez.

### Ejemplo 3. Arreglo vacío

```js
const ventas = [];
```

**Resultado esperado:**

```js
[]
```

No existen ventas para analizar.

### Ejemplo 4. Un cliente repetido varias veces

```js
const ventas = [
    { cliente: "C001" },
    { cliente: "C001" },
    { cliente: "C001" }
];
```

**Resultado esperado:**

```js
["C001"]
```

Aunque el cliente aparece tres veces, solo debe incluirse una vez en el resultado.

## 3. Fuerza bruta

La implementación original utiliza dos ciclos anidados para comparar las ventas.

```js
function clientesRecurrentes(ventas) {
    const recurrentes = [];

    for (let i = 0; i < ventas.length; i++) {
        for (let j = i + 1; j < ventas.length; j++) {
            if (
                ventas[i].cliente === ventas[j].cliente &&
                !recurrentes.includes(ventas[i].cliente)
            ) {
                recurrentes.push(ventas[i].cliente);
            }
        }
    }

    return recurrentes;
}
```

**Complejidad temporal:**

Los dos ciclos anidados realizan aproximadamente `n(n - 1) / 2` comparaciones, lo que representa O(n²).

Además, `includes()` realiza una búsqueda lineal sobre el arreglo de clientes recurrentes, por lo que el peor caso puede alcanzar O(n³).

**Complejidad espacial:** O(c), donde `c` representa la cantidad de clientes recurrentes diferentes almacenados.

**Problema principal:** se realizan comparaciones y búsquedas repetidas que aumentan considerablemente el tiempo de ejecución.

## 4. Optimizar

La estrategia consiste en reemplazar los ciclos anidados y las búsquedas con `includes()` por dos estructuras `Set`.

- `clientesVistos`: almacena los clientes encontrados por primera vez.
- `recurrentes`: almacena los clientes que aparecen dos o más veces.

Se utiliza un único ciclo `for...of` para recorrer las ventas.

### Pseudocódigo

```text
Crear conjunto clientesVistos
Crear conjunto recurrentes

Para cada venta:
    Obtener identificador del cliente

    Si el cliente ya está en clientesVistos:
        Agregar cliente a recurrentes
    Si no:
        Agregar cliente a clientesVistos

Convertir recurrentes en arreglo
Devolver resultado
```

**Beneficio esperado:** reducir la complejidad temporal a O(n) en promedio, eliminando las comparaciones anidadas.

## Intercambio entre tiempo y memoria

Se optimizó `clientesRecurrentes()` utilizando `Set` y `Map`, reduciendo la complejidad temporal de O(n²) a O(n) en promedio.

**Medición de rendimiento:**

| datos | tiempo_Set (ms) | tiempo_Map (ms) | clientesRecurrentes | clientesUnicos |
|---:|---:|---:|---:|---:|
| 1.000 | 0,188 | 0,062 | 269 | 320 |
| 10.000 | 1,366 | 0,842 | 2.666 | 3.156 |
| 100.000 | 40,145 | 14,058 | 26.632 | 31.688 |

**Análisis de resultados:**

- Con 1.000 ventas, `Map` fue aproximadamente 3 veces más rápido que `Set`.
- Con 10.000 ventas, `Map` fue aproximadamente 1,62 veces más rápido que `Set`.
- Con 100.000 ventas, `Map` fue aproximadamente 2,86 veces más rápido que `Set`.
- Al aumentar las ventas de 1.000 a 100.000, el tiempo de `Set` aumentó aproximadamente 213 veces y el de `Map` aproximadamente 227 veces.
- Los clientes recurrentes representan alrededor del 84 % de los clientes únicos en todas las pruebas.

**Intercambio entre tiempo y memoria:**

Las nuevas soluciones utilizan memoria adicional O(c) para almacenar clientes y evitar comparaciones repetidas. `Set` es adecuado para identificar si un cliente ya apareció, mientras que `Map` permite contar sus compras y ofrece mejores tiempos en las mediciones realizadas.