import React from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { Image } from 'expo-image';
import { useQuery } from '@apollo/client';

import MovieList from "./MovieList";
import { MOVIES_QUERY } from  "../gql/Query"

const Trailers = () => {
  const { data } = useQuery(MOVIES_QUERY)

  const renderPoster = () => {
    if (data !== undefined) {
      return (
        <Pressable key={data.nowPlaying[0]?.id}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${
                data.nowPlaying[Math.floor(Math.random() * 9)]?.poster_path
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
      {data !== undefined ? (
        <ScrollView style={{backgroundColor: "#1B1212"}}>
          {renderPoster()}
          <Text style={styles.listTitle}>Now Playing</Text>
          <MovieList movie={data?.nowPlaying} isHorizontal={true} />
          <Text style={styles.listTitle}>Up Coming</Text>
          <MovieList movie={data?.upcoming} isHorizontal={true} />
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