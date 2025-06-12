import React from "react";
import { View, Platform, Dimensions } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

interface MediaVideoPlayerProps {
  videoId: string;
}

export default function MediaVideoPlayer({ videoId }: MediaVideoPlayerProps) {
  const isWeb = Platform.OS === "web";
  const isSmallScreen = Dimensions.get("window").width <= 850;

  return (
    <View
      style={{
        flex: isWeb && !isSmallScreen ? 1 : undefined,
        marginVertical: isWeb && !isSmallScreen ? 0 : 20,
      }}
    >
      <YoutubePlayer
        height={isWeb ? (isSmallScreen ? 300 : 400) : 250}
        videoId={videoId}
        play={false}
        initialPlayerParams={{
          preventFullScreen: false,
          controls: true,
          modestbranding: true,
        }}
      />
    </View>
  );
}
