import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Elements';
import { useFireAuth } from '@/lib/fireAuth';

import { Layout } from '../components/Layout';

export const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useFireAuth();

  const handleLoginClick = async () => {
    await signIn('google');
    navigate('/app');
  };

  return (
    <Layout title="Log in to your account">
      <Button onClick={handleLoginClick}>FireLogin</Button>
    </Layout>
  );
};
