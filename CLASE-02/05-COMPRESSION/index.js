const app = require("./src/app.js");
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server escuchando en puerto http://localhost:${PORT}`);
});


/*


"Hola Mundo"  -> "Hola Mundo"  demora 1 segundo
     
                       min 1 segundo 
"Hola Mundo" -> function comprime("Hola Mundo") -> "H1o1a1 M1u1n1d1o1"  demora 2 segundos




*/