const { readFile } = require('node:fs')

// async await en commonJS -> async await no bloquea, esta siendo paralelo, Havemos las dos cosas a la vez osea, no me esperes, osea las dos lecturas en este caso lo hace junto y cuando terminene los dos devuelve la ejecucion de una promesa resuleta en este caso el promise all, asi el proceso queda aún más libre que antes bastante desocupado, cuando termina los dos estaría todo resuleto

Promise.all([
  readFile('./text.txt', 'utf-8'),
  readFile('./text2.txt', 'utf-8')
])
  .then(([text, secondText]) => {
    console.log(text)
    console.log(secondText)
  })

/* cosas buenas y malas de esto.
  Bueno:
    - Es más rapido porque hacemos 2 trabajos en paralelo. solo cuando termine los dos continua.
*/
