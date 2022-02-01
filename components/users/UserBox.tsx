import React from 'react';
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
        <Checkbox
          defaultIsChecked={props.userRole?.Role === 'Admin'}
          colorScheme="teal"
          onChange={(e) => {
            UpsertUserRoleToSupabase(
              Object.assign({}, props.userRole, {
                Role: e.target.checked ? 'Admin' : 'Member',
                UserId: props.user.id,
              })
            );
          }}
        >
          Is admin?
        </Checkbox>
      </div>
    </ScaleFade>
  );
}
