export const moviesTypeDefs = `
  type Trailer {
    key: String
  }
  type Query {
    movie(id: String): Movie
    trailers(id: String, type: String): [Trailer]
    search(query: String): [Movie]
  }
`

export const moviesResolvers = {
  Query: {
    movie: async (_: any, args: any) => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${args.id}?api_key=${process.env.MOVIE_API_KEY}&language=en-US`)
      const data = await res.json()
      return data
    },
    trailers: async (_: any, args: any) => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${args.id}/videos?api_key=${process.env.MOVIE_API_KEY}&language=en-US`)
      const data = await res.json()
      const trailers = data.results.filter((trailer: any) => trailer.type === args.type)
      return trailers
    },
    search: async (_: any, args: any) => {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${args.query}&language=en-US&page=1`)
      const data = await res.json()
      return data.results
    },
  },
};
