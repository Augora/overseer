import React, { useState } from 'react';
import Link from 'next/link';
import { Checkbox } from '@chakra-ui/react';
import { ScaleFade } from '@chakra-ui/transition';
import { UpsertUserRoleToSupabase } from '../../lib/supabase/users/DataResolver';
import { User } from '@supabase/supabase-js';

interface IUserBoxProps {
  user: User;
  userRole: Types.Canonical.UserRole;
  refetch: Function;
}

export default function UserBox(props: IUserBoxProps) {
  const [isAdmin, setIsAdmin] = useState(props.userRole?.Role === 'Admin');

  return (
    <ScaleFade initialScale={0.9} in={true}>
      <div className="rounded-md p-5 bg-gray-900 hover:bg-gray-700 transition-colors ease-out delay-100">
        <div className="flex flex-row justify-between">
          <Link href={`https://github.com/${props.user.user_metadata.user_name}`}>
            <a className="flex flex-col text-3xl font-bold hover:underline hover:underline-offset-2">
              {props.user.user_metadata.user_name}
            </a>
          </Link>
          <img
            className="inline object-cover w-12 h-12 rounded-full"
            src={props.user.user_metadata.avatar_url}
            alt="Profile image"
          />
        </div>
        <div className="block">
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="w-6 h-6 text-teal-500 border-0 rounded-md focus:ring-0"
                checked={isAdmin}
                onChange={() => {
                  setIsAdmin(!isAdmin);
                  UpsertUserRoleToSupabase(
                    Object.assign({}, props.userRole, {
                      Role: !isAdmin ? 'Admin' : 'Member',
                      UserId: props.user.id,
                    })
                  );
                }}
              />
              <span className="ml-2">Is admin?</span>
            </label>
          </div>
        </div>
      </div>
    </ScaleFade>
  );
}
