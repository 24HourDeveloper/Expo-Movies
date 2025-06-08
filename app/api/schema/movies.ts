export const moviesTypeDefs = `
  type Movie {
    id: String
    title: String
    poster_path: String
    overview: String
    release_date: String
    backdrop_path: String
  }
  type Trailer {
    key: String
  }
  type Query {
    movies(page: Int, with_watch_provider: String, with_genres: String): [Movie]
    movie(id: String): Movie
    trailers(id: String): [Trailer]
    search(query: String): [Movie]
  }
`

export const moviesResolvers = {
  Query: {
    movies: async (args: any) => {
      const { page = 1, with_watch_provider, with_genres } = args;
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_API_KEY}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
      
      if (with_watch_provider) {
        url += `&with_watch_providers=${with_watch_provider}`;
      }
      if (with_genres) {
        url += `&with_genres=${with_genres}`;
      }
      
      const res = await fetch(url);
      const data = await res.json();
      return data.results;
    },
    movie: async (args: any) => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${args.id}?api_key=${process.env.MOVIE_API_KEY}&language=en-US`)
      const data = await res.json()
      return data
    },
    trailers: async (args: any) => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${args.id}/videos?api_key=${process.env.MOVIE_API_KEY}&language=en-US`)
      const data = await res.json()
      return data.results
    },
      search: async (args: any) => {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${args.query}&language=en-US&page=1`)
      const data = await res.json()
      return data.results
    },
  },
};
