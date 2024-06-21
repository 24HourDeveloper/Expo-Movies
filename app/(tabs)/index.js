import React from "react";
import { StyleSheet, View } from "react-native";
import Trailers from "../../components/Trailer";

export default function App(){
  return (
    <View style={styles.container}>
      <Trailers />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1B1212"
  }
});
