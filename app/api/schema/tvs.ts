export const tvsTypeDefs = `
  type Episode {
    id: String
    name: String
    overview: String
    still_path: String
    episode_number: Int
    air_date: String
    vote_average: Float
  }

  type Season {
    id: String
    name: String
    overview: String
    episode_count: Int
    poster_path: String
    season_number: Int
    episodes: [Episode]
    air_date: String
  }
  type TvTrailer {
    key: String
  }

  extend type Query {
    tv(id: String): TV
    tvTrailers(id: String): [TvTrailer]
    season(id: String!, season_number: Int!): Season
  }
`

export const tvsResolvers = {
  Query: {
    tv: async (_, args: any) => {
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
          vote_average: data.vote_average,
          seasons: data.seasons
        };
      } catch (error) {
        console.error('Error fetching TV show:', error);
        throw error;
      }
    },
    tvTrailers: async (_, args: any) => {
      const response = await fetch(`https://api.themoviedb.org/3/tv/${args.id}/videos?api_key=${process.env.MOVIE_API_KEY}&language=en-US`);
      const data = await response.json();
      return data.results;
    },
    season: async (_, args: any) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${args.id}/season/${args.season_number}?api_key=${process.env.MOVIE_API_KEY}&language=en-US`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch season details');
        }
        const data = await response.json();
        return {
          id: data.id.toString(),
          name: data.name,
          overview: data.overview,
          episode_count: data.episode_count,
          poster_path: data.poster_path,
          season_number: data.season_number,
          air_date: data.air_date,
          episodes: data.episodes.map((episode: any) => ({
            id: episode.id.toString(),
            name: episode.name,
            overview: episode.overview,
            still_path: episode.still_path,
            episode_number: episode.episode_number,
            air_date: episode.air_date,
            vote_average: episode.vote_average
          }))
        };
      } catch (error) {
        console.error('Error fetching season:', error);
        throw error;
      }
    }
  },
};