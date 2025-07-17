
import { useEffect, useState } from 'react';

const usefetchtrending = () => {
  const [trendingmovies, settrendingmovies] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);

  useEffect(() => {
    const fetchtrending = async () => {
      try {
        const res = await fetch('/api/trending');
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        settrendingmovies(data);
      } catch (err) {
        console.error(err);
        seterror(err.message);
      } finally {
        setloading(false);
      }
    };
    fetchtrending();
  }, []);

  return { trendingmovies, loading, error };
};

export default usefetchtrending;
