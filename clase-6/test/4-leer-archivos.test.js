import { leerArchivosParalelo } from '../solutions/index.js'
import { describe, it } from 'node:test'
import { equal } from 'node:assert/strict'

describe('4. leerArchivos', () => {
  it('4.1. leerArchivos', async () => {
    const message = await leerArchivosParalelo()
    equal(message, 'Hola Como Estás.')
  })
})
