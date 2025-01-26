import { FlatList, ActivityIndicator, View } from "react-native";
import MovieItem from './MovieItem';

export type Movie = {
  id: number,
  poster_path: string
}

type MovieListTypes = {
  cols?: number,
  isHorizontal?: boolean,
  movies: Movie[],
  loading?: boolean,
  fetchNextPage?: () => void
}

function MovieList({
  cols,
  isHorizontal,
  movies,
  loading,
  fetchNextPage
}: MovieListTypes) {
  return (
    <FlatList
      data={movies}
      renderItem={({ item }) => (
        <MovieItem
          itemID={item.id}
          itemImage={item.poster_path}
        />
      )}
      keyExtractor={item => item.id.toString()}
      numColumns={cols}
      horizontal={isHorizontal}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() => {
        if(loading) {
          return (
            <View style={{ padding: 10 }}>
              <ActivityIndicator size="large" color="#AA4A44" />
            </View>
          )
        }
        return null
      }}
    />
  )
}

export default MovieList