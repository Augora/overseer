import { Client } from 'faunadb';

export function GetProvidedFaunaDBClient(token?: string): Client {
  return new Client({
    secret: token || process.env.FAUNADB_TOKEN,
    timeout: 60,
  });
}
