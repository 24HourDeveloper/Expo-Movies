import { gql } from '@apollo/client';

export const MOVIES_QUERY = gql`
  query {
    nowPlaying: movies(page: 1, category: "now_playing") {
      id
      poster_path
    }
    upcoming: movies(page: 1, category: "upcoming") {
      id
      poster_path
    }
  }
`;

export const CATEGORY_MOVIES_QUERY = gql`
  query Movies($page: Int, $category: String) {
    movies(page: $page, category: $category) {
      id
      poster_path
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