const Pool = require('pg').Pool
const pool = new Pool({
    user: 'john',
    host: 'localhost',
    database: 'favlinks',
    password: 'john',
    port: 5432,
})

const getLinks = (request, res) => {
    pool.query('SELECT url FROM favlinks ORDER BY id ASC', (error, result) => {
    if (error) {
    throw error
    }
    res.status(200).json(result.rows)
    })
}

const createUser = (request, response) => {
    const { name, url } = request.body
  
    pool.query('INSERT INTO favlinks (name, url) VALUES ($1, $2) RETURNING *', [name, url], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
  }

  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, url } = request.body
  
    pool.query(
      'UPDATE favlinks SET name = $1, url = $2 WHERE id = $3',
      [name, url, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM favlinks WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }
module.exports = {
    getLinks,deleteUser,createUser,updateUser
}