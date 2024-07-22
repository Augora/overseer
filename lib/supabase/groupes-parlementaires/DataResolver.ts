import { createClient } from '@/lib/supabase/Client';

export async function GetGroupesFromSupabase() {
  const supabase = await createClient();
  return supabase
    .from('GroupeParlementaire')
    .select()
    .returns<Types.Canonical.GroupeParlementaire[]>()
    .then((d) => d.data);
}

export async function CreateGroupeParlementaireToSupabase(
  data: Types.Canonical.GroupeParlementaire,
) {
  const supabase = await createClient();
  return supabase
    .from('GroupeParlementaire')
    .insert([data])
    .returns<Types.Canonical.GroupeParlementaire>()
    .then((d) => d.data);
}

export async function UpdateGroupeParlementaireToSupabase(
  data: Types.Canonical.GroupeParlementaire,
) {
  const supabase = await createClient();
  return supabase
    .from('GroupeParlementaire')
    .update(data)
    .match({ Sigle: data.Sigle })
    .returns<Types.Canonical.GroupeParlementaire>()
    .then((d) => d.data);
}
