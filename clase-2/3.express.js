const ditto = require('./ditto.json')

const express = require('express')
const app = express()

app.disable('x-powered-by') // desabilitamos la cabecera por defecto que envia express.

const PORT = process.env.PORT || 1234

// middleware que transforma el req.body a un objeto json. esto hace lo mismo que el ejm de abajo. solo que con la ayuda de express es una linea de código.
app.use(express.json())

// ejm de trasnforma la req.body a un objeto json.
/* app.use((req, res, next) => {
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  // solo llegan request que son POST y que tienen el header content-type application/json
  let body = ''

  req.on('data', (chunk) => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    // mutar la req y meter la información en el req.body
    req.body = data
    next()
  })
}) */

app.get('/pokemon/ditto', (req, res) => {
  res.status(200).json(ditto)
  // res.json({ message: 'Hola mundo!' })
})

app.post('/', (req, res) => {
  res.status(200).json(req.body)
})

// las rutas tiene que ir en orden al menos está que es un 404, porque es la última a la que va a llegar
// el use significa que para cualquier ruta sea get post etc hace la función
app.use((req, res) => {
  res.status(404).send('<h1>404 - Not Found</h1>')
})

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`)
})
