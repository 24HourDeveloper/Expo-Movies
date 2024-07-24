import { useEffect, useState } from "react";

export const useMovieDetails = (id) => {
  const movieKey = process.env.MOVIE_API_KEY
  const baseURL = process.env.BASE_URL
  const [movie, setMovie] = useState([]);

  const getMovie = async() => {
    const res = await fetch(
      `${baseURL}/${id}?api_key=${movieKey}&language=en-US&page=1`
    );
    const data = await res.json();

    setMovie(data);
  }

  useEffect(() => {
    getMovie()
  }, []);

  return movie;
};