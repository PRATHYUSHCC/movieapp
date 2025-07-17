import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import Search from './components/search';
import Spinner from './components/spinner';
import Moviecard from './components/moviecard';
import Trendingsection from './components/trending/trendingsection';

const baseapiurl = 'https://api.themoviedb.org/3';
const apikey = import.meta.env.VITE_TMDB_API;

const apioptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apikey}`,
  }
};

const Home = () => {
  const [searchterm, setsearchterm] = useState('');
  const [errormssg, seterrormssg] = useState('');
  const [movielist, setmovielist] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [debouncedsearchterm, setdebouncedsearchterm] = useState('');

  useDebounce(() => {
    setdebouncedsearchterm(searchterm);
  }, 1000, [searchterm]);

  const fetchmovies = async (query = '') => {
    setisloading(true);
    seterrormssg('');
    try {
      const endpoint = query
        ? `${baseapiurl}/search/movie?query=${encodeURIComponent(query)}`
        : `${baseapiurl}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, apioptions);

      if (!response.ok) throw new Error("Failed to retrieve movies");
      const data = await response.json();

      if (data.Response === 'false') {
        seterrormssg(data.Error || "error fetching data");
        setmovielist([]);
        return;
      }

      setmovielist(data.results || []);
    } catch (error) {
      console.error(`Error fetching movies ${error}`);
      seterrormssg('Problem fetching movies. Please try after some time');
    } finally {
      setisloading(false);
    }
  };

  useEffect(() => {
    const trimmedTerm = debouncedsearchterm.trim();
    if (trimmedTerm) {
      fetchmovies(trimmedTerm);
    } else {
      fetchmovies();
    }
  }, [debouncedsearchterm]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center py-16">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v6H4V5h1zm0 8H4v2h1v-2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Your personal{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              cinema
            </span>{' '}
            hub
          </h1>
          <p className="text-xl text-gray-300 mb-8">Discover, explore, and enjoy your favorite movies</p>
          <Search searchterm={searchterm} setsearchterm={setsearchterm} />
        </header>

        {/* Trending Section */}
        <Trendingsection />

        {/* All Movies Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-white mb-8">All Movies</h2>

          {isloading ? (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          ) : errormssg ? (
            <div className="text-center py-16">
              <p className="text-red-400 text-lg">{errormssg}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movielist.map((movie) => (
                <Moviecard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Home;
