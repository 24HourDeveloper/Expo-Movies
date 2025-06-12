import React from "react";
import {
  View,
  Platform,
  Dimensions,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface MediaContentContainerProps {
  children: React.ReactNode;
  videoContent?: React.ReactNode;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  videoStyle?: ViewStyle;
}

export default function MediaContentContainer({
  children,
  videoContent,
  style,
  contentStyle,
  videoStyle,
}: MediaContentContainerProps) {
  const isWeb = Platform.OS === "web";
  const isSmallScreen = Dimensions.get("window").width <= 850;

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.content, contentStyle]}>{children}</View>
      {videoContent && (
        <View style={[styles.video, videoStyle]}>{videoContent}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:
      Platform.OS === "web" && Dimensions.get("window").width > 850
        ? "row"
        : "column",
    marginHorizontal: 10,
    gap: 20,
  },
  content: {
    flex:
      Platform.OS === "web" && Dimensions.get("window").width > 850
        ? 1
        : undefined,
  },
  video: {
    flex:
      Platform.OS === "web" && Dimensions.get("window").width > 850
        ? 1
        : undefined,
    marginVertical:
      Platform.OS === "web" && Dimensions.get("window").width > 850 ? 0 : 20,
  },
});
