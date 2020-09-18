import ApolloClient from 'apollo-boost';
import fetch from 'node-fetch';

var client = null;
var previousToken = null;

export function GetGraphQLClient(token) {
  if (!client || previousToken !== token) {
    previousToken = token;
    client = new ApolloClient({
      uri: 'https://graphql.fauna.com/graphql',
      fetch: fetch,
      request: (operation) => {
        operation.setContext({
          headers: {
            authorization: token ? `Bearer ${token}` : '',
          },
        });
      },
    });
  }
  return client;
}
