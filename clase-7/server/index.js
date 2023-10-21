import express from 'express'
import logger from 'morgan'
import dotenv from 'dotenv'

import { Server } from 'socket.io'
import { createServer } from 'node:http'
import { createClient } from '@libsql/client/web'

const PORT = process.env.PORT || 3000

const app = express()
const server = createServer(app)
dotenv.config()

// creation server socket.io
const io = new Server(server, {
  // con esto estamos esperando un tiempo en segundos para ver si el usuario se conecta o no y no perder la informaciòn en este caso no perder el mensaje enviado.
  connectionStateRecovery: {}
})

// connection DB turso.
const db = createClient({
  url: 'libsql://hardy-omega-flight-jotabc.turso.io',
  authToken: process.env.DB_TOKEN
})

db.execute(`
  CREATE TABLE IF NOT EXISTS messages(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT
  )
`)

// io connected
// ==> en el socket podemmos sacar lo que le estamos mandando en el arcvhivo html lìnea 13 en este caso lanzando socket.handshake.auth
io.on('connection', async (socket) => {
  console.log('a user has connected!')

  socket.on('disconnect', () => {
    console.log('a user has disconnect')
  })

  // aqui estamos conectando con el socker del cliente, este chat messag, es el mismo nombre que le colocamos en el cliente socket.emit('chat message', input.value)
  socket.on('chat message', async (message) => {
    let result = ''

    try {
      result = await db.execute({
        sql: 'INSERT INTO messages (content) VALUES (:content)',
        args: { content: message }
      })
    } catch (e) {
      console.error(e)
      return
    }

    io.emit('chat message', message, result.lastInsertRowid.toString())
  })

  // recuperamos los mensages anteriores
  if (!socket.recovered) {
    try {
      const results = await db.execute({
        sql: 'SELECT id, content FROM messages WHERE id > ?',
        args: [socket.handshake.auth.serverOffset ?? 0]
      })

      // sacamos los mensages de result y podemos servir hacia el cliente
      results.rows.forEach(row => {
        socket.emit('chat message', row.content, row.id.toString())
      })
    } catch (e) {
      console.error(e)
    }
  }
})

app.use(logger('dev'))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
