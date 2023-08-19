import { randomUUID } from 'node:crypto'
import { readJSON } from '../utils/readJSON.js'

const movies = readJSON('../movies.json')

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      return movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }

    return movies
  }

  static async getById ({ id }) {
    const movie = movies.find(movie => movie.id === id)
    return movie
  }

  static async create ({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input
    }

    movies.push(newMovie)
    return newMovie
  }

  static async update ({ id, input }) {
    // encontrar el indice del elemento a modificar
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    // modificar el elemento
    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input
    }

    return movies[movieIndex]
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false
    movies.splice(movieIndex, 1)
    return true
  }
}

// findIndex < 0 no lo encontro, -1 no lo encontro
