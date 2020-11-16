import { GetProvidedFaunaDBClient } from '../FaunaDBDriver';
import fauna from 'faunadb';
const { Update, Match, Select, Get, Index, Exists, Login } = fauna.query;

export function UpdateUserPassword(userEmail: string, newPassword: string) {
  return GetProvidedFaunaDBClient().query(
    Update(Select('ref', Get(Match(Index('users_by_email'), userEmail))), {
      credentials: { password: newPassword },
    })
  );
}

export function DoesUserExists(userEmail: string): Promise<Boolean> {
  return GetProvidedFaunaDBClient().query(Exists(Match(Index('users_by_email'), userEmail)));
}

export function GetUserPassword(userEmail: string, password: string) {
  return GetProvidedFaunaDBClient().query(
    Login(Match(Index('users_by_email'), userEmail), {
      password,
    })
  );
}
