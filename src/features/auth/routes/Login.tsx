import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Elements';
import { useAuth } from '@/lib/auth';

import { Layout } from '../components/Layout';

export const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLoginClick = async () => {
    await signIn('google');
    navigate('/app');
  };

  return (
    <Layout title="Log in to your account">
      <Button onClick={handleLoginClick}>Login</Button>
    </Layout>
  );
};
