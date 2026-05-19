import Router from "express"
import { usersModel } from "../models/users.model.js"
import { fakerES_MX as faker } from "@faker-js/faker"

const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
    const users = await usersModel.find();
    res.send(users);
})

usersRouter.get("/test", (req, res) => {
    const name = faker.person.firstName() + " " + faker.person.lastName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const fakeUser = {name, email, password};

    res.send(fakeUser);
})

usersRouter.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await usersModel.findOne({email:email, password:password});

    if (user) {
        res.send({status:"ok", "message":"El Usuario se logueo correctamente!"});
    } else {
        res.status(400).send({status:"error", "message":"El Usuario/Contraseña es incorrecto!"});
    }
})

usersRouter.post("/create", async (req, res) => {
    const {name, email, password} = req.body;
    const newUser = {name, email, password};
    const user = await usersModel.insertOne(newUser);

    if (user) {
        res.send({status:"ok", "message":"El Usuario se creo correctamente!"});
    } else {
        res.status(400).send({status:"error", "message":"No se pudo crear el Usuario!"});
    }
})

export default usersRouter