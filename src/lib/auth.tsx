import type { FC, ReactNode } from 'react';
import React, { createContext, useContext } from 'react';

import { signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';

import { SuspenseFallback } from '@/components/Elements/SuspenseFallback';
import { auth, firebaseAuthProviders } from '@/config/firebase';
import { useGetAuthUser } from '@/features/auth';
import type { User as UserDoc } from '@/features/users';
import { useObserveUserDoc } from '@/hooks/useObserveUserDoc';

import type { User, UserCredential } from 'firebase/auth';

export const useAuth = () => {
  const { user, isLoading: isAuthLoading } = useGetAuthUser();

  const { userDocData, isLoading: isDocLoading } = useObserveUserDoc(user);

  const signIn = async (provider: keyof typeof firebaseAuthProviders) => {
    const result = await signInWithPopup(auth, firebaseAuthProviders[provider]);
    console.log(result);

    return result;
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    window.location.assign(window.location.origin as unknown as string);
  };

  return { user, isAuthLoading, userDocData, isDocLoading, signIn, signOut };
};

const AuthContext = createContext<{
  user: User | null;
  isAuthLoading: boolean;
  userDocData: UserDoc | undefined;
  isDocLoading: boolean;
  signIn: (provider: keyof typeof firebaseAuthProviders) => Promise<UserCredential>;
  signOut: () => Promise<void>;
} | null>(null);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useAuth();

  if (auth.isAuthLoading) {
    return <SuspenseFallback />;
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
