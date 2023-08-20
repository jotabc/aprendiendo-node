const fs = require('node:fs')

// El sistema de archivos es uno de los mas importantes de node, interesante y más utilizado.

// obtener la información de un archivo cualquiera. (sincrono)
const stats = fs.statSync('./archivo.txt')
console.log(
  stats.isFile(),
  stats.isDirectory(),
  stats.isSymbolicLink(),
  stats.size
)
