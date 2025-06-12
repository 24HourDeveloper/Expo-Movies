import { View, StyleSheet } from "react-native";
import { LIST_QUERY } from "../../gql/Query";
import MainList from "../../components/MainList";

export default function TVPage() {
  return (
    <View style={styles.container}>
      <MainList query={LIST_QUERY} type="tv" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1212",
  },
});
