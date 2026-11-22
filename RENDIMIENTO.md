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

- **Complejidad temporal:** las funciones cuadráticas o peores presentan mayor riesgo que las lineales o constantes.
- **Complejidad espacial:** los arreglos y objetos auxiliares que crecen con los datos aumentan el consumo de memoria.
- **Tiempo medido:** los tiempos altos con 10.000 ventas indican una mayor prioridad de optimización.
- **Proyección:** el crecimiento estimado determina qué funciones pueden dejar de ser viables con datos grandes.

| Posición | Función | Nivel de riesgo | Criterio |
|---:|---|---|---|
| 1 | `clientesRecurrentes()` | Crítico | Tiene ciclos anidados y usa `includes()` dentro de las coincidencias. Su complejidad base es O(n²) y puede aproximarse a O(n³) si crece el conjunto de clientes recurrentes. Con 10.000 ventas tardó aproximadamente 460,968 ms y se proyecta a 76,83 minutos con 1.000.000. |
| 2 | `topProductosPorValor()` | Alto | Agrupa todas las ventas y después ordena los productos con O(n + u log u). El riesgo aumenta si crece la cantidad `u` de productos distintos. |
| 3 | `ventasPorCiudadM()` | Medio-alto | El recorrido es O(n), pero `filter()` crea un arreglo auxiliar de hasta `n` elementos antes de `reduce()`, por lo que su espacio es O(n). |
| 4 | `totalCiudadCadena()` | Medio-alto | Realiza varios recorridos y crea arreglos intermedios con `map()` y `filter()`. Aunque el tiempo sigue siendo O(n), ocupa O(n) de memoria temporal. |
| 5 | `totalPorCiudad()` | Medio | Recorre las ventas una vez, pero conserva un objeto con una entrada por ciudad. La memoria puede crecer hasta O(n) si todas las ciudades son distintas. |
| 6 | `unidadesPorProducto()` | Medio | Recorre las ventas una vez y acumula un objeto por producto. Puede usar O(n) de memoria si todos los productos son diferentes. |
| 7 | `ventasDelDia()` | Medio | Recorre todas las ventas y crea un arreglo de coincidencias. Puede usar O(n) de memoria si todas pertenecen a la fecha consultada. |
| 8 | `ticketPromedio()` | Medio-bajo | Tiene una sola pasada O(n) y conserva únicamente el total y el conteo de ventas, por lo que usa O(1) de espacio. |
| 9 | `ventasPorCiudad()` | Medio-bajo | Usa un recorrido lineal y una variable acumuladora constante. |
| 10 | `totalCiudadUnaPasada()` | Medio-bajo | Es lineal con O(1) de memoria y evita los arreglos intermedios de la versión encadenada. |
| 11 | `totalVendido()` | Bajo | Recorrido lineal simple con una sola variable acumuladora. |
| 12 | `unidadesVendidas()` | Bajo | Recorrido lineal simple con espacio constante. |
| 13 | `ventaMayor()` | Bajo | Recorre una vez las ventas y conserva únicamente la venta mayor encontrada. |
| 14 | `totalVendidoM()` | Bajo | Implementación lineal con `reduce()` y una sola variable acumuladora. |
| 15 | `unidadesVendidasM()` | Bajo | Implementación lineal con `reduce()` y espacio constante. |
| 16 | `generarVentas()` | Bajo | Tiene complejidad y memoria lineales porque devuelve un arreglo con `n` objetos nuevos. |
| 17 | `azar()` | Muy bajo | Es una operación aritmética constante O(1). |
| 18 | `normalizacion()` | Muy bajo | Su costo depende de la longitud del texto y no de la cantidad de ventas. |
| 19 | `valorVenta()` | Muy bajo | Multiplica dos valores en una operación constante O(1). |
| 20 | `primeraVenta()` | Muy bajo | Accede directamente al índice cero y mantiene complejidad temporal y espacial O(1). |