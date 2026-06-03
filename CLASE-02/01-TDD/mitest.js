

// TDD - con filosofía de test first development, primero escribimos el test, luego el código 

// Ejercicio, realizar una calculadora que sume, reste, multiplique y divida dos números

/*
function calculadora

input: numero1, numero2, operacion (string)

output: resultado de la operación (tipo number)


*/

function test_calculadora(cb, numero1, numero2, operacion, resultado_esperado) {
    const resultado_obtenido = cb(numero1, numero2, operacion);
    if (resultado_obtenido === resultado_esperado) {
        console.log('Test passed');
    } else {
        console.log('Test failed');
        console.log(`Expected: ${resultado_esperado}, but got: ${resultado_obtenido}`);
    }
}
