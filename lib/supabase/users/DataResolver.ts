import axios from 'axios';

import supabase from '../Client';

function handleSupabaseError({ error, ...rest }) {
  if (error) {
    throw error;
  }
  return rest;
}

export function GetUsersFromSupabase() {
  return axios.get('/api/users').then((d) => d.data);
}

export function GetUserRoleFromSupabase() {
  return supabase
    .from('UserRole')
    .select('*')
    .then(handleSupabaseError)
    .then((d) => d.body);
}

export function CreateUserRoleToSupabase(data) {
  return supabase
    .from('UserRole')
    .insert([data])
    .then(handleSupabaseError)
    .then((d) => d.body);
}

export function UpdateUserRoleToSupabase(data) {
  return supabase
    .from('UserRole')
    .update(data)
    .match({ Sigle: data.Sigle })
    .then(handleSupabaseError)
    .then((d) => d.body);
}
