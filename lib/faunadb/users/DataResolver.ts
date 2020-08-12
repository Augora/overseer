import { GetProvidedFaunaDBClient } from "../FaunaDBDriver";
import { query } from "faunadb";
const { Update, Match, Select, Get, Index, Exists, Login } = query;

export function UpdateUserPassword(userEmail: string, newPassword: string) {
  console.log(`Updating ${userEmail} with new password ${newPassword}`);
  return GetProvidedFaunaDBClient().query(
    Update(Select("ref", Get(Match(Index("users_by_email"), userEmail))), {
      credentials: { password: newPassword },
    })
  );
}

export function DoesUserExists(userEmail: string): Promise<Boolean> {
  return GetProvidedFaunaDBClient().query(
    Exists(Match(Index("users_by_email"), "bacas.kevin@hotmail.fr"))
  );
}

export function GetUserPassword(userEmail: string, password: string) {
  return GetProvidedFaunaDBClient().query(
    Login(Match(Index("users_by_email"), userEmail), {
      password,
    })
  );
}
