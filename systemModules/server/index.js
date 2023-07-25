const http = require('node:http')
const { findAvailablePort } = require('./free-port-ejercicio')

const desiredPort = process.env.PORT ?? 3000

// un servidor solo puede hacer dos cosas recibir una petición o devolver una respuesta
const server = http.createServer((req, res) => {
  console.log('Request recived')
  res.end('Hola mundo')
})

findAvailablePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`)
  })
})
