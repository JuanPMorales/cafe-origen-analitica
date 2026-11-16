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
