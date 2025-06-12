import React from "react";
import { View, Text, Platform, Dimensions } from "react-native";

interface MediaContentProps {
  overview: string;
  releaseDate?: string;
  releaseDateLabel?: string;
  children?: React.ReactNode;
}

export default function MediaContent({
  overview,
  releaseDate,
  releaseDateLabel = "Release Date",
  children,
}: MediaContentProps) {
  const isWeb = Platform.OS === "web";
  const isSmallScreen = Dimensions.get("window").width <= 850;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <View style={{ flex: isWeb && !isSmallScreen ? 1 : undefined }}>
      <Text
        style={{
          color: "#fff",
          marginBottom: 20,
          fontSize: isWeb ? (isSmallScreen ? 16 : 20) : 16,
          lineHeight: isWeb ? (isSmallScreen ? 24 : 30) : 24,
        }}
      >
        {overview}
      </Text>
      {releaseDate && (
        <Text
          style={{
            color: "#fff",
            fontSize: isWeb ? (isSmallScreen ? 16 : 20) : 16,
          }}
        >
          {releaseDateLabel}: {formatDate(releaseDate)}
        </Text>
      )}
      {children}
    </View>
  );
}
