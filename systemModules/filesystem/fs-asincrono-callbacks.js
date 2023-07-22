const fs = require('node:fs/promises')

// -> Asincrono con callbacks, el callback se ejecuta cuando termine un evento, el proceso está ocupado al principio, osea el proceso no siempre pasa ocupado, en el tiempo de ese proceso no ocupado no hace absolutamente nada. Es decir va de trozito en trozito y mientras estamos esperando que termine no hago nada, porque espero el evento qu eme indique que ha terminado de leer el archivo, sigue y se ecnuentra con ptro evento osea el segundo leido. cualquiera de los dos que termine ejecuta el código que tenga o promesa resuelta. Aquí nuestri procesador no está sufriendo. 
console.log('Leyendo el primer archvivo...')
// readFile metodo para leer archivos en asincrono.
fs.readFile('./archivo.txt', 'utf-8',(err, text) => {
  console.log(text)
})

console.log('Hace cosas mientras lee el archivo...')

console.log('Leyendo el segundo archvivo...')
fs.readFile('./archivo2.txt', 'utf-8', (err, text) => {
  console.log('segundo texto', text)
})
