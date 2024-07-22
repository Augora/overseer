import Link from 'next/link';
import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/navbar';

import { NavbarItem, Spacer, User } from '@nextui-org/react';
import { GetSession } from '@/lib/supabase/GetSession';
import SignInButton from './SignInButton';
import NavItem from './NavItem';

const routes = [
  {
    Label: 'Home',
    URL: '/',
  },
  {
    Label: 'GitHub Actions',
    URL: '/github-actions',
  },
  // {
  //   Label: 'Files',
  //   URL: '/files',
  // },
  // {
  //   Label: 'Users',
  //   URL: '/users',
  // },
];

async function Header() {
  const session = await GetSession();

  return (
    <Navbar
      isBordered
      maxWidth="full"
      classNames={{
        item: [
          'flex',
          'relative',
          'h-full',
          'items-center',
          "data-[active=true]:after:content-['']",
          'data-[active=true]:after:absolute',
          'data-[active=true]:after:bottom-0',
          'data-[active=true]:after:left-0',
          'data-[active=true]:after:right-0',
          'data-[active=true]:after:h-[2px]',
          'data-[active=true]:after:rounded-[2px]',
          'data-[active=true]:after:bg-primary',
        ],
      }}
    >
      <NavbarBrand>
        <Link href="/">
          <p className="font-bold text-inherit">Overseer</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {routes.map((r) => (
          <NavItem key={r.URL} Label={r.Label} URL={r.URL} />
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          {session && (
            <User
              name={session.user.user_metadata.preferred_username}
              description={session.user.user_metadata.full_name}
              avatarProps={{
                src: session.user.user_metadata.avatar_url,
              }}
            />
          )}

          <Spacer x={2} />

          <SignInButton session={session} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
