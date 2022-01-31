import React from 'react';
import { Checkbox, Link } from '@chakra-ui/react';
import { ScaleFade } from '@chakra-ui/transition';
import { UpsertUserRoleToSupabase } from '../../lib/supabase/users/DataResolver';
import { User } from '@supabase/supabase-js';

interface IUserBoxProps {
  user: User;
  userRole: Types.Canonical.UserRole;
  refetch: Function;
}

export default function UserBox(props: IUserBoxProps) {
  console.log(props);
  return (
    <ScaleFade initialScale={0.9} in={true}>
      <div className="rounded-md p-5 bg-gray-900 hover:bg-gray-700">
        <div className="flex flex-row justify-between">
          <Link
            href={`https://github.com/${props.user.user_metadata.user_name}`}
            className="flex flex-col"
          >
            <p className="text-3xl font-bold">{props.user.user_metadata.user_name}</p>
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
