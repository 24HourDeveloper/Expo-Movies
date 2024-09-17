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

export const UPCOMING_MOVIES_QUERY = gql`
  query Movie($page: Int, $category: String) {
    movies(page: $page, category: $category) {
      id
      poster_path
    }
  }
`;