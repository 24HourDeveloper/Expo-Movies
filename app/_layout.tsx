import { Stack } from 'expo-router/stack';
import { ApolloProvider } from '@apollo/client';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { tokenCache } from '../cache';
import { headerOptions } from './headerOptions';
import client from '../graphql/apolloClient';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}

export default function AppLayout() {
  return (
    <ApolloProvider client={client}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <ClerkLoaded>
          <Stack screenOptions={headerOptions}>
            <Stack.Screen name="(tab-manager)" options={{ headerShown: true, headerTitle: "Movies", headerShadowVisible: false }} />
          </Stack>
        </ClerkLoaded>
      </ClerkProvider>
    </ApolloProvider>
  );
}
