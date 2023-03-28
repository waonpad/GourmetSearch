import * as React from 'react';

import { AppBar } from '@/components/Elements/AppBar';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return <AppBar>{children}</AppBar>;
};
