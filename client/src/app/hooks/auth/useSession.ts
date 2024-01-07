"use client";

import { User } from "@/common/types/auth/user";
import { useEffect, useState } from "react";

interface FetchCurrentUser {
  user?: User;
  isPending: boolean;
}

export const useSession = (): FetchCurrentUser => {
  const [ user, setUser ] = useState<{ currentUser: User; } | null>( null );
  const [ isPending, setIsPending ] = useState<boolean>( true );

  useEffect( () => {
    const res = fetch( '/api/users/currentuser', { credentials: 'include' } );
    res.then( r => r.json().then( d => {
      setUser( d );
      setIsPending( false );
    } ).catch( e => setIsPending( false ) ) )
      .catch( e => setIsPending( false ) );
  }, [] );

  return { user: user?.currentUser, isPending };
};