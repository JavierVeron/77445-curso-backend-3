import express from "express"
import mongoose from "mongoose"
import { addLogger } from "./utils/logger.js";
import usersRouter from "./routes/users.routes.js";

const app = express();
const port = 8080;

app.listen(port, () => {
    console.log("Servidor activo: " + port);
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(addLogger);

mongoose.connect("mongodb+srv://javierveron:<password>@codercluster.d33hyf3.mongodb.net/clase3?appName=CoderCluster")
.then(() => console.log('Conectado a MongoDB de forma exitosa'))
.catch(err => console.error('Error al conectar a la base de datos:', err));


app.get("/", (req, res) => {
    req.logger.info("Estoy en la Página Principal!");
    res.send("Estamos en la Página Principal!");
})

app.get("/admin", (req, res) => {
    req.logger.warning("Estoy en el Admin");
    res.send("Estamos en el Panel de Administración");
})

app.get("/cpanel", (req, res) => {
    req.logger.fatal("Estoy en el Panel de Administración Hosting");
    res.send("Estamos en el Panel de Administración");
})

app.get("/operacion_simple", (req, res) => {
    let total = 0;

    for (let i=0; i<100000000; i++) {
        total += i;
    }

    res.send(total);
})

app.get("/operacion_compleja", (req, res) => {
    let total = 0;

    for (let i=0; i<1000000000; i++) {
        total += i;
    }

    res.send(total);
})

app.use("/api/users", usersRouter);
