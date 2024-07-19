// import axios from 'axios';

// import supabase from '../Client';

// function handleSupabaseError({ error, ...rest }) {
//   if (error) {
//     throw error;
//   }
//   return rest;
// }

// export function GetUsersFromSupabase(access_token) {
//   return axios
//     .get('/api/users', {
//       headers: {
//         'X-Supabase-Token': access_token,
//       },
//     })
//     .then((d) => d.data)
//     .catch((error) => {
//       throw error.response.data.message;
//     });
// }

// export function GetUserRoleFromSupabase() {
//   return supabase
//     .from<Types.Canonical.UserRole>('UserRole')
//     .select('*')
//     .then(handleSupabaseError)
//     .then((d) => d.body);
// }

// export function UpsertUserRoleToSupabase(data: Types.Canonical.UserRole) {
//   return supabase
//     .from<Types.Canonical.UserRole>('UserRole')
//     .upsert([data])
//     .then(handleSupabaseError)
//     .then((d) => d.body);
// }
