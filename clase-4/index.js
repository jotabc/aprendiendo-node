import cors from 'cors'
import express, { json } from 'express'
import { randomUUID } from 'node:crypto'
import { validateMovie, validatePartialMovie } from './schemas/movies.js'
import { readJSON } from './utils/readJSON.js'

const movies = readJSON('../movies.json')

const app = express()
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080', // pueden ser locales
      'https://movies.com' // como de producción.
    ]
    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))

app.use(json())

app.disabled('x-powered-by') // deshabilita el header que genera express.

const ACCEPTED_ORIGINS = [
  'http://localhost:8080', // pueden ser locales
  'https://movies.com' // como de producción.
]

app.get('/', (req, res) => {
  res.json({
    message: 'Hola mundo'
  })
})

app.get('/movies', (req, res) => {
  const origin = req.header('origin')

  if (ACCEPTED_ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', '*')
  }
  const { genre } = req.query

  if (genre) {
    const filteredMovies = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
    return res.json(filteredMovies)
  }

  return res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)

  if (!movie) res.status(404).json({ message: 'Movie not found' })
  return res.json(movie)
})

// POST
app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res
      .status(400)
      .json({
        error: JSON.parse(result.error.message)
      })
  }

  const newMovie = {
    id: randomUUID(), // uuid v4 crypto también funciona en el navegador.
    ...result.data // ahora esta bien pasarlo así porque esta validado los datos ya.
  }

  movies.push(newMovie)
  return res.status(201).json(newMovie)
})

// UPDATE
app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res
      .status(400)
      .json({
        error: JSON.parse(result.error.message)
      })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  // < 0 no lo encontro, === -1 no lo encontro
  // usamos aquí el findIndex porque en una sola operación tenemos el índice que lo usaremos para actualizar
  // y además puedo saber si esta o no está
  if (movieIndex === -1) res.status(404).json({ message: 'Movie not found' })

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  // actualizamos esa pelicula en ese indice del array solo en este caso porque estamos usando array.
  movieIndex[movieIndex] = updateMovie

  return res.json(updateMovie)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) res.status(404).json({ message: 'Movie not found' })

  movies.splice(movieIndex, 1)
  return res.status(204).json({ message: 'Movie deleted' })
})

app.options('/movies/:id', (res, req) => {
  const origin = req.header('origin')

  if (ACCEPTED_ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', '*')
  }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('Server on port', PORT)
})
