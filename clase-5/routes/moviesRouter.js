import { Router } from 'express'
import { MovieController } from '../controllers/moviesController.js'

export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router()
  const movieController = new MovieController({ movieModel })

  moviesRouter.get('/', movieController.getAll)
  moviesRouter.post('/', movieController.create)

  moviesRouter.get('/:id', movieController.getById)
  moviesRouter.patch('/:id', movieController.update)
  moviesRouter.delete('/:id', movieController.delete)

  return moviesRouter
}