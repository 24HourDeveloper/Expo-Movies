import { useEffect, useState } from "react";

export const useMovies = () => {
  const movieKey = process.env.MOVIE_API_KEY
  const baseURL = process.env.BASE_URL
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const movieTypes = ["now_playing", "upcoming", "top_rated"].map(
      async movieType => {
        const res = await fetch(
          `${baseURL}/${movieType}?api_key=${movieKey}&language=en-US&page=1`
        );
        const data = await res.json();
        return data.results;
      }
    );
    Promise.all([movieTypes[0], movieTypes[1], movieTypes[2]]).then(data =>
      setMovies(data)
    );
  }, []);

  return movies;
};