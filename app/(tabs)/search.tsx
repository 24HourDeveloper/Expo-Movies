import { View, TextInput } from "react-native";
import { useQuery } from "@apollo/client";

import MovieList from "../../components/MovieList";
import { SEARCH_MOVIE_QUERY } from "../../gql/Query";
import useDebounceSearch from "../../hooks/useDebounceSearch";

const SearchMovies = () => {
  const [query, setQuery, debouncedSearch] = useDebounceSearch();

  const { data } = useQuery(SEARCH_MOVIE_QUERY, {
    variables: { query: debouncedSearch },
    skip: debouncedSearch === "",
  });

  const searchQuery = (text: string) => {
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
          marginHorizontal: 10,
        }}
        value={query}
        onChangeText={searchQuery}
      />
      <View style={{ flex: 1, paddingHorizontal: 25 }}>
        <MovieList movies={data?.search} />
      </View>
    </View>
  );
};

export default SearchMovies;
