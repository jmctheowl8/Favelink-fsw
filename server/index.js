import { express } from 'express'
const express = require('express')
const cors = require('cors')
const db = require('./db')
const app = express()
const port = 3000
app.use(express.json())
app.use(cors())
app.get('/api/links', db.getLinks)
app.listen(port, () => {
console.log(`App running on port ${port}.`)
})