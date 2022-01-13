import supabase from '../Client';

function handleSupabaseError({ error, ...rest }) {
  if (error) {
    throw error;
  }
  return rest;
}

export function GetGroupesFromSupabase() {
  return supabase
    .from<Types.Canonical.GroupeParlementaire>('GroupeParlementaire')
    .select()
    .then(handleSupabaseError)
    .then((d) => d.body);
}

export function CreateGroupeParlementaireToSupabase(data: Types.Canonical.GroupeParlementaire) {
  return supabase
    .from<Types.Canonical.GroupeParlementaire>('GroupeParlementaire')
    .insert([data])
    .then(handleSupabaseError)
    .then((d) => d.body);
}

export function UpdateGroupeParlementaireToSupabase(data: Types.Canonical.GroupeParlementaire) {
  return supabase
    .from<Types.Canonical.GroupeParlementaire>('GroupeParlementaire')
    .update(data)
    .match({ Sigle: data.Sigle })
    .then(handleSupabaseError)
    .then((d) => d.body);
}
