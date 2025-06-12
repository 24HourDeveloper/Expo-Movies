import React from "react";
import { View, Text, FlatList } from "react-native";

interface DetailListProps {
  title: string;
  data: any[];
  renderItem: (item: any) => React.ReactElement;
  keyExtractor: (item: any) => string;
}

export default function DetailList({
  title,
  data,
  renderItem,
  keyExtractor,
}: DetailListProps) {
  if (!data?.length) return null;

  return (
    <View>
      <Text
        style={{
          color: "#fff",
          marginVertical: 12,
          fontSize: 24,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal={true}
      />
    </View>
  );
}
