import React from "react";
import { ActivityIndicator, View } from "react-native";

import List from "./List";
import usePagination from "../hooks/usePagination";
import Container from "./Container";
import FilterButton from "./FilterButton";
import { DocumentNode } from "@apollo/client";

const MainList = ({ query, type }: { query: DocumentNode; type: string }) => {
  const { items, page, setPage, refetch, loading, handleFilterChange } =
    usePagination(query, type);

  if (items === null || items === undefined || items.length === 0) return null;

  return (
    <>
      {items !== undefined ? (
        <Container>
          <List
            items={items}
            loading={loading}
            fetchNextPage={() => {
              setPage(page + 1);
              refetch({ page: page + 1 });
            }}
          />
          <FilterButton onFilterChange={handleFilterChange} />
        </Container>
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

export default MainList;
