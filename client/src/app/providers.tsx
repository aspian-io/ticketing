'use client';

import { NextUIProvider } from '@nextui-org/react';

interface ProvidersProps {
  children: React.ReactNode;
  currentUser: { userId: string };
}

export default function Providers({
  children,
  currentUser = { userId: 'abcd' },
}: ProvidersProps) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
