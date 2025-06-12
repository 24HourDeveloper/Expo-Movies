import React from "react";
import { Platform, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@apollo/client";
import { SEASON_DETAILS_QUERY } from "../../../gql/Query";
import {
  MediaContainer,
  MediaHeader,
  MediaContent,
  MediaContentContainer,
} from "../../../components/media";
import DetailList from "../../../components/DetailList";
import Item from "../../../components/Item";

export default function Season() {
  const { season_info } = useLocalSearchParams();
  const [id, season_number] = season_info;
  const { data, loading, error } = useQuery(SEASON_DETAILS_QUERY, {
    variables: { id, season_number: parseInt(season_number) },
  });

  const isWeb = Platform.OS === "web";
  const isSmallScreen = Dimensions.get("window").width <= 850;

  if (!data?.season) return null;

  return (
    <MediaContainer
      loading={loading}
      error={error?.message}
      title={data.season.name ?? ""}
      backgroundColor="#1B1212"
    >
      <MediaHeader imagePath={data.season.poster_path} isPoster={true} />

      <MediaContentContainer
        style={{ marginTop: 10 }}
        contentStyle={{ flex: isWeb && !isSmallScreen ? 1 : undefined }}
      >
        <MediaContent
          overview={data.season.overview}
          releaseDate={data.season.air_date}
          releaseDateLabel="Air Date"
        >
          <DetailList
            title={`${data.season.episodes.length} Episodes`}
            data={data.season.episodes}
            renderItem={({ item }) => (
              <Item path={`/details/episode/${data.id}/${data.season.season_number}/${item.episode_number}`} poster={item.still_path} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </MediaContent>
      </MediaContentContainer>
    </MediaContainer>
  );
}
