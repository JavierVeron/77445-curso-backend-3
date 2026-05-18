const operacionCompleja = () => {
    let resultado = 0;

    for(let i=0; i<10000000000; i++) {
        resultado++;
    }

    return resultado;
}

//export default operacionCompleja

process.on("message", mesanje => {
    const resultado = operacionCompleja();
    process.send(resultado);
})