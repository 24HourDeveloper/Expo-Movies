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
import List from "./List";

const Trailers = props => {
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

  const getDetails = movie => {
    props.navigation.navigation.navigate("Details", { details: movie });
  };
  return (
    <>
      {nowPlaying !== undefined ? (
        <ScrollView>
          {renderPoster()}
          <Text style={styles.listTitle}>Now Playing</Text>
          <FlatList
            data={nowPlaying}
            renderItem={({ item }) => {
              return (
                <List
                  itemImage={item.poster_path}
                  itemID={item.id}
                  movieDetails={() => getDetails(item)}
                />
              );
            }}
            keyExtractor={item => item.id.toString()}
            horizontal
          />
          <Text style={styles.listTitle}>Up Coming</Text>
          <FlatList
            data={upComing}
            renderItem={({ item }) => {
              return (
                <List
                  itemImage={item.poster_path}
                  itemID={item.id}
                  movieDetails={() => getDetails(item)}
                />
              );
            }}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
          />
          <Text style={styles.listTitle}>Top Rated</Text>
          <FlatList
            data={topRated}
            renderItem={({ item }) => {
              return (
                <List
                  itemImage={item.poster_path}
                  itemID={item.id}
                  movieDetails={() => getDetails(item)}
                />
              );
            }}
            keyExtractor={item => item.id.toString()}
            horizontal
          />
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
    justifyContent: "flex-start",
    width: "100%",
    padding: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "#000"
  }
});