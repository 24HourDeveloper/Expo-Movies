import { useEffect, useState } from "react";

export const useMovies = () => {
  const movieKey = process.env.EXPO_PUBLIC_API_KEY
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const movieType = ["now_playing", "upcoming", "top_rated"].map(
      async movie => {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movie}?api_key=${movieKey}&language=en-US&page=1`
        );
        const data = await res.json();
        return data.results;
      }
    );
    Promise.all([movieType[0], movieType[1], movieType[2]]).then(data =>
      setMovies(data)
    );
  }, []);

  return movies;
};