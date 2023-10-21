import express from 'express'
import logger from 'morgan'
import { Server } from 'socket.io'
import { createServer } from 'node:http'

const PORT = process.env.PORT || 3000

const app = express()
const server = createServer(app)

// creation server socket.io
const io = new Server(server)

// io connected
io.on('connection', (socket) => {
  console.log('a user has connected!')

  socket.on('disconnect', () => {
    console.log('a user has disconnect')
  })

  // aqui estamos conectando con el socker del cliente, este chat messag, es el mismo nombre que le colocamos en el cliente socket.emit('chat message', input.value)
  socket.on('chat message', (message) => {
    io.emit('chat message', message)
  })
})

app.use(logger('dev'))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
