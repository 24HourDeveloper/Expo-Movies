import { useEffect, useState } from "react";

export const useMoviesByType = (type) => {
  const movieKey = process.env.MOVIE_API_KEY
  const baseURL = process.env.BASE_URL
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const getNowPlaying = async() => {
      try {   
        const res = await fetch(
          `${baseURL}/${type}?api_key=${movieKey}&language=en-US&page=1`,
          { signal }
        );
        const data = await res.json();
        setMovies(data.results);
      } catch (error) {
        throw new Error(`There is a problem fetching url`, {cause: error})
      }
    }
    getNowPlaying()

    return () => controller.abort();
  }, []);

  return movies;
};