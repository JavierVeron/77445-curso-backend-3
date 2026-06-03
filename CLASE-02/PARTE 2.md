# Optimización

Etapas:

- dev
- test
- tag - staging
- prod

## Objetivos de la Clase

- Comprender las implicaciones de un servidor en un entorno de producción.
- Identificar buenas prácticas para optimizar el rendimiento del servidor.
- Implementar modelos prácticos de optimización en aplicaciones Express.

---

## 🗺️ Mapa de Conceptos

- Rendimiento en producción
- Compresión (Gzip y Brotli)
- Middleware para manejo de errores
- Flujo de errores

---

## Rendimiento en Producción

### La realidad de un servidor

Cuando nuestro servidor comienza a incorporar muchas herramientas y funcionalidades, es fácil olvidarse del impacto que esto puede tener en producción. En entornos reales:

> **El exceso de carga puede ralentizar el servidor y arruinar la experiencia de usuario.**

**Pregunta clave:**

> ¿Qué tanto de lo que colocamos en un servidor es realmente útil para el usuario?

---

## Prácticas para Optimización del Servidor

### 1. Usar funciones asíncronas

- JS es **no bloqueante**. Permite realizar tareas en paralelo como lecturas de archivos o consultas a bases de datos.
- Usa `async/await` correctamente para mejorar tiempos de respuesta.

### 2. Logging eficiente

- Elimina `console.log()` innecesarios.
- Implementa loggers como `winston` o `pino`:
  - Loguean de forma diferente según el entorno (`development`, `production`).
  - Ayudan a rastrear errores y mejorar el rendimiento.

### 3. Configurar `NODE_ENV=production`

- Express habilita optimizaciones internas:
  - Cacheo de vistas y archivos estáticos.
  - Menos mensajes verbosos de error.

```bash
NODE_ENV=production node app.js
```

```js
if (NODE_ENV === "production") {
  logger.level = "error";
} else {
  logger.level = "debug";
}
```

### 4. Clusterizar la aplicación

- Usa `cluster` o PM2 para levantar múltiples instancias de la app.
- Aprovecha mejor los múltiples núcleos de CPU.

```js
const cluster = require('cluster')
cluster.fork <-
```

```bash
wmic cpu get NumberOfCores,NumberOfLogicalProcessors
```

```
NumberOfCores  NumberOfLogicalProcessors
4              8
```

8 Instancias -> o workers -> o process

### 5. Reinicio automático del servidor

- Usa un manejador de procesos como [PM2](https://pm2.keymetrics.io/):
  - Monitorea procesos.
  - Reinicia en caso de error.
  - Mantiene tu app "viva".

```bash
  pm2 -v
```

```bash
  npm install -g pm2
```

```bash
pm2 start app.js --name miServidor
```

```bash
pm2 start app.js --name my-app --watch --max-restarts 10 --restart-delay 5000
```

```bash
pm2 status
pm2 list
pm2 stop miServidor
pm2 delete miServidor
```

### 6. Manejo correcto de errores

- Utiliza `try/catch`, `next(err)` y middlewares de error.
- Evita que un error detenga el servidor completo.

```js
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Algo salió mal");
});
```

### 7. ⚖️ Balanceo de carga

- Distribuye peticiones entre varias instancias.
- Usa un **proxy inverso** (Nginx) o PM2 con modo `cluster`.

Combinación Ideal

````
Internet (client)
   ↓
Load Balancer
   ↓
Proxy Inverso (es el que recibe las peticiones y las distribuye)
   ↓
  App Servers

### 8. 📦 Compresión

* Reduce tamaño de las respuestas HTTP.
* Middleware `compression`:

  ```bash
  npm install compression
````

```js
const compression = require("compression");
app.use(compression());
```

---

Descanso de 10 min - VOLVEMOS A LAS 19:36

## Compresión: Gzip vs Brotli

### ¿Qué es la compresión?

Reduce el tamaño de los archivos enviados del servidor al cliente.

- Algoritmos comunes:
  - `deflate`
  - `gzip`
  - `brotli (br)`

### Gzip

- Estándar clásico.
- Buen rendimiento y velocidad.
- Compatible con todos los navegadores modernos.

### Brotli

- Creado por Google.
- Mayor eficiencia de compresión (\~30% mejor que gzip).
- Requiere más CPU.
- Compatible con navegadores modernos.

#### Ejemplo de uso (con `compression`):

```js
const compression = require("compression");
const app = express();

app.use(
  compression({
    brotli: {
      enabled: true,
      zlib: {},
    },
  }),
);
```

---

## Middleware para Manejo de Errores

### ¿Por qué es importante?

- Los errores mal gestionados pueden colapsar el servidor.
- La prevención y diagnóstico rápido ahorra tiempo y mejora la estabilidad.

### Flujo de errores sugerido

1. Registrar errores comunes en una **librería de errores**.
2. Utilizar middlewares personalizados para errores.
3. Implementar logs separados para errores (`logger.error`).

---

## Conclusión

> **Optimizar un servidor no es solo hacerlo rápido, sino hacerlo resistente, mantenible y preparado para escalar.**

- La producción requiere planificación.
- Cada pequeña mejora (compresión, errores, logs, procesos) suma a una **gran experiencia de usuario**.

---

## Diferencia entre pm2 y nginx

- **PM2** es un manejador de procesos para Node.js que permite ejecutar, monitorear y mantener aplicaciones en producción. Facilita el manejo de múltiples instancias, reinicios automáticos y balanceo de carga a nivel de aplicación.
- **Nginx** es un servidor web y proxy inverso que se utiliza para servir contenido estático, manejar conexiones concurrentes y distribuir la carga entre múltiples servidores de aplicaciones.
- Nginx se sitúa delante de PM2, actuando como un proxy inverso que recibe las solicitudes del cliente y las redirige a las instancias de la aplicación gestionadas por PM2.