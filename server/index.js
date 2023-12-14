const express = require('express')
const db = require('./db')
const app = express()
const port = 3000
app.use(express.json())
app.get('/api/links', db.getLinks)
app.listen(port, () => {
console.log(`App running on port ${port}.`)
})