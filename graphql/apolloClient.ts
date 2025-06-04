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
    return 'http://localhost:8081/api/graphql';
  }

  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';

  const protocol = hostname === 'localhost' ? 'http' : 'https';
  return `${protocol}://${hostname}/api/graphql`;
}

// Initialize Apollo Client
const client = new ApolloClient({
  uri: Platform.select({
    web: getGraphqlUrl(),
    default: 'http://10.0.0.3:8081/api/graphql', // iOS simulator
  }),
  cache: new InMemoryCache()
});

export default client