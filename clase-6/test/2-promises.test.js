import { obtenerDatosPromise } from '../solutions/index.js'
import { describe, it } from 'node:test'
import { equal } from 'node:assert/strict'

describe('2. obtenerDatosPromise', () => {
  it('2.1 obtenerDatosPromise', async () => {
    const { data } = await obtenerDatosPromise({ time: 1 })
    equal(data, 'datos importantes')
  })
})
