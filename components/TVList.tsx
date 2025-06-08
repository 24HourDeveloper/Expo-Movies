import React from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { useTVList } from "../hooks/useTVList";
import TvItem from "./TvItem";

export default function TVList({
  horizontal = false,
}: {
  horizontal?: boolean;
}) {
  const numColumns = horizontal ? 1 : 2;
  const { shows, loading, refetch, setPage, page } = useTVList();

  return (
    <FlatList
      data={shows}
      renderItem={({ item }) => <TvItem item={item} type={"tv"} />}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      horizontal={horizontal}
      onEndReached={() => {
        setPage(page + 1);
        refetch({ page: page + 1 });
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() =>
        loading ? <ActivityIndicator size="large" color="#AA4A44" /> : null
      }
    />
  );
}
