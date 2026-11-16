# Café Origen – Motor de Analítica de Ventas

## Descripción del proyecto

Café Origen es una tostadora de café de especialidad ubicada en Medellín que vende sus productos en tiendas físicas, ferias y mediante pedidos en línea a diferentes ciudades de Colombia.

Este proyecto desarrolla un motor de analítica de ventas utilizando **JavaScript y Node.js**, con el objetivo de analizar los registros de ventas y obtener información útil para la toma de decisiones.

El motor permite consultar las ventas por ciudad, identificar los productos más vendidos y calcular indicadores como el total vendido y el ticket promedio.

## Tecnologías utilizadas

- JavaScript
- Node.js
- CommonJS (`require` y `module.exports`)

## Cómo ejecutar el proyecto

1. Tener instalado Node.js.
2. Abrir el proyecto en Visual Studio Code.
3. Abrir la terminal en la carpeta principal del proyecto.
4. Ejecutar el siguiente comando:

```bash
node src/reporte.js
```

Este comando muestra en la consola el reporte de ventas.

Para ejecutar las pruebas de las funciones:

```bash
node src/verificar.js
```

## ¿Qué preguntas responde el proyecto?

- ¿Cuánto dinero se ha vendido en total?
- ¿Cuántas unidades se han vendido?
- ¿Cuánto dinero se ha vendido por ciudad?
- ¿Cuántas unidades se han vendido por producto?
- ¿Cuáles son los tres productos con mayor valor de ventas?
- ¿Cuántas ventas se realizaron en una fecha específica?
- ¿Cuál es el ticket promedio de las ventas?

## Validaciones realizadas

Se realizaron pruebas para comprobar que:

- Las ciudades escritas con diferencias de mayúsculas o espacios no se contabilicen como grupos separados.
- El ticket promedio no devuelva `NaN` cuando no existen ventas.
- Una fecha sin ventas devuelva un arreglo vacío.

## Versión

**v0.1** – Motor de analítica de ventas de Café Origen.