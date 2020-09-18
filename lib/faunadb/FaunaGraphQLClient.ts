import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const cache = new InMemoryCache();
var client = null;
var previousToken = null;

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
    });
  }
  return client;
}
