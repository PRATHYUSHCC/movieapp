import { Link } from 'react-router-dom';

const Moviecard = ({ movie }) => {
  const { id, title, vote_average, poster_path, release_date, original_language } = movie;

  return (
    <Link to={`/movie/${id}`} target="_blank" rel="noopener noreferrer">
      <div className="movie-card cursor-pointer hover:scale-[1.02] transition-transform">
        <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/No-Poster.svg'} alt={title} />
        <div className="mt-5">
          <h3>{title}</h3>
        </div>
        <div className="content flex flex-wrap gap-2 text-sm text-white items-center">
          <div className="rating flex items-center gap-1">
            <img src="/star.svg" alt="star" className="w-4 h-4" />
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          </div>
          <span>•</span>
          <div className="lang">{original_language}</div>
          <span>•</span>
          <p className="year">{release_date?.split('-')[0] || 'N/A'}</p>
        </div>
      </div>
    </Link>
  );
};

export default Moviecard;
