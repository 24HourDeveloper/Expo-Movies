import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Share, Platform, useWindowDimensions } from "react-native";
import { useQuery } from "@apollo/client";

import {
  MOVIE_DETAILS_QUERY,
  MOVIE_TRAILER_QUERY,
  TV_DETAILS_QUERY,
  TV_TRAILER_QUERY,
} from "../../gql/Query";
import {
  MediaContainer,
  MediaHeader,
  MediaContent,
  MediaVideoPlayer,
  MediaContentContainer,
} from "../../components/media";
import DetailList from "../../components/DetailList";
import Item from "../../components/Item";

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

  const { data, loading: detailsLoading } = useQuery(
    isTV ? TV_DETAILS_QUERY : MOVIE_DETAILS_QUERY,
    {
      variables: { id },
    }
  );

  const { data: trailerData, loading: trailerLoading } = useQuery(
    isTV ? TV_TRAILER_QUERY : MOVIE_TRAILER_QUERY,
    {
      variables: { id, type: "Trailer" },
    }
  );

  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === "web";
  const isSmallScreen = width <= 850;
  const youtubeURL = process.env.EXPO_PUBLIC_YOUTUBE_WATCH_URL;

  const media: MediaDetails = isTV ? data?.tv : data?.movie;
  const title = isTV ? media?.name : media?.title;
  const releaseDate = isTV ? media?.first_air_date : media?.release_date;

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

  if (!media) return null;
  console.log("media==============", id);
  return (
    <MediaContainer
      loading={detailsLoading || trailerLoading}
      title={title ?? ""}
      backgroundColor="#1B1212"
    >
      <MediaHeader
        imagePath={isWeb ? media.backdrop_path : media.poster_path}
        onShare={share}
        isPoster={!isWeb}
      />

      <MediaContentContainer
        videoContent={key && <MediaVideoPlayer videoId={key} />}
        style={{ marginTop: 10 }}
        contentStyle={{ flex: isWeb && !isSmallScreen ? 1 : undefined }}
        videoStyle={{ flex: isWeb && !isSmallScreen ? 1 : undefined }}
      >
        <MediaContent
          overview={media.overview}
          releaseDate={releaseDate}
          releaseDateLabel={isTV ? "First Air Date" : "Release Date"}
        >
          {media?.seasons && (
            <DetailList
              title={`${media.seasons.length} Seasons`}
              data={media.seasons}
              renderItem={({ item }) => (
                <Item path={`/details/season/${media.id}/${item.season_number}`} poster={item.poster_path} />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </MediaContent>
      </MediaContentContainer>
    </MediaContainer>
  );
}
