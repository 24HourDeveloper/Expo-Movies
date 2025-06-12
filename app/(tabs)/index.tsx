import { StyleSheet, View } from "react-native";
import MainList from "../../components/MainList";
import { LIST_QUERY } from "../../gql/Query";

export default function App() {
  return (
    <View style={styles.container}>
      <MainList query={LIST_QUERY} type="movie" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1B1212",
  },
});
