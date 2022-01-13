import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

import supabase from '../../lib/supabase/Client';
import { GetUserRoleFromSupabase } from '../../lib/supabase/users/DataResolver';

var supasbaseService = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PRIVATE_SUPABASE_SERVICE_KEY
);

function handleSupabaseError({ error, ...rest }) {
  if (error) {
    throw error;
  }
  return rest;
}

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === 'GET') {
    const { user, error, token, data } = await supabase.auth.api.getUserByCookie(req);
    if (user) {
      const users = await supasbaseService.auth.api
        .listUsers()
        .then(handleSupabaseError)
        .then((d) => d.data);
      const userRoles = await supasbaseService
        .from('UserRole')
        .select('*')
        .then(handleSupabaseError)
        .then((d) => d.body);
      return res.send(
        users.map((u) =>
          Object.assign({}, u, { userRole: userRoles.find((ur) => ur.UserId === u.id) })
        )
      );
    } else {
      return res.status(401).end();
    }
  }

  return res.status(404).end();
};
