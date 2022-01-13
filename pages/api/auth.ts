import supabase from '../../lib/supabase/Client';

export default function handler(req, res) {
  supabase.auth.api.setAuthCookie(req, res);
}
