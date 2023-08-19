import express from 'express'
import { randomUUID } from 'node:crypto'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'
import { readJSON } from '../utils/readJSON.js'

const movies = readJSON('../movies.json')
export const moviesRouter = express.Router()

moviesRouter.get('/', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
    return res.json(filteredMovies)
  }
  return res.json(movies)
})

moviesRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)

  if (!movie) res.status(404).json({ message: 'Movie not found' })
  return res.json(movie)
})

moviesRouter.post('/', (req, res) => {
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

moviesRouter.patch('/:id', (req, res) => {
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

  // < 0 no lo encontro, -1 no lo encontro
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

moviesRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) res.status(404).json({ message: 'Movie not found' })

  movies.splice(movieIndex, 1)
  return res.status(204).json({ message: 'Movie deleted' })
})

// esta es un forma de colocarle los cors a las rutas PUT, PATCH Y DELETE
// moviesRouter.options('/:id', (res, req) => {
//   const origin = req.header('origin')

//   if (ACCEPTED_ORIGINS.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', '*')
//   }
// })
