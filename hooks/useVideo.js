import { useEffect, useState } from "react";

export const useVideo = movieId => {
  const movieKey = process.env.EXPO_PUBLIC_API_KEY
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const videos = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${movieKey}&language=en-US`
      );
      const data = await res.json();
      setVideos(data.results);
      return videos;
    };

    videos();
  }, []);

  return videos;
};