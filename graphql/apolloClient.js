import { ApolloClient, InMemoryCache } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://10.0.0.3:4000/graphql',
  cache: new InMemoryCache()
});

export default client