const fs = require('node:fs')

// devuelve un buffer, osea memoria, bytes y así, vamos a convertir en un sistema que podemos entender (ut-f8)
// -> sincrono va de arriba hacia abajo, no puede hacer algo mientras lee un archvo, si no que lee primero luego hace otra cosa. y así sucesivamente. El proceso que está cunpliendo está ocupado todo el rato.

console.log('Leyendo el primer archvivo...')
const text = fs.readFileSync('./archivo.txt', 'utf-8')

console.log(text)

console.log('Leyendo el segundo archvivo...')
const secondText = fs.readFileSync('./archivo2.txt', 'utf-8') // -> sincrono
console.log(secondText)
