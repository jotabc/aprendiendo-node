import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3310,
  password: 'movies',
  database: 'movies'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    // en result tenemos un array de dos posiciciones, 1) los datos de la tabla, 2) la informacion de la tabla los campos,tipos ecc.
    // result[0]
    // const result = await connection.query() o

    // TODO: filter by genre
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()
      const [genres] = await connection.query(
        // evitar esto estamos expuestos a que el cliente haga un SQLinyection
        // 'SELECT id, name  FROM genres WHERE LOWER(name) = ${lowerCaseGenre};',

        // con esto evitamos la inyeccion de dependecias, asi tranforma a un cadena de texto que no se puede evaluar.
        'SELECT id, name  FROM genres WHERE LOWER(name) = ?;',
        [lowerCaseGenre]
      )

      if (genres.length === 0) return []

      return []

      // const [{ id }] = genres

      // get all movies ids from database table
      // query movies_genre
      // join
      // return results
    }

    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movies'
    )
    return movies
  }

  static async getById ({ id }) {
    const [movie] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movies WHERE id = UUID_TO_BIN(?);', [id]
    )
    return movie
  }

  static async create ({ input }) {
    const {
      title,
      year,
      director,
      duration,
      poster,
      rate
      // genre: genreInput // genre is an array
    } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        'INSERT INTO movies (id, title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);',
        [uuid, title, year, director, duration, poster, rate]
      )
    } catch (e) {
      throw new Error(e)
      // no debemos permitir que el usuario lea el e como tal porque puede enviar información sensible.

      // can be send the error to inside services
    }

    // const result = await connection.query(
    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movies WHERE id = UUID_TO_BIN(?);', [uuid]
    )
    return movies[0]
  }

  static async delete ({ id }) {
    try {
      await connection.query(
        'DELETE FROM movies WHERE id = UUID_TO_BIN(?);', [id]
      )
    } catch (e) {
      throw new Error('Error deleting movie')
    }
  }

  static async update ({ id, input }) {
    try {
      await connection.query(
        'UPDATE movies SET ? WHERE id = UUID_TO_BIN(?);', [input, id]
      )
    } catch (e) {
      throw new Error('Error updating movie')
    }

    const [movieUpdated] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movies WHERE id = UUID_TO_BIN(?);', [id]
    )
    return movieUpdated[0]
  }
}
