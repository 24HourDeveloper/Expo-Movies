import React from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import {
  View,
  Text,
  Image,
  ScrollView,
  Share,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Fontisto } from "@expo/vector-icons";
import { useQuery } from "@apollo/client";

import { MOVIE_DETAILS_QUERY, MOVIE_TRAILER_QUERY } from "../../gql/Query";

export default function Details() {
  const { id } = useLocalSearchParams();
  const { data } = useQuery(MOVIE_DETAILS_QUERY, { variables: { id: id } });
  const { data: trailerData } = useQuery(MOVIE_TRAILER_QUERY, {
    variables: { id: id },
  });
  const { width } = useWindowDimensions();

  const imgURL = process.env.EXPO_PUBLIC_MOVIE_IMAGE_URL;
  const originalURL = "https://image.tmdb.org/t/p/original";
  const youtubeURL = process.env.EXPO_PUBLIC_YOUTUBE_WATCH_URL;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const share = async () => {
    if (Platform.OS === "ios") {
      await Share.share(
        {
          url: `${youtubeURL}${trailerData?.trailers[0].key}`,
        },
        { subject: `${data?.movie.title} Trailer` }
      );
    }
    await Share.share(
      {
        title: `${data?.movie.title} Trailer`,
        message: `${youtubeURL}${trailerData?.trailers[0].key}`,
      },
      { dialogTitle: "Share Trailers With Friends" }
    );
  };

  const key =
    trailerData?.trailers.length === 0 ? "" : trailerData?.trailers[0].key;

  const isWeb = Platform.OS === "web";
  const isSmallScreen = width <= 850;

  return (
    <ScrollView style={{ backgroundColor: "#1B1212" }}>
      <Stack.Screen
        options={{
          title: data?.movie.title ?? "",
        }}
      />
      <Image
        source={{
          uri: isWeb
            ? `${originalURL}${data?.movie.backdrop_path}`
            : `${imgURL}${data?.movie.poster_path}`,
        }}
        style={{
          width: "100%",
          height: isWeb ? 500 : 350,
          marginBottom: 20,
          resizeMode: "cover",
          borderRadius: isWeb ? 8 : 0,
        }}
      />
      <TouchableOpacity
        onPress={share}
        style={{
          alignItems: "flex-end",
          marginHorizontal: 10,
          marginBottom: 20,
        }}
      >
        <Fontisto name="share" size={32} color="#ffffff" />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: isWeb && !isSmallScreen ? "row" : "column",
          marginHorizontal: 10,
          gap: 20,
        }}
      >
        <View style={{ flex: isWeb && !isSmallScreen ? 1 : undefined }}>
          <Text
            style={{
              fontSize: isWeb ? (isSmallScreen ? 20 : 32) : 20,
              fontWeight: "bold",
              textAlign: "center",
              color: "#fff",
              marginBottom: 20,
            }}
          >
            {data?.movie.title}
          </Text>
          <Text
            style={{
              color: "#fff",
              marginBottom: 20,
              fontSize: isWeb ? (isSmallScreen ? 16 : 20) : 16,
              lineHeight: isWeb ? (isSmallScreen ? 24 : 30) : 24,
            }}
          >
            {data?.movie.overview}
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: isWeb ? (isSmallScreen ? 16 : 20) : 16,
            }}
          >
            Release Date:{" "}
            {data?.movie.release_date
              ? formatDate(data.movie.release_date)
              : "N/A"}
          </Text>
        </View>
        {key && (
          <View
            style={{
              flex: isWeb && !isSmallScreen ? 1 : undefined,
              marginVertical: isWeb && !isSmallScreen ? 0 : 20,
            }}
          >
            <YoutubePlayer
              height={isWeb ? (isSmallScreen ? 300 : 400) : 250}
              videoId={key}
              play={false}
              initialPlayerParams={{
                preventFullScreen: false,
                controls: true,
                modestbranding: true,
              }}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}
