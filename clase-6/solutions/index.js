import net from 'node:net'
import fs from 'node:fs'
import fsp from 'node:fs/promises'

export const ping = (ip, callback) => {
  // punto de incio de ejecución del método ping.
  const startTime = process.hrtime()

  const client = net.connect({ port: 80, host: ip }, () => {
    client.end()
    // esto no valía
    // return { time: process.hrtime(startTime), ip }

    // enn node el primer parámetro de una callback es el error.
    callback(null, { time: process.hrtime(startTime), ip })
  })

  client.on('error', (err) => {
    client.end()
    callback(err)
  })
}

ping('midu.dev', (err, info) => {
  if (err) console.error(err)
  else console.log(info)
})

// EJERCICIO 2
export const obtenerDatosPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: 'datos importantes' })
    }, 2000)
  })
}

// then
obtenerDatosPromise()
  .then(info => console.log(info))
  .catch(e => console.err(e))

// await
// try {
//   const info = await obtenerDatosPromise()
//   console.log(info)
// } catch(e) {
//   console.error(e)
// }

// EJERCICIO 3
export const procesarArchivo = (callback) => {
  const handleWriteFile = error => {
    if (error) {
      console.error('Error guardando archivo:', error.message)
      callback(error)
    }

    console.log('Archivo procesado y guardado con éxito')
    callback(null)
  }

  const handleReadFile = (error, contenido) => {
    if (error) {
      console.error('Error leyendo archivo:', error.message)
      callback(error)
    }

    const textoProcesado = contenido.toUpperCase()
    fs.writeFile('output.txt', textoProcesado, handleWriteFile)
  }

  fs.readFile('input.txt', 'utf8', handleReadFile)
}

export const procesarArchivoPromises = async () => {
  let contenido = ''

  // try {
  //   contenido = await fsp.readFile('input.txt', 'utf8')
  // } catch (error) {
  //   console.error('Error leyendo archivo:', error.message)
  //   throw error
  // }

  contenido = await fsp.readFile('input.txt', 'utf8')
    .catch(e => {
      console.error('Error leyendo archivo:', e.message)
      return '' // con esto evitamos que se corte la ejecución de nuestra función.
    })

  const textoProcesado = contenido.toUpperCase()

  try {
    await fsp.writeFile('output.txt', textoProcesado)
  } catch (error) {
    console.error('Error guardando archivo:', error.message)
    throw error
  }
}

await procesarArchivoPromises()

// EJERCICIO 4
export const leerArchivosSecuencial = async () => { // form asincrona pero secuencial, hasta que no termina de leer el primero no lee el segundo
  console.time('leerArchivos')
  const archivo1 = await fsp.readFile('archivo1.txt', 'utf8')
  const archivo2 = await fsp.readFile('archivo2.txt', 'utf8')
  const archivo3 = await fsp.readFile('archivo3.txt', 'utf8')

  console.timeEnd('leerArchivos')
  return `${archivo1} ${archivo2} ${archivo3}`
}

// form asincrona paralelo, aquí si ahorramos tiempo, esto hace las 3 de golpe conforme las hace me vas dando el control según el orden de como termina me da la respuesta. En cambio con el promise all tenemos un problema que si una promesa falla, todo falla y no devuelve nada.
export const leerArchivosParalelo = async () => {
  console.time('leerArchivos')

  // const [archivo1, archivo2, archivo3] = await Promise.all([
  //   fsp.readFile('archivo1.txt', 'utf8'),
  //   fsp.readFile('archivo2.txt', 'utf8'),
  //   fsp.readFile('archivo3.txt', 'utf8')
  // ]).catch(err => {
  //   console.error(err)
  //   return []
  // })

  // con esto allSettled nos pemrite tener el control más granular de si falla o no.
  const [archivo1, archivo2, archivo3] = await Promise.allSettled([
    fsp.readFile('archivo1.txt', 'utf8'),
    fsp.readFile('archivo2.txt', 'utf8'),
    fsp.readFile('archivo3.txt', 'utf8')
  ]).catch(err => {
    console.error(err)
    return []
  })

  const message = [archivo1.value, archivo2.value, archivo3.value]
    .filter(i => typeof i !== 'undefined')
    .join(' ')

  console.timeEnd('leerArchivos')
  console.timeEnd(message)
  return message // con allSettled

  // return `${archivo1} ${archivo2} ${archivo3}`
}

leerArchivosParalelo()

// Ejercicio 5
export const delay = async (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}

// limpiando el timeout
// export const delay = async (time) => {
//   let timeoutId
//   const promise = new Promise(resolve, () => {
//     timeoutId = setTimeout(resolve, time)
//   })

//   return {
//     clearTimeout: () => clearInterval(timeoutId),
//     promise
//   }
// }

// delay(3000).then(() => console.log('Hola mundo'))
// o..
// await delay(3000)
const { promise, clearTimeout } = delay(500)
await promise() // <-- a lo mejor no se resuelve nunca
clearTimeout()

// Ejercicio 6
