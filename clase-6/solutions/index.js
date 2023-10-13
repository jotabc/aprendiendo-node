import net from 'node:net'

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
