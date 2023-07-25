const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.'

async function ls (folder) {
  let files

  try {
    files = await fs.readdir(folder)
  } catch (error) {
    // si no manejadmos los errores nos da un error interno de node. triggerUncaughtException este significa que tenmos un error no controlado, porque en un catch nosotros no podemos hacer que nuestro código no reviente.
    console.error(pc.red(`Error al leer el directorio ${folder}`))
    process.exit(1)
  }

  const filesPromises = files.map(async file => {
    // obtenemos el filePath de cada archivo
    const filePath = path.join(folder, file)
    let stats
    try {
      // obtenemos el stat de cada uno, stat nos da la infrormación del archivo
      stats = await fs.stat(filePath)
    } catch {
      console.log(`No se puedo obtener el archivo ${filePath}`)
      process.exit(1)
    }

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f'
    const fileSize = stats.size
    const fileModified = stats.mtime.toLocaleString()

    return `${fileType} ${pc.blue(file.padEnd(20))} ${pc.green(fileSize.toString().padStart(10))} ${pc.yellow(fileModified)}`
  })

  const filesInfo = await Promise.all(filesPromises)

  filesInfo.forEach(fileInfo => console.log(fileInfo))
}

ls(folder)
