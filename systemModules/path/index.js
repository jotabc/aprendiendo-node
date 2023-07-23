const path = require('node:path')

// barra separadora de carpetas según SO.
console.log(path.sep)

// unir rutas con path.join(), con esto evitamos las barras en cada SO.
// const filePath = path.join('content', 'subfolder', 'test.txt')
// console.log(filePath)

// obtener el nombre de archivo, el basename nos devuelve solo el nombre del fichero, de una ruta pasada te devuelve el nombre del archivo en si en este caso password.txt
// const base = path.basename('tmp/jonnathan-secret/password.txt')
// console.log(base)

// devuelve el nombre del como arriba  sin la extensión sin el txt en este caso
// const fileWithoutExtension = path.basename('tmp/jonnathan-secret/password.txt', '.txt')
// console.log(fileWithoutExtension)

// Un muy útil es obtener la extensión del archivo.
// const fileExtension = path.extname('tmp/jonnathan-secret/image.png')
// console.log(fileExtension)

