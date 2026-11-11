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

|qué recorres | qué condición aplicas | qué acumulas | qué valor inicias |
|---|---|---|---|
| Todas las ventas. | Si `cantidad > 0`, calcular `cantidad * precio`. | El valor de cada venta en `totalVendido`. | `totalVendido = 0`. |
| Todas las ventas. | Si `cantidad > 0`, sumar la cantidad. | Las unidades en `totalUnidades`. | `totalUnidades = 0`. |
| Todas las ventas. | Si `cantidad > 0` y el valor de la venta es mayor que `ventaMayor`, reemplazar `ventaMayor` y guardar esa venta. | La venta de mayor valor. | `ventaMayor = 0` y `ventaMayorRegistro = null`. |
| Todas las ventas. | Si `cantidad > 0`, sumar el valor de la venta y aumentar el número de compras válidas. | `totalVendido` y `numeroCompras`. | `numeroCompras = 0`. Al final, `ticketPromedio = totalVendido / numeroCompras`. |

### Pseudocódigo

```text
totalVendido = 0
totalUnidades = 0
ventaMayor = 0
ventaMayorRegistro = nulo
numeroCompras = 0

para cada venta en ventas:
    si venta.cantidad > 0:
        valorVenta = venta.cantidad * venta.precio

        totalVendido = totalVendido + valorVenta
        totalUnidades = totalUnidades + venta.cantidad
        numeroCompras = numeroCompras + 1

        si valorVenta > ventaMayor:
            ventaMayor = valorVenta
            ventaMayorRegistro = venta

si numeroCompras > 0:
    ticketPromedio = totalVendido / numeroCompras
si no:
    ticketPromedio = 0
```
