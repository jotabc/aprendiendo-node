// ejercicio vamos a crear el comando ls de las terminales.

const fs = require('node:fs')

// fs.stat('content') -> verifica si existe un archivo.

// lee el directorio => en este caso el . es el directorio actual
// NOTA el error en las callbacks siempre será el error para manejar siempre el error y que siempre va a aver un error. En este caso no se maneja el try catch porque ne primera noes una promesa, si no se maneja con un if el error porque ya la callback ya nos da el error.
fs.readdir('.', (err, files) => {
  // handleError
  if (err) {
    console.error('Error al leer el directorio:', err)
    return; // -> con esto evitamos que se ejecute nuestro code.
  }

  //handleSuccess
  files.forEach(file => {
    console.log(file)
  })

})

