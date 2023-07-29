const http = require('node:http')
const dittonJson = require('./ditto.json')

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto': {
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(dittonJson))
        }
        case '/about': {
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>About Page</h1>')
        }
        default: {
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>Not Found 404</h1>')
        }
      }

    case 'POST': {
      switch (url) {
        case '/pokemon': {
          let body = ''

          // node escucha el evento data, cuando le enviamos información en el body, la req es la que lee.
          // por evento porque node está basado en eventos.
          req.on('data', (chunk) => {
            body += chunk.toString() // toString porque chunk en un binario
          })

          // evento end, esto es si ya termino la req.
          req.on('end', () => {
            const data = JSON.parse(body)
            // podemos llamar a un DB.
            res.writeHead(201, {
              'Content-Type': 'application/json; charset=utf-8'
            })
            data.timestamp = Date.now()
            res.end(JSON.stringify(data))
          })

          break
        }

        default: {
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>Not Found 404</h1>')
        }
      }
    }
  }
}

const server = http.createServer(processRequest)

server.listen(1234, () => {
  console.log('Server is running on port http://localhost:1234')
})
