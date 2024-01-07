'use client';

import paths from '@/paths';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface UserDropDown {
  email: string;
}
export const UserDropDown = ({ email }: UserDropDown) => {
  const router = useRouter();

  // async function signOut() {
  //   await axios.post('/api/users/signout');
  //   router.push(paths.signUp())
  // }

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger className="cursor-pointer">
        <Avatar />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-bold">Signed in as</p>
          <p className="font-light">{email}</p>
        </DropdownItem>
        <DropdownItem key="signout" color="danger" href={paths.signOut()}>
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
