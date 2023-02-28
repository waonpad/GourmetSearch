import { Routes } from 'react-router-dom';

import { PublicRoute } from '@/routes/PublicRoute';

import { Login } from './Login';

export const AuthRoutes = () => {
  return (
    <Routes>
      <PublicRoute path="login" element={<Login />} />
    </Routes>
  );
};
