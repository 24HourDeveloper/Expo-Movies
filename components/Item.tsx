import { Link } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function Item({
  path,
  poster,
}: {
  path: string;
  poster: string | undefined;
}) {
  const imgURL = process.env.EXPO_PUBLIC_MOVIE_IMAGE_URL;
  let imageWidth = Dimensions.get("screen").width > 400 ? 185 : 150;
  let imageHeight = Dimensions.get("screen").width > 400 ? 250 : 200;

  return (
    <Link href={path} asChild>
      <TouchableOpacity
        style={{ ...styles.listContainer, height: imageHeight }}
      >
        <Image
          source={{
            uri: `${imgURL}${poster}`,
          }}
          style={{ width: imageWidth, height: imageHeight, borderRadius: 8 }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginBottom: 10,
    justifyContent: "center",
    alignContent: "center",
    padding: 5,
  },
});
