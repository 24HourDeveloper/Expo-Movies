import { useEffect, useState } from "react";

export const useGetMovieDetails = (id) => {
  const movieKey = process.env.MOVIE_API_KEY
  const [movie, setMovie] = useState([]);

  const getMovie = async() => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${movieKey}&language=en-US&page=1`
    );
    const data = await res.json();

    setMovie(data);
  }

  useEffect(() => {
    getMovie()
  }, []);

  return movie;
};