import { ApolloClient, InMemoryCache } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { Platform } from 'react-native';

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

const getGraphqlUrl = () => {
  if (__DEV__) {
    return 'http://10.0.0.3:8082/api/graphql';
  }

  if (Platform.OS === 'web') {
    return '/api/graphql'; // Relative path for web
  }

  return 'https://expo-movies.expo.app/api/graphql'; // For mobile
}
console.log("getGraphqlUrl", getGraphqlUrl());
// Initialize Apollo Client
const client = new ApolloClient({
  uri: getGraphqlUrl(),
  cache: new InMemoryCache()
});

export default client