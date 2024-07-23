import React from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { Image } from 'expo-image';

import { useMovies } from "../hooks/useMovies";
import MovieList from "./MovieList";

const Trailers = () => {
  const [nowPlaying, upComing, topRated] = useMovies();

  const renderPoster = () => {
    if (nowPlaying !== undefined) {
      return (
        <Pressable key={nowPlaying[0].id}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${
                nowPlaying[Math.floor(Math.random() * 9)].poster_path
              }`
            }}
            contentFit="cover"
            style={{ width: "100%", height: 450 }}
          />
        </Pressable>
      );
    }
    return null;
  };

  return (
    <>
      {nowPlaying !== undefined ? (
        <ScrollView style={{backgroundColor: "#1B1212"}}>
          {renderPoster()}
          <Text style={styles.listTitle}>Now Playing</Text>
          <MovieList movie={nowPlaying} isHorizontal={true} />
          <Text style={styles.listTitle}>Up Coming</Text>
          <MovieList movie={upComing} isHorizontal={true} />
          <Text style={styles.listTitle}>Top Rated</Text>
          <MovieList movie={topRated} isHorizontal={true} />
        </ScrollView>
      ) : (
        <>
          <ActivityIndicator size="large" color="#fff" />
        </>
      )}
    </>
  );
};
export default Trailers;

const styles = StyleSheet.create({
  listTitle: {
    width: "100%",
    padding: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center"
  }
});