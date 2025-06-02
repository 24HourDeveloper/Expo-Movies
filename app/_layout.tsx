import { Stack } from "expo-router/stack";
import { ApolloProvider } from "@apollo/client";
import headerOptions from "./headerOptions";
import client from "../graphql/apolloClient";
import { Platform } from "react-native";

export default function AppLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack screenOptions={headerOptions}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: Platform.OS !== "web",
            headerTitle: "Social Entertainment",
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </ApolloProvider>
  );
}
