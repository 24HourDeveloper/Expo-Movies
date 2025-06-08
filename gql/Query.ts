import { gql } from '@apollo/client';

export const MOVIES_QUERY = gql`
  query Movies($page: Int, $with_watch_provider: String, $with_genres: String) {
    movies(page: $page, with_watch_provider: $with_watch_provider, with_genres: $with_genres) {
      id
      poster_path
      backdrop_path
    }
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