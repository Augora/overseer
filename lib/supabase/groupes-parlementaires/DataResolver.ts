import supabase from '../Client';

export function GetGroupesFromSupabase() {
  return supabase
    .from('GroupeParlementaire')
    .select()
    .returns<Types.Canonical.GroupeParlementaire[]>()
    .then((d) => d.data);
}

export function CreateGroupeParlementaireToSupabase(data: Types.Canonical.GroupeParlementaire) {
  return supabase
    .from('GroupeParlementaire')
    .insert([data])
    .returns<Types.Canonical.GroupeParlementaire>()
    .then((d) => d.data);
}

export function UpdateGroupeParlementaireToSupabase(data: Types.Canonical.GroupeParlementaire) {
  return supabase
    .from('GroupeParlementaire')
    .update(data)
    .match({ Sigle: data.Sigle })
    .returns<Types.Canonical.GroupeParlementaire>()
    .then((d) => d.data);
}
