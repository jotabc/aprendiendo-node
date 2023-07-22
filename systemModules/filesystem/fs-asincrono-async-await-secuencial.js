const fs = require('node:fs/promises')

// async await en commonJS -> async await no bloquea, esta siendo secuencial. Aqui va de arriba hacia abajo pero de forma asincrono. Secuencial porque hasta que no termine lo primero no  sigue ejecuta lo siguiente aunque es asincrono es secuencial, lo malo es que el código parece sincrono se ejecuta como si fuese sincrono pero el proceso se queda libre, se liberan recursos que no esta utilizando el proceso.

console.log('Leyendo el primer archvivo...')

// IIFE - Inmediatly Invoked Function Expression Añadimos ; para que separe la función de la importación.
;(async () => {
  const text = await fs.readFile('./archivo.txt', 'utf-8')
  console.log('primer texto', text)

  console.log('---> Hace cosas mientras lee el archivo...')

  console.log('Leyendo el segundo archvivo...')
  const text2 = await fs.readFile('./archivo2.txt', 'utf-8')
  console.log('segundo texto', text2)
})()

// Para usar el async await primero como vemos arriba usar una IIFE, la segunda debemos tenemos dos forma cmabiar la extensión del archivo de .js a .mjs, porque ESM soporta usar el await sin en el cuerpo del archivo (Top Level Await)
// console.log('Leyendo el primer archvivo...')
// const text = await fs.readFile('./archivo.txt', 'utf-8')
// console.log('primer texto', text)

// console.log('---> Hace cosas mientras lee el archivo...')

// console.log('Leyendo el segundo archvivo...')
// const text2 = await fs.readFile('./archivo2.txt', 'utf-8')
// console.log('segundo texto', text)
  