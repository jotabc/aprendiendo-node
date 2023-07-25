// argumentos de entrada
// console.log(process.argv)

// controlar el proceso y su salida si colocamos 0 es que todo ha ido bien y temrina ahí, si es 1 es que hay un error y queremos que salga
// process.exit(1)

// podemos controlar eventos del proceso
// process.on('exit', () => {
// limpiar recursos lo que sea
// escuchar errores en concreto errores no controlados que se pasan como eventos

// })

// current working directory -> nos dice desde que carpeta estamos ejecutando el proceso.
console.log(process.cwd())

// plataforma
console.log(process.platform)

// variables de entorno pasaod desde la terminal.
console.log(process.env.PEPITO)
