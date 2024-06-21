import React, { useState } from "react";
import { View, TextInput, FlatList } from "react-native";

import List from "../../components/List";
import { useSearch } from "../../hooks/useSearch";

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
