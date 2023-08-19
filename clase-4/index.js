import express, { json } from 'express'
import { corsMiddleware } from './middlewares/corsMiddleware.js'
import { moviesRouter } from './routes/moviesRouter.js'

const app = express()

app.use(corsMiddleware())
app.use(json())
app.disabled('x-powered-by')

app.use('/movies', moviesRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('Server on port', PORT)
})
