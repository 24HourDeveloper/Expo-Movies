import { FlatList, ActivityIndicator, View } from "react-native";
import MovieItem from './MovieItem';

function MovieList({
  cols,
  isHorizontal,
  movies,
  loading,
  fetchNextPage
}) {
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