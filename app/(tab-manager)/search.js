import React, { useState } from "react";
import { View, TextInput } from "react-native";

import { useSearch } from "../../hooks/useSearch";
import MovieList from "../../components/MovieList";

const SearchMovies = () => {
  const [query, setQuery] = useState("");
  const movie = useSearch(query)

  const searchQuery = text => {
    setQuery(text);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#1B1212", paddingTop: 50 }}>
      <TextInput
        placeholder="Search Movie"
        style={{
          backgroundColor: "#eee",
          padding: 10,
          width: "95%",
          marginBottom: 20,
          borderRadius: 5,
          fontSize: 18,
          marginHorizontal: 10
        }}
        value={query}
        onChangeText={searchQuery}
      />
      <View style={{ flex: 1, paddingHorizontal: 25 }}>
        <MovieList movie={movie} cols={2} />
      </View>
    </View>
  );
};

export default SearchMovies;
