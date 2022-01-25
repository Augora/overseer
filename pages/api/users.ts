import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import isArray from 'lodash/isArray';

import supabase from '../../lib/supabase/Client';
import { GetUserRoleFromSupabase } from '../../lib/supabase/users/DataResolver';
import { ApiError } from 'next/dist/server/api-utils';

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

function handleQueryString(queryArg: string | string[]): string {
  if (isArray(queryArg)) {
    return queryArg[0];
  } else {
    return queryArg;
  }
}

export default async function Users(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const { user, error } = await supabase.auth.api.getUser(
      handleQueryString(req.headers['x-supabase-token'])
    );

    if (!error) {
      const isAdmin = await supasbaseService
        .rpc('is_admin', {
          _user_id: user.id,
        })
        .then((d) => d.data);

      if (isAdmin) {
        const users = await supasbaseService.auth.api
          .listUsers()
          .then(handleSupabaseError)
          .then((d) => d.data);
        const userRoles = await supasbaseService
          .from('UserRole')
          .select('*')
          .then(handleSupabaseError)
          .then((d) => d.body);
        return res
          .status(200)
          .send(
            users.map((u) =>
              Object.assign({}, u, { userRole: userRoles.find((ur) => ur.UserId === u.id) })
            )
          );
      } else {
        return res.status(401).send({
          message: 'Not Authorized: User is not an admin.',
        });
      }
    } else {
      return res.status(401).send(error);
    }
  }

  return res.status(404).end();
}
