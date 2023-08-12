const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Title must be a string',
    required_error: 'Title is required'
  }),
  year: z.number().int().positive().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  // podemos colocar .optional, .nullable.
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Comedy', 'Drama', 'Horror', 'Thriller', 'Sci-Fi', 'Adventure', 'Crime']),
    {
      required_error: 'Genre is required',
      invalid_type_error: 'Genre must be an array of enum Genre'
    }
  )
})

// safeParse es parecido al parse, nos ayuda a gestionar mejor el error sin tener que usar un try catch, porque este nos devuelve un objeto result que nos va a decir si hay un error o si hay datos, y con un if podemos manejar el error tambien hay el safeParseAsync
function validateMovie (object) {
  return movieSchema.safeParse(object)
}

// partial hace que todas y cada una de las props del objeto sean opcionales, si no estánno importa.
// pero su están las valida como se supone que lo tiene que validar así aprovechamos nuetsra validate.
function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
