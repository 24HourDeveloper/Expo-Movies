import { useEffect, useState } from "react";

export const useVideo = movieId => {
  const movieKey = process.env.MOVIE_API_KEY
  const baseURL = process.env.BASE_URL
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const videos = async () => {
      const res = await fetch(
        `${baseURL}/${movieId}/videos?api_key=${movieKey}&language=en-US`
      );
      const data = await res.json();
      setVideos(data.results);
      return videos;
    };

    videos();
  }, []);

  return videos;
};