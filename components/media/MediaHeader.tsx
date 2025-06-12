import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";

interface MediaHeaderProps {
  imagePath: string;
  onShare?: () => void;
  isPoster?: boolean;
}

export default function MediaHeader({
  imagePath,
  onShare,
  isPoster = false,
}: MediaHeaderProps) {
  const isWeb = Platform.OS === "web";
  const isSmallScreen = Dimensions.get("window").width <= 850;
  const imageUrl = isPoster
    ? `${process.env.EXPO_PUBLIC_MOVIE_IMAGE_URL}${imagePath}`
    : `${process.env.EXPO_PUBLIC_MOVIE_ORIGINAL_URL}${imagePath}`;

  return (
    <>
      <Image
        source={{ uri: imageUrl }}
        style={{
          width: "100%",
          height: isWeb ? 500 : 350,
          marginBottom: 20,
          resizeMode: "cover",
          borderRadius: isWeb ? 8 : 0,
        }}
      />
      {onShare && (
        <TouchableOpacity
          onPress={onShare}
          style={{
            alignItems: "flex-end",
            marginHorizontal: 10,
            marginBottom: 20,
          }}
        >
          <Fontisto name="share" size={32} color="#ffffff" />
        </TouchableOpacity>
      )}
    </>
  );
}
