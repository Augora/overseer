import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
  DefaultOptions,
} from '@apollo/client';

const cache = new InMemoryCache();
var client: ApolloClient<NormalizedCacheObject> = null;
var previousToken = null;

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

export function GetGraphQLClient(token) {
  if (!client || previousToken !== token) {
    previousToken = token;
    const link = createHttpLink({
      uri: 'https://graphql.fauna.com/graphql',
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });

    client = new ApolloClient({
      cache: cache,
      link: link,
      defaultOptions,
    });
  }
  return client;
}
