import React from 'react'
import { useLocalSearchParams, Stack } from 'expo-router';
import { useGetMovieDetails } from '../../hooks/useGetMovieDetails';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Share,
  TouchableOpacity,
  Platform
} from "react-native";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { Fontisto } from '@expo/vector-icons';

import { useVideo } from "../../hooks/useVideo";



export default function Details() {
  const { id } = useLocalSearchParams();
  const movie = useGetMovieDetails(id)
  const trailerLink = useVideo(id);

  const share = async () => {
    if (Platform.OS === "ios") {
      console.log("its ios");
      const resultIos = await Share.share(
        {
          url: `https://www.youtube.com/watch?v=${trailerLink[0].key}`
        },
        { subject: `${movie.title} Trailer` }
      );
    }
    const resultAndroid = await Share.share(
      {
        title: `${movie.title} Trailer`,
        message: `https://www.youtube.com/watch?v=${trailerLink[0].key}`
      },
      { dialogTitle: "Share Trailers With Friends" }
    );
    console.log(resultAndroid);
  };

  const key = trailerLink.length === 0 ? "" : trailerLink[0].key;
  return (
    <ScrollView style={{ backgroundColor: "#505050" }}>
      <Stack.Screen
        options={{
          title: movie.title ?? "",
        }}
      />
      <View style={styles.statusBar} />
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        }}
        style={{ width: "100%", height: 350, marginBottom: 20 }}
      />
      <TouchableOpacity
        onPress={share}
        style={{
          alignItems: "flex-end",
          marginHorizontal: 10,
          marginBottom: 20
        }}
      >
        <Fontisto name="share" size={32} color="#ffffff" />
      </TouchableOpacity>

      <View style={{ marginHorizontal: 10 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            color: "#fff",
            marginBottom: 20
          }}
        >
          {movie.title}
        </Text>
        <Text style={{ color: "#fff", marginBottom: 20 }}>
          {movie.overview}
        </Text>
        <Text style={{ color: "#fff" }}>
          Release Date: {movie.release_date}
        </Text>
      </View>
      <WebView
        style={{
          flex: 1,
          marginVertical: 20,
          height: 250,
          marginHorizontal: 10,
          backgroundColor: "transparent"
        }}
        javaScriptEnabled={true}
        source={{
          uri: `https://www.youtube.com/embed/${key}?rel=0&autoplay=0&showinfo=0&controls=0`
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "#C2185B",
    height: Constants.statusBarHeight
  }
});
