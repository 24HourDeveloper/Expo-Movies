import {
  FlatList,
  ActivityIndicator,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import MovieItem from "./MovieItem";
import { WebMovieList } from "./WebMovieList";
import Item from "./Item";

type MovieItem = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
};

type TVItem = {
  id: string;
  name: string;
  poster_path: string;
  backdrop_path: string;
  season_number: number;
  showId?: string;
  still_path?: string;
};

export type EntitiesItem = MovieItem | TVItem;

type ListTypes = {
  cols?: number;
  isHorizontal?: boolean;
  items: EntitiesItem[];
  loading?: boolean;
  fetchNextPage?: () => void;
};

function List({
  cols,
  isHorizontal = false,
  items,
  loading,
  fetchNextPage,
}: ListTypes) {
  if (Platform.OS === "web") {
    return (
      <WebMovieList
        movies={items as MovieItem[]}
        loading={loading}
        fetchNextPage={fetchNextPage}
        cols={cols}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => {
          const path =
            "title" in item ? `/details/${item.id}` : `/details/${item.id}/tv`;
          return (
            <Item
              path={path}
              poster={"still_path" in item ? item.still_path : item.poster_path}
            />
          );
        }}
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

export default List;
