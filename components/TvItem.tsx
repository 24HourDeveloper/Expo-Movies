import { Link } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native";

interface TVShow {
  id: string;
  name: string;
  poster_path: string;
  still_path?: string;
  season_number: number;
  showId?: string;
}

const { width } = Dimensions.get("window");
const numColumns = 2;
const tileSize = width / numColumns;

export default function TvItem({ item, type }: { item: TVShow; type: string }) {
  const path =
    type === "season"
      ? `/details/season/${item.showId}/${item.season_number}`
      : `/details/${item.id}/tv`;
  return (
    <Link href={path} asChild>
      <TouchableOpacity style={styles.tile}>
        <Image
          source={{
            uri: `${process.env.EXPO_PUBLIC_MOVIE_IMAGE_URL}${item.poster_path || item.still_path}`,
          }}
          style={styles.poster}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </Link>
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
