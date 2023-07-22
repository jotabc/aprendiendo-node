const os = require('node:os')

console.log('Información del SO.')
console.log('-------------------')

console.log('Nombre del SO.',os.platform())
console.log('Versión del SO.', os.release())
console.log('Arquitectura', os.arch())
console.log('CPUs', os.cpus()) // -> podemos escalar procesos de node
console.log('Memoria libre', os.freemem() / 1024 /1024) 
console.log('Memoria total', os.totalmem() / 1024 /1024)
console.log('uptime', os.uptime() / 60 /60) // -> nos indica el timepo que tiene encendido nuestro pc.
