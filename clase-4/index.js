import express, { json } from 'express'
import { corsMiddleware } from './middlewares/corsMiddleware.js'
import { moviesRouter } from './routes/moviesRouter.js'

const app = express()

// middlewares
app.use(corsMiddleware())
app.use(json())
app.disabled('x-powered-by') // deshabilita el header que genera express.

// carga de las rutas al index separadas
app.use('/movies', moviesRouter)

const PORT = process.env.PORT || 3000

// levantamiento del servidor
app.listen(PORT, () => {
  console.log('Server on port', PORT)
})
