import { readFileSync } from 'node:fs'

const parseEnv = (env) => {
  const lines = env.split('\n')

  lines.forEach(line => {
    const [key, ...value] = line.split('=')
    const valueString = value.join('')
    const hasQuotes = valueString.startsWith('"') && valueString.endsWith('"')
    const valueToStore = hasQuotes ? valueString.slice(1, -1) : valueString
    process.env[key] = valueToStore
  })
}

export const config = ({ path = '.env' } = {}) => {
  try {
    const env = readFileSync(path, 'utf8')
    parseEnv(env)
  } catch (e) {
    console.error(e)
  }
}

const dotenv = {
  config
}

export default dotenv
