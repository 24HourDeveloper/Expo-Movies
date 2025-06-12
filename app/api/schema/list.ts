export const listTypeDefs = `
  type Movie {
    id: String
    title: String
    poster_path: String
    overview: String
    release_date: String
    backdrop_path: String
  }
  type TV {
    id: String
    name: String
    poster_path: String
    overview: String
    first_air_date: String
    backdrop_path: String
    vote_average: Float
    seasons: [Season]
  }
  union List = Movie | TV
  extend type Query {
    list(page: Int, with_watch_provider: String, with_genres: String, type: String): [List]
  }
`

export const listResolvers = {
  Query: {
    list: async (_, args: any) => {
      try {
        const { page = 1, with_watch_provider, with_genres, type } = args;

        if (!type || !['movie', 'tv'].includes(type)) {
          throw new Error('Type must be either "movie" or "tv"');
        }

        let url = `https://api.themoviedb.org/3/discover/${type}?api_key=${process.env.MOVIE_API_KEY}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
        
        if (with_watch_provider) {
          url += `&with_watch_providers=${with_watch_provider}`;
        }
        if (with_genres) {
          url += `&with_genres=${with_genres}`;
        }
        
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`API request failed with status ${res.status}`);
        }

        const data = await res.json();
        if (!data.results || !Array.isArray(data.results)) {
          throw new Error('Invalid response format from API');
        }
        return data.results;
      } catch (error) {
        console.error('Error in list resolver:', error);
        throw error;
      }
    },
  },
  List: {
    __resolveType: (obj: any) => {
      if ('title' in obj) return 'Movie';
      if ('name' in obj) return 'TV';
      return null;
    }
  }
};
