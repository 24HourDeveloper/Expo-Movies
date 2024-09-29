import { ApolloClient, InMemoryCache } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://eq-movie-seven.vercel.app/graphql',
  cache: new InMemoryCache()
});

export default client