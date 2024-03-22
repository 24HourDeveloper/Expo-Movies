import React from "react";
import { Image, StyleSheet, Pressable } from "react-native";

const List = (props) => {
  return (
    <Pressable
      style={styles.listContainer}
      key={props.itemID}
      onPress={props.movieDetails}
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${props.itemImage}`
        }}
        style={{ width: 150, height: 200 }}
      />
    </Pressable>
  );
}

export default List;

const styles = StyleSheet.create({
  listContainer: {
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignContent: "center",
    padding: 5
  }
});