export const moviesTypeDefs = `
  type Movie {
    id: String
    title: String
    poster_path: String
    overview: String
    release_date: String
  }
  type Trailer {
    key: String
  }
  type Query {
    movies(page: Int): [Movie]
    movie(id: String): Movie
    trailers(id: String): [Trailer]
    search(query: String): [Movie]
  }
`

export const moviesResolvers = {
  Query: {
    movies: async (_,{ page = 1 }: { page: number }) => {
      const res = await fetch(`
        https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_API_KEY}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`)
      const data = await res.json()
      return data.results
    },
    movie: async (_, { id }: { id: string }) => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.MOVIE_API_KEY}&language=en-US`)
      const data = await res.json()
      return data
    },
    trailers: async (_, { id }: { id: string }) => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.MOVIE_API_KEY}&language=en-US`)
      const data = await res.json()
      return data.results
    },
    search: async (_, { query }: { query: string }) => {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}&language=en-US&page=1`)
      const data = await res.json()
      return data.results
    },
  },
};
