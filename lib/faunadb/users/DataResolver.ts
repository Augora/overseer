import { GetProvidedFaunaDBClient } from '../FaunaDBDriver';
import fauna from 'faunadb';
const {
  Update,
  Match,
  Select,
  Get,
  Index,
  Exists,
  Equals,
  Login,
  Create,
  Collection,
} = fauna.query;

export function CreateUser(username: string) {
  return GetProvidedFaunaDBClient().query(
    Create(Collection('User'), {
      data: {
        name: username,
        isAdmin: false,
      },
    })
  );
}

export function UpdateUserPassword(username: string, newPassword: string) {
  return GetProvidedFaunaDBClient().query(
    Update(Select('ref', Get(Match(Index('user_by_name'), username))), {
      credentials: { password: newPassword },
    })
  );
}

export function DoesUserExists(username: string): Promise<Boolean> {
  return GetProvidedFaunaDBClient().query(Exists(Match(Index('user_by_name'), username)));
}

export function IsUserAdmin(username: string): Promise<Boolean> {
  return GetProvidedFaunaDBClient().query(
    Equals(Select('isAdmin', Select('data', Get(Match(Index('user_by_name'), username)))), true)
  );
}

export function GetUserPassword(username: string, password: string) {
  return GetProvidedFaunaDBClient().query(
    Login(Match(Index('user_by_name'), username), {
      password,
    })
  );
}
