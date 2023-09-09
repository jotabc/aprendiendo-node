import 'dotenv/config'
import express, { json } from 'express'
import { corsMiddleware } from './middlewares/corsMiddleware.js'
import { createMovieRouter } from './routes/moviesRouter.js'

export const createApp = ({ movieModel }) => {
  const app = express()

  app.use(corsMiddleware())
  app.use(json())
  app.disabled('x-powered-by')

  app.use('/movies', createMovieRouter({ movieModel }))

  const PORT = process.env.PORT || 3000

  app.listen(PORT, () => {
    console.log('Server on port', PORT)
  })
}
