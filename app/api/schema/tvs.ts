export const tvsTypeDefs = `
  type TV {
    id: String
    name: String
    poster_path: String
    overview: String
    first_air_date: String
    backdrop_path: String
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
      console.log(data);
      return data.results;
    },
  },
};