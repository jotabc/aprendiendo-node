import { describe, it, beforeEach, afterEach } from 'node:test'
import { equal } from 'node:assert/strict'
import { unlinkSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { config } from '../solutions/dotenv.js'

describe('6. dotenv', () => {
  beforeEach(() => {
    // clean process.env
    for (const key of Object.keys(process.env)) {
      delete process.env[key]
    }
  })

  afterEach(() => {
    try {
      unlinkSync('.env')
    } catch { }

    try {
      unlinkSync('./test/.env.local')
    } catch { }
  })

  it('1.1. load .env file', () => {
    // create .env file in root directory
    writeFileSync('.env', 'PORT=3000\nTOKEN="123abc"')
    config()

    equal(process.env.PORT, '3000')
    equal(process.env.TOKEN, '123abc')
  })

  it('6.2. load .env file from custom path', () => {
    // create .env file in root directory
    writeFileSync('./test/.env.local', 'PORT=3000\nTOKEN="123abc"')
    config({ path: './test/.env.local' })

    equal(process.env.PORT, '3000')
    equal(process.env.TOKEN, '123abc')
  })

  it('6.3 it works even without .env file', () => {
    config()
    equal(process.env.TOKEN, undefined)
  })

  it('6.4 dont use dotenv dependency', () => {
    // check that dotenv dependency is not installed
    try {
      const require = createRequire(import.meta.url)
      require('dotenv')
    } catch (error) {
      equal(error.code, 'MODULE_NOT_FOUND')
    }
  })
})
