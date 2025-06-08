export const tvsTypeDefs = `
  type TV {
    id: String
    name: String
    poster_path: String
    overview: String
    first_air_date: String
    backdrop_path: String
    vote_average: Float
  }
  extend type Query {
    tvs(page: Int): [TV]
    tv(id: String): TV
  }
`

export const tvsResolvers = {
  Query: {
    tvs: async (args: any) => {
      const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.MOVIE_API_KEY}&page=${args.page}&sort_by=popularity.desc`);
      const data = await response.json();
      return data.results;
    },
    tv: async (args: any) => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${args.id}?api_key=${process.env.MOVIE_API_KEY}&language=en-US`);
        if (!response.ok) {
          throw new Error('Failed to fetch TV show details');
        }
        const data = await response.json();
        return {
          id: data.id.toString(),
          name: data.name,
          overview: data.overview,
          poster_path: data.poster_path,
          backdrop_path: data.backdrop_path,
          first_air_date: data.first_air_date,
          vote_average: data.vote_average
        };
      } catch (error) {
        console.error('Error fetching TV show:', error);
        throw error;
      }
    },
  },
};