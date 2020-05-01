import ApolloClient from "apollo-boost";
import fetch from "node-fetch";

const token = "fnADqibleuACC6dYQdNykrXKKRcSPOhpOkP7aICn";

const client = new ApolloClient({
  uri: "https://graphql.fauna.com/graphql",
  fetch: fetch,
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
});

export function GetGraphQLClient() {
  return client;
}
