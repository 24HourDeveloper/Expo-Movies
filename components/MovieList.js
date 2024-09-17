import React from 'react'
import { FlatList } from "react-native";
import MovieItem from './MovieItem';

function MovieList({ movie, cols, isHorizontal }) {
  return (
    <FlatList
      data={movie}
      renderItem={({ item }) => (
        <MovieItem
          itemImage={item.poster_path}
          itemID={item.id}
        />
      )}
      keyExtractor={item => item.id.toString()}
      numColumns={cols}
      horizontal={isHorizontal}
    />
  )
}

export default MovieList