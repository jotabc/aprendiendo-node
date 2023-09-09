import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  constructor ({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await this.movieModel.getAll({ genre })
    return res.json(movies)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const movie = await this.movieModel.getById({ id })
    if (!movie) res.status(404).json({ message: 'Movie not found' })
    return res.json(movie)
  }

  create = async (req, res) => {
    const result = validateMovie(req.body)

    if (result.error) {
      return res
        .status(400)
        .json({
          error: JSON.parse(result.error.message)
        })
    }

    const newMovie = await this.movieModel.create({ input: result.data })
    return res.status(201).json(newMovie)
  }

  update = async (req, res) => {
    const result = validatePartialMovie(req.body)

    if (!result.success) {
      return res
        .status(400)
        .json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const updatedMovie = await this.movieModel.update({ id, input: result.data })
    return res.json(updatedMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.movieModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json({ message: 'Movie deleted' })
  }
}
