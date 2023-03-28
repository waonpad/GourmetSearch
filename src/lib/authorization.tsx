import * as React from 'react';

// import type { User } from '@/features/users';

import { useAuthContext } from './auth';

export enum ROLES {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type RoleTypes = keyof typeof ROLES;

export const POLICIES = {
  // 'comment:delete': (user: User, comment: Comment) => {
  //   if (user.role === 'ADMIN') {
  //     return true;
  //   }
  //   if (user.role === 'USER' && comment.authorId === user.id) {
  //     return true;
  //   }
  //   return false;
  // },
};

export const useAuthorization = () => {
  const auth = useAuthContext();

  if (!auth?.user) {
    throw Error('User does not exist!');
  }

  const checkAccess = React.useCallback(
    ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
      if (allowedRoles && allowedRoles.length > 0 && auth?.userDocData) {
        return allowedRoles?.includes(auth?.userDocData?.role);
      }

      return true;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [auth?.userDocData]
  );

  return { checkAccess, role: auth?.userDocData?.role };
};

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & (
  | {
      allowedRoles: RoleTypes[];
      policyCheck?: never;
    }
  | {
      allowedRoles?: never;
      policyCheck: boolean;
    }
);

export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  if (typeof policyCheck !== 'undefined') {
    canAccess = policyCheck;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};
