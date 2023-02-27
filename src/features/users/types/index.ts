import type { RoleTypes } from '@/lib/authorization';

export type FireUser = {
  id: string;
  displayName: string;
  email: string;
  role: RoleTypes;
};
