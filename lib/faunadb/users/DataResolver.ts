import { GetProvidedFaunaDBClient } from '../FaunaDBDriver';
import fauna, { values } from 'faunadb';
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
  Map,
  Documents,
  Paginate,
  Lambda,
  Var,
  Delete,
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

export function GetUsers(token: string) {
  return GetProvidedFaunaDBClient(token)
    .query<
      values.Document<
        {
          name: string;
          isAdmin: boolean;
        }[]
      >
    >(
      Map(
        Paginate(Documents(Collection('User')), { size: 1000 }),
        Lambda('X', Select('data', Get(Var('X'))))
      )
    )
    .then((d) => d.data);
}

export function CreateUserWithAdminRole(token: string, username: string, isAdmin: boolean) {
  return GetProvidedFaunaDBClient(token).query(
    Create(Collection('User'), {
      data: {
        name: username,
        isAdmin,
      },
    })
  );
}

export function UpdateUserAdminRole(token: string, username: string, isAdmin: boolean) {
  return GetProvidedFaunaDBClient(token).query(
    Update(Select('ref', Get(Match(Index('user_by_name'), username))), {
      data: {
        isAdmin,
      },
    })
  );
}

export function DeleteUser(token: string, username: string) {
  return GetProvidedFaunaDBClient(token).query(
    Delete(Select('ref', Get(Match(Index('user_by_name'), username))))
  );
}
