// import { Button } from '@chakra-ui/react';
// import React from 'react';
// import { FaSync } from 'react-icons/fa';
// import { User } from '@supabase/supabase-js';

// import UserBox from './UserBox';
// import Spinner from '../common/Spinner';

// interface IUsersGridProps {
//   data: (User & { userRole: Types.Canonical.UserRole })[];
//   refetch: Function;
//   isFetching: boolean;
// }

// export default function UsersGrid(props: IUsersGridProps) {
//   return (
//     <>
//       <div className="flex flex-row">
//         <Button
//           aria-label="Refresh"
//           rightIcon={props.isFetching ? <Spinner size="sm" color="gray" /> : <FaSync />}
//           onClick={() => props.refetch()}
//           mr={{ base: 0, md: 10 }}
//           mb={{ base: 5, md: 10 }}
//           disabled={props.isFetching}
//         >
//           Refresh
//         </Button>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
//         {props.data.map((user) => (
//           <UserBox
//             key={user.user_metadata.user_name}
//             user={user}
//             userRole={user.userRole}
//             isFetching={props.isFetching}
//           />
//         ))}
//       </div>
//     </>
//   );
// }
