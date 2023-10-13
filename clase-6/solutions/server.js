import express from 'express'

export const app = express()
app.use(express.json()) // <-- hace que podamos leer el body

const items = [{
  id: 1,
  content: 'Item 1'
}]

app.get('/items', (req, res) => {
  return res.json(items)
})

app.get('/items/:id', (req, res) => {
  const { id } = req.params
  const item = items.find(i => i.id === Number(id))
  return res.json(item)
})

app.post('/items', (req, res) => {
  const { content } = req.body

  const newItem = {
    id: items.length + 1,
    content
  }

  items.push(newItem)

  return res.json(newItem)
})

app.put('/items/:id', (req, res) => {
  // midu
  // const { id } = req.params
  // const { content } = req.body
  // const item = items.findIndex(i => i.id === id)
  // item.content = content
  // return res.json(items)

  const { id } = req.params
  const { content } = req.body
  const item = items.findIndex(i => i.id === id)

  if (!item) {
    return res.status(404)
  }

  const updatedItem = {
    content
  }

  items[item] = updatedItem

  return res.json(items)
})

app.delete('/items/:id', (req, res) => {
  const { id } = req.params
  const itemIndex = items.findIndex(i => i.id === id)

  if (itemIndex === -1) {
    return res.status(404)
  }

  // se usa el splice para mutar el array, porque el filter devuelve un array nuevo.
  // con el splice estamos simulando mejor como funciona un db
  items.splice(itemIndex, 1)
  return res.status(200).json()
})

export const server = app.listen(process.env.PORT ?? 3000)
