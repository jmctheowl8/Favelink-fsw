const Pool = require('pg').Pool
const pool = new Pool({
    user: 'john',
    host: 'localhost',
    database: 'favlinks',
    password: 'john',
    port: 5432,
})

const express = require('express');
const router = express.Router();

router.use(express.json());

// GET /api/favlinks
router.get('/favlinks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM favlinks');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching favlinks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  
router.post('/favlinks', async (req, res) => {
    try {
      const { name, url } = req.body;
  
      if (!name || !url) {
        return res.status(400).json({ error: 'Name and URL are required' });
      }
  
      const result = await pool.query(
        'INSERT INTO favlinks (name, url) VALUES ($1, $2) RETURNING *',
        [name, url]
      );
  
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating favlink:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  router.put('/favlinks/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, url } = req.body;
  
      const result = await pool.query(
        'UPDATE favlinks SET name = $1, url = $2 WHERE id = $3 RETURNING *',
        [name, url, id]
      );
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating favlink:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.delete('/favlinks/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query('DELETE FROM favlinks WHERE id = $1', [id]);
  
      res.json({ message: 'Favlink deleted successfully' });
    } catch (error) {
      console.error('Error deleting favlink:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;