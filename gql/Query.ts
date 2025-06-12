import { gql } from '@apollo/client';

export const LIST_QUERY = gql`
  query List($page: Int, $with_watch_provider: String, $with_genres: String, $type: String) {
    list(page: $page, with_watch_provider: $with_watch_provider, with_genres: $with_genres, type: $type) {
      ...MovieFields
      ...TVFields
    }
  }
  fragment MovieFields on Movie {
    id
    title
    poster_path
    backdrop_path
  }
  fragment TVFields on TV { 
    id
    name
    poster_path
    backdrop_path
  }
`;

export const MOVIE_DETAILS_QUERY = gql`
  query Movie($id: String) {
    movie(id: $id) {
      title
      poster_path
      overview
      release_date
      backdrop_path
    }
  }
`

export const MOVIE_TRAILER_QUERY = gql`
  query Trailers($id: String) {
    trailers(id: $id) {
      key
    }
  }
`

export const SEARCH_MOVIE_QUERY = gql`
  query SearchMovies($query: String) {
    search(query: $query) {
      id
      poster_path
    }
  }
`

export const TV_DETAILS_QUERY = gql`
  query TV($id: String!) {
    tv(id: $id) {
      id
      name
      overview
      poster_path
      backdrop_path
      first_air_date
      vote_average
      seasons {
        id
        name
        episode_count
        season_number
        poster_path
      }
    }
  }
`
export const TV_TRAILER_QUERY = gql`
  query TvTrailers($id: String!) {
    tvTrailers(id: $id) {
      key
    }
  }
`

export const SEASON_DETAILS_QUERY = gql`
  query Season($id: String!, $season_number: Int!) {
    season(id: $id, season_number: $season_number) {
      id
      name
      overview
      episode_count
      poster_path
      season_number
      air_date
      episodes {
        id
        name
        overview
        still_path
        episode_number
        air_date
        vote_average
      }
    }
  }
`