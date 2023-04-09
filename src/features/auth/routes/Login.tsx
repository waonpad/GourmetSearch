import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';
import * as Mui from '@mui/material';

import { Head } from '@/components/Head';
import { useAuthContext } from '@/lib/auth';
import { compositeStyle } from '@/styles/compositeStyle';

export const Login = () => {
  const navigate = useNavigate();
  const auth = useAuthContext();

  const handleLoginClick = async () => {
    await auth?.signIn('google');
    navigate('/app');
  };

  return (
    <>
      <Head title="Login" />
      <Mui.Container
        sx={{
          ...compositeStyle.centerBoth,
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Mui.Card
          sx={{
            width: 400,
            padding: 2,
          }}
        >
          <Mui.CardHeader title="Login" titleTypographyProps={{ fontWeight: 'bold' }} />
          <Mui.CardContent>
            <Button variant="contained" color="primary" onClick={handleLoginClick} fullWidth>
              Login with Google
            </Button>
          </Mui.CardContent>
        </Mui.Card>
      </Mui.Container>
    </>
  );
};
