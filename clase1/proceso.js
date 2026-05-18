import {Command} from "commander"

const program = new Command();
program
.option("-d <debug>", "Variable para debug", false)
.option("-p <port>", "Puerto", 8080)
.option("--mode <mode>", "Modo", "test")

program.parse();
console.log(program.opts());
console.log(program.args);
