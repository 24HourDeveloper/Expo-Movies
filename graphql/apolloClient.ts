import { ApolloClient, InMemoryCache } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { Platform } from 'react-native';

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

// Initialize Apollo Client
const client = new ApolloClient({
  uri: Platform.select({
    web: 'http://localhost:8081/api/graphql',
    android: 'http://10.0.2.2:8081/api/graphql', // Android emulator
    default: 'http://10.0.0.3:8081/api/graphql', // iOS simulator
  }),
  cache: new InMemoryCache()
});

export default client