import { Image, StyleSheet, Pressable, Dimensions } from "react-native";
import { Link } from "expo-router";

type MovieItemTypes = {
  itemID: number;
  itemImage: string;
};

const MovieItem = ({ itemID, itemImage }: MovieItemTypes) => {
  const imgURL = process.env.EXPO_PUBLIC_MOVIE_IMAGE_URL;
  let imageWidth = Dimensions.get("screen").width > 400 ? 185 : 150;
  let imageHeight = Dimensions.get("screen").width > 400 ? 250 : 200;
  return (
    <Link href={`/details/${itemID}`} asChild>
      <Pressable
        style={{ ...styles.listContainer, height: imageHeight }}
        key={itemID}
      >
        <Image
          source={{
            uri: `${imgURL}${itemImage}`,
          }}
          style={{ width: imageWidth, height: imageHeight, borderRadius: 8 }}
        />
      </Pressable>
    </Link>
  );
};

export default MovieItem;

const styles = StyleSheet.create({
  listContainer: {
    marginBottom: 10,
    justifyContent: "center",
    alignContent: "center",
    padding: 5,
  },
});
