import React, { useState, useEffect } from "react";
import { View, TextInput, FlatList } from "react-native";

import List from "../../components/List";

const SearchMovies = () => {
  const movieKey = process.env.EXPO_PUBLIC_API_KEY
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState([]);

  const searchQuery = text => {
    setQuery(text);
  };
  useEffect(() => {
    const querySearch = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&language=en-US&query=${query}&page=1&include_adult=false`
      );
      const data = await res.json();
      setMovie(data.results);
    };
    querySearch();
  }, [query]);

  return (
    <View style={{ flex: 1, backgroundColor: "#505050", paddingTop: 50 }}>
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
        <FlatList
          data={movie}
          renderItem={({ item }) => (
            <View style={{ width: 200 }}>
              <List
                itemImage={item.poster_path}
                itemID={item.id}
              />
            </View>
          )}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
        />
      </View>
    </View>
  );
};

export default SearchMovies;
