import { ApolloClient, InMemoryCache } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { Platform } from 'react-native';
import Constants from 'expo-constants';

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

const getGraphqlUrl = () => {
  // For development
  if (__DEV__) {
    return 'http://localhost:8081/api/graphql';
  }

  // For Expo preview builds
  if (Constants.executionEnvironment === 'standalone') {
    const deployServer = process.env.EXPO_UNSTABLE_DEPLOY_SERVER;
    if (deployServer) {
      return `http://${deployServer}/api/graphql`;
    }
  }

  // For web in production
  if (Platform.OS === 'web') {
    return '/api/graphql';
  }

  // For native apps in production
  return 'https://expo-movies.expo.app/api/graphql';
}

// Initialize Apollo Client
const client = new ApolloClient({
  uri: getGraphqlUrl(),
  cache: new InMemoryCache()
});

export default client