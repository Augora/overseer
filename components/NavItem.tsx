'use client';

import { Link, NavbarItem } from '@nextui-org/react';
import { usePathname } from 'next/navigation';

interface INavItem {
  Label: string;
  URL: string;
}

export default function NavItem(props: INavItem) {
  const pathname = usePathname();

  return (
    <NavbarItem key={props.URL} isActive={pathname === props.URL}>
      <Link href={props.URL} className="text-white">
        {props.Label}
      </Link>
    </NavbarItem>
  );
}
