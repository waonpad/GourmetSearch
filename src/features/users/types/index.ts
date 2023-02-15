import type { RoleTypes } from '@/lib/fireAuthorization';
import type { BaseEntity } from '@/types';

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  role: 'ADMIN' | 'USER';
  teamId: string;
  bio: string;
} & BaseEntity;

export type FireUser = {
  id: string;
  displayName: string;
  email: string;
  role: RoleTypes;
};
