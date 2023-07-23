const fs = require('node:fs/promises')

const folder = process.argv[2] ?? '.' 

fs.readdir(folder)
  .then(files => {
    files.forEach(file => {
      console.log(file)
    })
  })
  .catch(err => {
    // si no manejadmos los errores nos da un error interno de node. triggerUncaughtException este significa que tenmos un error no controlado, porque en un catch nosotros no podemos hacer que nuestro código no reviente.
    if(err) {
      console.error('Error al leer el directorio', err)
      return;
    }

    // podemos seguir haciendo cosas si qieremos que nuestro proceso no se detenga.
  })
