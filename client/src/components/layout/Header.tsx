'use client';

import Link from 'next/link';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
  Spinner,
  Avatar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react';
import { useSession } from '@/app/hooks/auth/useSession';
import { UserDropDown } from './UserDropDown';
import paths from '@/paths';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const { user, isPending } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="shadow mb-6 bg-slate-100"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>
      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link href="/" className="font-bold">
            <Image
              src="/assets/img/logo/logo-text-transparent.png"
              width={90}
              height={35}
              alt="Logo"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link href="/" className="font-bold">
            <Image
              src="/assets/img/logo/logo-text-transparent.png"
              width={120}
              height={35}
              alt="Logo"
            />
          </Link>
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href={paths.home()}>
            Home
          </Link>
        </NavbarItem>
        {user && (
          <>
            <NavbarItem>
              <Link color="foreground" href={paths.createTicket()}>
                Sell Tickets
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link color="foreground" href={paths.orders()}>
                My Orders
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* <NavbarContent justify="center">
        <NavbarItem>
          <Input />
        </NavbarItem>
      </NavbarContent> */}
      <NavbarContent justify="end">
        <NavbarItem>
          {isPending && <Spinner size="sm" />}
          {!isPending && user && <UserDropDown email={user.email} />}
          {!isPending && !user && (
            <>
              <Link href={paths.signIn()}>
                <Button color="primary" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link href={paths.signUp()} className="ml-2">
                <Button color="default" size="sm" variant="bordered">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-slate-100">
        <NavbarMenuItem>
          <Link className="w-full" href="#">
            Features
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link className="w-full" href="#">
            Customer
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link className="w-full" href="#">
            Integration
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
