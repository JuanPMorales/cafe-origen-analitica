# Café Origen — Analítica de ventas

## Descripción

Café Origen es un proyecto de analítica para una tostadora de café de especialidad ubicada en Medellín. El motor procesa registros de ventas para generar indicadores y apoyar decisiones sobre ciudades, productos, clientes y períodos de venta.

Está desarrollado en JavaScript para Node.js y utiliza módulos CommonJS. Los datos de ejemplo están incluidos en el proyecto; no se requieren paquetes externos.

## Cómo ejecutarlo

Se requiere tener Node.js instalado. Desde la carpeta raíz del proyecto, ejecuta:

```bash
node src/reporte.js
```

El comando muestra en la terminal el reporte de ventas con los datos incluidos y una comparación de rendimiento entre las versiones del reporte para conjuntos de ventas generados.

Para ejecutar las verificaciones disponibles:

```bash
node src/verificar.js
```

No se requiere instalar dependencias con un gestor de paquetes.

## Preguntas que responde

- ¿Cuál es el valor total vendido y cuántas unidades se vendieron?
- ¿Cuánto se vendió en cada ciudad y cuántas unidades se vendieron por producto?
- ¿Cuáles son los productos con mayor valor de ventas?
- ¿Cuántas ventas se realizaron en una fecha específica?
- ¿Cuál es el ticket promedio?
- ¿Qué clientes realizaron más de una compra y cuántas compras hizo cada cliente?
- ¿Cuál es el producto más vendido en cada ciudad?
- ¿Cuál es el primer cliente que aparece una sola vez?
- ¿Qué período consecutivo de días tuvo las mayores ventas?
- ¿Qué combinación de dos productos se ajusta a un valor o presupuesto?

## Estructura del proyecto

```text
.
├── README.md
├── RENDIMIENTO.md
├── bitacora.md
└── src/
    ├── analitica.js
    ├── catalogo.js
    ├── datos.js
    ├── explorar.js
    ├── generador.js
    ├── instrumentada.js
    ├── medir.js
    ├── optimizadas.js
    ├── recurrentes.js
    ├── reporte.js
    └── verificar.js
```

### Archivos principales

- `src/datos.js`: registros de ventas de ejemplo.
- `src/catalogo.js`: catálogo de productos y precios.
- `src/analitica.js`: cálculos de ventas, unidades, ciudades, productos, fechas y ticket promedio.
- `src/optimizadas.js`: consultas adicionales y algoritmos optimizados, como clientes recurrentes, producto estrella por ciudad, mejor semana y combinaciones de productos.
- `src/generador.js`: generación de ventas aleatorias para pruebas y mediciones.
- `src/reporte.js`: compone y muestra el reporte de ventas y la comparación de rendimiento.
- `src/verificar.js`: verificaciones de resultados y casos de prueba de las funciones analíticas.

### Archivos de exploración y rendimiento

- `src/explorar.js`: inspección de los datos de ventas.
- `src/instrumentada.js`: funciones que cuentan las operaciones ejecutadas.
- `src/medir.js`: mediciones de operaciones y tiempos con distintos tamaños de datos.
- `src/recurrentes.js`: medición de la estrategia de fuerza bruta para encontrar clientes recurrentes.
- `RENDIMIENTO.md`: análisis de complejidad, mediciones y riesgos de rendimiento.
- `bitacora.md`: registro del desarrollo y de las actividades del proyecto.
