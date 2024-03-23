import React from "react";
import { Image, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";

const List = (props) => {
  return (
    <Link href={`/details/${props.itemID}`} asChild>
      <Pressable
        style={styles.listContainer}
        key={props.itemID}
      >
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${props.itemImage}`
          }}
          style={{ width: 150, height: 200 }}
        />
      </Pressable>
    </Link>
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