import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

import { useAuthContext } from '@/lib/auth';

import { Layout } from '../components/Layout';

export const Login = () => {
  const navigate = useNavigate();
  const auth = useAuthContext();

  const handleLoginClick = async () => {
    await auth?.signIn('google');
    navigate('/app');
  };

  return (
    <Layout title="Log in to your account">
      <div className="flex flex-col items-center justify-center h-full">
        <Button onClick={handleLoginClick}>Login</Button>
      </div>
    </Layout>
  );
};
