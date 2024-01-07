'use client';

import paths from '@/paths';
import { Spinner } from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    axios.post('/api/users/signout').then(() => router.push(paths.home()));
  }, [router]);

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-slate-100">
      <Spinner />
      <p className="rounded font-bold ml-5">You are signing out...</p>
    </div>
  );
}
