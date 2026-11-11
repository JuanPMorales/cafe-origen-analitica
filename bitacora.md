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

