import dotenv from "dotenv"
import {Command} from "commander"

//const entorno = "PRODUCCION";
const program = new Command();
program.option("--mode <mode>", "Entorno", "desarrollo");
program.parse();

dotenv.config({
    //path:entorno.toUpperCase() == "PRODUCCION" ? "produccion.env" : "desarrollo.env"
    path:program.opts().mode == "produccion" ? "produccion.env" : "desarrollo.env"
})

export default {
    name:process.env.name,
    port:process.env.port
}