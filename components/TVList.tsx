import React from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useTVList } from "../hooks/useTVList";
import { IMAGE_BASE_URL } from "../constants";

const { width } = Dimensions.get("window");
const numColumns = 2;
const tileSize = width / numColumns;

interface TVShow {
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
}

export default function TVList() {
  const { shows, loading, refetch } = useTVList();

  const renderItem = ({ item }: { item: TVShow }) => (
    <View style={styles.tile}>
      <Image
        source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
        style={styles.poster}
        resizeMode="cover"
      />
    </View>
  );

  return (
    <FlatList
      data={shows}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      onEndReached={refetch}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() =>
        loading ? <ActivityIndicator size="large" color="#AA4A44" /> : null
      }
    />
  );
}

const styles = StyleSheet.create({
  tile: {
    width: tileSize - 16,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  poster: {
    width: "100%",
    height: tileSize * 1.5,
  },
  info: {
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: "#666",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
