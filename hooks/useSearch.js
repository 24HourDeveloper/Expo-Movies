import { useEffect, useState } from 'react'

export const useSearch = (query) => {
  const movieKey = process.env.MOVIE_API_KEY
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const querySearch = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&language=en-US&query=${query}&page=1&include_adult=false`
      );
      const data = await res.json();
      setMovie(data.results);
    };
    querySearch();
  }, [query]);

  return movie
}

