import { createClient } from '@/lib/supabase/Client';
import { Database } from '@/Types/supabase';

type GroupeParlementaire = Database['public']['Tables']['GroupeParlementaire']['Row'];

export async function GetGroupesFromSupabase() {
  const supabase = await createClient();
  return supabase
    .from('GroupeParlementaire')
    .select()
    .then((d) => d.data);
}

export async function CreateGroupeParlementaireToSupabase(data: GroupeParlementaire) {
  const supabase = await createClient();
  return supabase
    .from('GroupeParlementaire')
    .insert([data])
    .then((d) => d.data);
}

export async function UpdateGroupeParlementaireToSupabase(data: GroupeParlementaire) {
  const supabase = await createClient();
  return supabase
    .from('GroupeParlementaire')
    .update(data)
    .match({ Sigle: data.Sigle })
    .then((d) => d.data);
}
