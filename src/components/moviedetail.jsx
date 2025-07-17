import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const baseapiurl = 'https://api.themoviedb.org/3';
const apikey = import.meta.env.VITE_TMDB_API;

const apioptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apikey}`,
  }
};

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`${baseapiurl}/movie/${id}`, apioptions);
        if (!res.ok) throw new Error('Failed to fetch movie');
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setError('Error fetching movie details.');
      }
    };

    fetchMovie();
  }, [id]);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!movie) return <p className="text-white text-center mt-10">Loading movie details...</p>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Poster */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={movie.backdrop_path
              ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
              : '/No-Poster.svg'}
            alt={movie.title}
            className="rounded-lg shadow-lg w-full max-h-[420px] object-cover"
          />
        </div>

        {/* Details */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-sm text-gray-300">{movie.tagline}</p>

          <div className="flex items-center gap-4 text-sm text-gray-200 mt-4">
            <span>⭐ {movie.vote_average?.toFixed(1) || 'N/A'}</span>
            <span>• {movie.original_language?.toUpperCase()}</span>
            <span>• {movie.release_date?.split('-')[0]}</span>
            <span>• {movie.runtime} mins</span>
          </div>

          <p className="mt-4 text-gray-200">{movie.overview || "No description available."}</p>

          {/* Back Button */}
          <Link
            to="/"
            className="inline-block mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default MovieDetail;
