import React from 'react';
import { ActivityIndicator, View } from "react-native";

import MovieList from "./MovieList";
import usePagination from "../hooks/usePagination";
import MoviesContainer from "./MoviesContainer";

const Trailers = () => {
  const { movies: data, page, setPage, refetch, loading } = usePagination();

  if (data === null || data === undefined || data.length === 0) return null;

  return (
    <>
      {data !== undefined ? (
        <MoviesContainer>
          <MovieList
            movies={data}
            loading={loading}
            fetchNextPage={() => {
              setPage(page + 1);
              refetch({ page: page + 1 });
            }}
          />
        </MoviesContainer>
      ) : (
        <View
          style={{
            flex: 1,
            paddingTop: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1B1212",
          }}
        >
          <ActivityIndicator size="large" color="#AA4A44" />
        </View>
      )}
    </>
  );
};

export default Trailers;
