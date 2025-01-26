import React from 'react'
import { useLocalSearchParams, Stack } from 'expo-router';
import {
  View,
  Text,
  Image,
  ScrollView,
  Share,
  TouchableOpacity,
  Platform
} from "react-native";
import { WebView } from "react-native-webview";
import { Fontisto } from '@expo/vector-icons';
import { useQuery } from '@apollo/client';

import { MOVIE_DETAILS_QUERY, MOVIE_TRAILER_QUERY } from '../../gql/Query';



export default function Details() {
  const { id } = useLocalSearchParams();
  const { data } = useQuery(MOVIE_DETAILS_QUERY, { variables: { id: id }})
  const { data: trailerData } = useQuery(MOVIE_TRAILER_QUERY, { variables: { id: id }})

  const imgURL = process.env.MOVIE_IMAGE_URL
  const youtubeURL = process.env.YOUTUBE_WATCH_URL

  const share = async () => {
    if (Platform.OS === "ios") {
      await Share.share(
        {
          url: `${youtubeURL}${trailerData?.trailers[0].key}`
        },
        { subject: `${data?.movie.title} Trailer` }
      );
    }
    await Share.share(
      {
        title: `${data?.movie.title} Trailer`,
        message: `${youtubeURL}${trailerData?.trailers[0].key}`
      },
      { dialogTitle: "Share Trailers With Friends" }
    );
  };

  const key = trailerData?.trailers.length === 0 ? "" : trailerData?.trailers[0].key;
  return (
    <ScrollView style={{ backgroundColor: "#505050" }}>
      <Stack.Screen
        options={{
          title: data?.movie.title ?? "",
        }}
      />
      <Image
        source={{
          uri: `${imgURL}${data?.movie.poster_path}`
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
          {data?.movie.title}
        </Text>
        <Text style={{ color: "#fff", marginBottom: 20 }}>
          {data?.movie.overview}
        </Text>
        <Text style={{ color: "#fff" }}>
          Release Date: {data?.movie.release_date}
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
