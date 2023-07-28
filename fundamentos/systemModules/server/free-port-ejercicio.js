// net es como http pero más liviano nos permite hacer ocnexiones más rapidoa, nos permite hacer conexiones con el protocolo tcp, es más rápido porque no envia muchas cabeceras, y también nos permitira preguntar si ese servicor esta o no abierto y levantarlo o no.
const net = require('node:net')

function findAvailablePort (desiredPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer()

    server.listen(desiredPort, () => {
      const { port } = server.address()
      server.close(() => {
        resolve(port)
      })
    })

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        // el puerto 0 significa que tomará cualquier puerto que tenga libre
        findAvailablePort(0).then(port => resolve(port))
      } else {
        reject(err)
      }
    })
  })
}

module.exports = { findAvailablePort }
