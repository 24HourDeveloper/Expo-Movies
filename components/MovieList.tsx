import {
  FlatList,
  ActivityIndicator,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import MovieItem from "./MovieItem";
import { WebMovieList } from "./WebMovieList";

export type Movie = {
  id: number;
  poster_path: string;
  backdrop_path: string;
};

type MovieListTypes = {
  cols?: number;
  isHorizontal?: boolean;
  movies: Movie[];
  loading?: boolean;
  fetchNextPage?: () => void;
};

function MovieList({
  cols,
  isHorizontal = false,
  movies,
  loading,
  fetchNextPage,
}: MovieListTypes) {
  if (Platform.OS === "web") {
    return (
      <WebMovieList
        movies={movies}
        loading={loading}
        fetchNextPage={fetchNextPage}
        cols={cols}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MovieItem itemID={item.id} itemImage={item.poster_path} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={cols || 2}
        horizontal={isHorizontal}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={!isHorizontal ? styles.columnWrapper : undefined}
        ListFooterComponent={() => {
          if (loading) {
            return (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#AA4A44" />
              </View>
            );
          }
          return null;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  listContent: {
    padding: Platform.select({ web: 16, default: 8 }),
    gap: Platform.select({ web: 16, default: 8 }),
  },
  columnWrapper: {
    justifyContent: "space-between",
    gap: Platform.select({ web: 16, default: 8 }),
  },
  loaderContainer: {
    padding: 16,
    alignItems: "center",
  },
});

export default MovieList;
