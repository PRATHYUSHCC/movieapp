
import fetch from 'node-fetch';
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

const TMDB_API_KEY = process.env.VITE_TMDB_API;

const apiUrl = 'https://api.themoviedb.org/3/trending/movie/day';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
};

async function saveTrendingMovies() {
  try {
    const res = await fetch(apiUrl, options);
    const data = await res.json();

    for (const movie of data.results) {
      const {
        id: tmdb_id,
        title,
        overview,
        poster_path,
        release_date,
        popularity
      } = movie;

      await pool.query(
        `INSERT INTO trending_movies (tmdb_id, title, overview, poster_path, release_date, popularity)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (tmdb_id)
         DO UPDATE SET
           title = EXCLUDED.title,
           overview = EXCLUDED.overview,
           poster_path = EXCLUDED.poster_path,
           release_date = EXCLUDED.release_date,
           popularity = EXCLUDED.popularity;`,
        [tmdb_id, title, overview, poster_path, release_date, popularity]
      );
    }

    console.log(" Trending movies saved to the database.");
  } catch (err) {
    console.error(" Failed to fetch/store trending movies:", err.message);
  } finally {
    await pool.end();
  }
}

saveTrendingMovies();
