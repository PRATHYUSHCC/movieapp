import React from "react";
import { Link } from "react-router-dom";
import usefetchtrending from './usefetchtrending';

const Trendingsection = () => {
  const { trendingmovies, loading, error } = usefetchtrending();

  if (loading) {
    return <p className="text-center text-white">Loading trending movies...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error fetching trending movies</p>;
  }

  return (
    <section className="py-6 text-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">🔥 Trending Movies</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {trendingmovies.slice(0, 8).map((movie) => (
            <Link
              to={`/movie/${movie.tmdb_id}`}
              key={movie.tmdb_id}
              className="bg-zinc-900 rounded-lg overflow-hidden shadow-md hover:scale-[1.01] transition-transform duration-300"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-bold truncate">{movie.title}</h3>
                <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                  {movie.overview || 'No description available.'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trendingsection;
