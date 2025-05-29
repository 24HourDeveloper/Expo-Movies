import {
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
  View,
  Image,
} from "react-native";
import { useQuery } from "@apollo/client";

import MovieList from "./MovieList";
import { MOVIES_QUERY } from "../gql/Query";

const Trailers = () => {
  const { data } = useQuery(MOVIES_QUERY);

  const renderPoster = () => {
    if (data !== undefined) {
      return (
        <Pressable key={data.nowPlaying[0]?.id}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${
                data.nowPlaying[Math.floor(Math.random() * 9)]?.poster_path
              }`,
            }}
            resizeMode="cover"
            style={{ width: "100%", height: 450 }}
          />
        </Pressable>
      );
    }
    return null;
  };

  return (
    <>
      {data !== undefined ? (
        <ScrollView style={{ backgroundColor: "#1B1212" }}>
          {renderPoster()}
          <Text style={styles.listTitle}>Now Playing</Text>
          <MovieList movies={data?.nowPlaying} isHorizontal={true} />
          <Text style={styles.listTitle}>Up Coming</Text>
          <MovieList movies={data?.upcoming} isHorizontal={true} />
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            paddingTop: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1B1212",
          }}
        >
          <ActivityIndicator size="large" color="#AA4A44" />
        </View>
      )}
    </>
  );
};
export default Trailers;

const styles = StyleSheet.create({
  listTitle: {
    width: "100%",
    padding: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
});
