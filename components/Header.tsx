"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation'
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
} from "@nextui-org/navbar";

import supabase from '../lib/supabase/Client';
import { Avatar, Button } from '@nextui-org/react';
import { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';

const routes = [
  {
    Label: 'Home',
    URL: '/',
  },
  // {
  //   Label: 'Groupes',
  //   URL: '/groupes-parlementaires',
  // },
  // {
  //   Label: 'Files',
  //   URL: '/files',
  // },
  // {
  //   Label: 'Users',
  //   URL: '/users',
  // },
];


function Header() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const pathname = usePathname();
  
  return (
    <Navbar isBordered maxWidth='full' classNames={{
      item: [
        "flex",
        "relative",
        "h-full",
        "items-center",
        "data-[active=true]:after:content-['']",
        "data-[active=true]:after:absolute",
        "data-[active=true]:after:bottom-0",
        "data-[active=true]:after:left-0",
        "data-[active=true]:after:right-0",
        "data-[active=true]:after:h-[2px]",
        "data-[active=true]:after:rounded-[2px]",
        "data-[active=true]:after:bg-primary",
      ],
    }}>
      <NavbarBrand>
        <Link href="/">
          <p className="font-bold text-inherit">Overseer</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {routes.map((r) => (
          <NavbarItem key={r.URL} isActive={pathname === r.URL}>
            <Link href={r.URL}>
              {r.Label}
            </Link>
          </NavbarItem>
          )
        )}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          {session && (
            <Avatar
            size='md'
              name={session.user.user_metadata.preferred_username}
              src={session.user.user_metadata.avatar_url}
            />
          )}
          <Button
            color="primary"
            variant="flat"
            onClick={() =>
              session
                ? supabase.auth.signOut()
                : supabase.auth.signInWithOAuth({
                  provider: 'github',
                  options: {
                    redirectTo: "http://localhost:3000/"
                  }
                })
            }
          >
            {session ? 'Sign out' : 'Sign in'}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar> 
  );
}

export default Header;
