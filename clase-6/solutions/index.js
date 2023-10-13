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
