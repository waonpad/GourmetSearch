import type { RoleTypes } from '@/lib/authorization';

export type User = {
  id: string;
  displayName: string;
  email: string;
  role: RoleTypes;
};
