import config from "./config/config.js"
import express from "express"
//import operacionCompleja from "./operacionCompleja.js"
import {fork} from "child_process"

const app = express()
const port = config.port;
app.listen(port, () => {
    console.log(config.name);
    console.log("Servidor Activo: " + port);
});

app.get("/", (req, res) => {
    res.send(config.name)
})

process.on("message", (mensaje) => {
    console.log("[Mensaje]: " + mensaje);
})

process.on("uncaughtException", () => {
    console.log("Excepcion ejecutada!");
})

process.on("exit", () => {
    console.log("Saliendo del programa!");
})

// Antes
/* app.get("/suma", (req, res) => {
    let resultado = operacionCompleja();
    res.send("El resultado es: " + resultado);
}) */

// Con Fork
app.get("/suma", (req, res) => {    
    const child = fork("./src/operacionCompleja.js");
    child.send("Iniciando el Cálculo!");
    child.on("message", (resultado) => {
        res.send("El resultado es: " + resultado);
    })
})