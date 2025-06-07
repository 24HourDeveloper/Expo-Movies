import { Stack } from "expo-router/stack";
import { ApolloProvider } from "@apollo/client";
import headerOptions from "./headerOptions";
import client from "../graphql/apolloClient";
import { Platform, useWindowDimensions } from "react-native";
import "event-target-shim";

export default function AppLayout() {
  const { width } = useWindowDimensions();
  const isMobile = width <= 768;
  return (
    <ApolloProvider client={client}>
      <Stack screenOptions={headerOptions}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: Platform.OS !== "web" || isMobile,
            headerTitle: "Social Entertainment",
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </ApolloProvider>
  );
}
