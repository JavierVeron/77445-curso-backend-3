import chai from "chai"
import supertest from "supertest"

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Testing de Adoptme", () => {
    describe("Test de Mascotas", () => {
        it("Testeando el Post de la API de Mascotas (Error)", async () => {
            const mascota = {name:"Benita"};
            //const mascota = {name:"Benita", specie:"gata", birthdate:"09/11/2013"};

            const {statusCode, ok, _body} = await requester.post("/api/pets/").send(mascota);
            console.log(statusCode);
            console.log(ok);
            console.log(_body);
        })

        it("Testeando el Post de la API de Mascotas (Ok)", async () => {
            //const mascota = {name:"Benita"};
            const mascota = {name:"Benita", specie:"gata", birthDate:"09-11-2013"};

            const {statusCode, ok, _body} = await requester.post("/api/pets/").send(mascota);
            console.log(statusCode);
            console.log(ok);
            console.log(_body);
        })
    })

    describe("Test de Usuarios", () => {
        it("Obteniendo todos los Usuarios (Error)", async () => {
            const {statusCode, ok, _body} = await requester.get("/api/usuarios/").send();
            console.log(statusCode);
            console.log(ok);
            console.log(_body);
        })

        it("Obteniendo todos los Usuarios (Ok)", async () => {
            const {statusCode, ok, _body} = await requester.get("/api/users/").send();
            console.log(statusCode);
            console.log(ok);
            console.log(_body);
        })
    })

    describe("Testing Avanzado", () => {
        let cookie;

        it("Registrando un Usuario", async () => {
            const user = {first_name:"Sergio", last_name:"Fernandez", email:"sf@gmail.com", password:224466};
            const {statusCode, ok, _body} = await requester.post("/api/sessions/register").send(user);
            console.log(statusCode);
            console.log(ok);
            console.log(_body);
            //expect(_body);
        })
    })
})