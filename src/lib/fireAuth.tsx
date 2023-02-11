import type { FC, ReactNode } from 'react';
import React, { createContext, useContext } from 'react';

import { useAuthUser } from '@react-query-firebase/auth';

import { SuspenseFallback } from '@/components/Elements/SuspenseFallback';
import { auth } from '@/config/firebase';

import type { User, AuthError } from 'firebase/auth';
import type { UseQueryResult } from 'react-query';

const AuthContext = createContext<{
  user: UseQueryResult<User, AuthError>;
} | null>(null);

export const FireAuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const user = useAuthUser(['user'], auth);

  if (user.isLoading) {
    return <React.Fragment>{SuspenseFallback}</React.Fragment>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
