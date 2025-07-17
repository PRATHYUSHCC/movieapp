import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
const port = 5000;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

// Trending movies route
app.get('/api/trending', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM trending_movies ORDER BY popularity DESC LIMIT 20'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching trending movies:', err.message);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`✅ Backend API running at http://localhost:${port}`);
});
