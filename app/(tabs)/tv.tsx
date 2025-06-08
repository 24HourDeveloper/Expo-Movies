import { View, StyleSheet } from "react-native";
import TVList from "../../components/TVList";

export default function TVPage() {
  return (
    <View style={styles.container}>
      <TVList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1212",
  },
});
