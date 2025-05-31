import { Stack } from "expo-router/stack";
import { ApolloProvider } from "@apollo/client";
import headerOptions from "./headerOptions";
import client from "../graphql/apolloClient";

export default function AppLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack screenOptions={headerOptions}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: true,
            headerTitle: "Social Entertainment",
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </ApolloProvider>
  );
}
