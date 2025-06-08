import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Platform,
  FlatList,
  Dimensions,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useQuery } from "@apollo/client";
import { SEASON_DETAILS_QUERY } from "../../../gql/Query";
import { Share, TouchableOpacity } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import TvItem from "../../../components/TvItem";
import YoutubePlayer from "react-native-youtube-iframe";

export default function Season() {
  const { season_info } = useLocalSearchParams();
  console.log("season_info==============", season_info);
  const [id, season_number] = season_info;
  const { data } = useQuery(SEASON_DETAILS_QUERY, {
    variables: { id, season_number: parseInt(season_number) },
  });
  console.log("data season details==============", data);

  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString("en-US", {
  //     month: "long",
  //     day: "numeric",
  //     year: "numeric",
  //   });
  // };

  // const share = async () => {
  //   if (!data?.trailers?.[0]?.key) return;

  //   if (Platform.OS === "ios") {
  //     await Share.share(
  //       {
  //         url: `${youtubeURL}${trailerData.trailers[0].key}`,
  //       },
  //       { subject: `${title} Trailer` }
  //     );
  //   }
  //   await Share.share(
  //     {
  //       title: `${title} Trailer`,
  //       message: `${youtubeURL}${trailerData.trailers[0].key}`,
  //     },
  //     { dialogTitle: "Share Trailers With Friends" }
  //   );
  // };

  // const key = data?.trailers?.[0]?.key || "";
  const isWeb = Platform.OS === "web";
  const isSmallScreen = Dimensions.get("window").width <= 850;

  console.log("data episodes==============", data.season.episodes);
  if (!data) return null;

  return (
    <ScrollView style={{ backgroundColor: "#1B1212" }}>
      <Stack.Screen
        options={{
          title: data.season.name ?? "",
        }}
      />
      <Image
        source={{
          uri: `${process.env.EXPO_PUBLIC_MOVIE_IMAGE_URL}${data.season.poster_path}`,
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
        onPress={() => {}}
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
            {data.season.overview}
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: isWeb ? (isSmallScreen ? 16 : 20) : 16,
            }}
          >
            {data.season.air_date}
          </Text>
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
              {data.season.episodes.length} Episodes
            </Text>
            <FlatList
              data={data.season.episodes}
              renderItem={({ item }) => (
                <TvItem item={{ ...item, showId: item.id }} type={"season"} />
              )}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
            />
          </View>
        </View>
        {/* {data.season.episodes[0].key && (
  //         <View
  //           style={{
  //             flex: isWeb && !isSmallScreen ? 1 : undefined,
  //             marginVertical: isWeb && !isSmallScreen ? 0 : 20,
  //           }}
  //         >
  //           <YoutubePlayer
  //             height={isWeb ? (isSmallScreen ? 300 : 400) : 250}
  //             videoId={data.season.episodes[0].key}
  //             play={false}
  //             initialPlayerParams={{
  //               preventFullScreen: false,
  //               controls: true,
  //               modestbranding: true,
  //             }}
  //           />
  //         </View>
  //       )} */}
      </View>
    </ScrollView>
  );
  //return <Text>Season</Text>;
}
