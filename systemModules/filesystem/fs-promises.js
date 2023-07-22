const fs = require('node:fs/promises')
const { promisify } = require('node:util')

// -> Promesas - esto nos evita a usar la asincronia con callbacks, cuando se resuelve la promesa ejecuta el then. muchos de los modulos de node ya usan promesas y se pueden importar node:systemModule/promises
console.log('Leyendo el primer archvivo...')
fs.readFile('./archivo.txt', 'utf-8')
.then(text => console.log(text))

console.log('---> Hace cosas mientras lee el archivo...')

console.log('Leyendo el segundo archvivo...')
fs.readFile('./archivo2.txt', 'utf-8')
  .then(text => console.log('segundo texto', text))

// node posee una forma de trasnformar callbacks, en caso de que algun modulo no tenga /promises
// transformamos el modulo que no soporte promises para que se convuerta en promesas, SOLO PARA LOS MODULOES QUE NO TIENE PROMESAS NATIVAS.
const readFile = promisify(fs.readFile)
