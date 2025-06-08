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
  FlatList,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Fontisto } from "@expo/vector-icons";
import { useQuery } from "@apollo/client";

import {
  MOVIE_DETAILS_QUERY,
  MOVIE_TRAILER_QUERY,
  TV_DETAILS_QUERY,
  TV_TRAILER_QUERY,
} from "../../gql/Query";
import TvItem from "../../components/TvItem";

interface MediaDetails {
  id: string;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  seasons: {
    id: string;
    name: string;
    episode_count: number;
    season_number: number;
    poster_path: string;
  }[];
}

export default function Details() {
  const { info } = useLocalSearchParams();
  const [id, type] = info;
  const isTV = type === "tv";

  const { data } = useQuery(isTV ? TV_DETAILS_QUERY : MOVIE_DETAILS_QUERY, {
    variables: { id },
  });

  const { data: trailerData } = useQuery(
    isTV ? TV_TRAILER_QUERY : MOVIE_TRAILER_QUERY,
    {
      variables: { id },
    }
  );

  const { width } = useWindowDimensions();
  const imgURL = process.env.EXPO_PUBLIC_MOVIE_IMAGE_URL;
  const originalURL = "https://image.tmdb.org/t/p/original";
  const youtubeURL = process.env.EXPO_PUBLIC_YOUTUBE_WATCH_URL;

  const media: MediaDetails = isTV ? data?.tv : data?.movie;
  const title = isTV ? media?.name : media?.title;
  const releaseDate = isTV ? media?.first_air_date : media?.release_date;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const share = async () => {
    if (!trailerData?.trailers?.[0]?.key) return;

    if (Platform.OS === "ios") {
      await Share.share(
        {
          url: `${youtubeURL}${trailerData.trailers[0].key}`,
        },
        { subject: `${title} Trailer` }
      );
    }
    await Share.share(
      {
        title: `${title} Trailer`,
        message: `${youtubeURL}${trailerData.trailers[0].key}`,
      },
      { dialogTitle: "Share Trailers With Friends" }
    );
  };

  const key = isTV
    ? trailerData?.tvTrailers?.[0]?.key
    : trailerData?.trailers?.[0]?.key || "";
  const isWeb = Platform.OS === "web";
  const isSmallScreen = width <= 850;

  if (!media) return null;

  return (
    <ScrollView style={{ backgroundColor: "#1B1212" }}>
      <Stack.Screen
        options={{
          title: title ?? "",
        }}
      />
      <Image
        source={{
          uri: isWeb
            ? `${originalURL}${media.backdrop_path}`
            : `${imgURL}${media.poster_path}`,
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
              color: "#fff",
              marginBottom: 20,
              fontSize: isWeb ? (isSmallScreen ? 16 : 20) : 16,
              lineHeight: isWeb ? (isSmallScreen ? 24 : 30) : 24,
            }}
          >
            {media.overview}
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: isWeb ? (isSmallScreen ? 16 : 20) : 16,
            }}
          >
            {isTV ? "First Air Date" : "Release Date"}:{" "}
            {releaseDate ? formatDate(releaseDate) : "N/A"}
          </Text>
          {media?.seasons && (
            <View>
              <Text
                style={{
                  color: "#fff",
                  marginVertical: 12,
                  fontSize: 24,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {media?.seasons?.length} Seasons
              </Text>
              <FlatList
                data={media?.seasons}
                renderItem={({ item }) => (
                  <TvItem
                    item={{ ...item, showId: media.id }}
                    type={"season"}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
              />
            </View>
          )}
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
