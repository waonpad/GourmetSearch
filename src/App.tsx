import { AppProvider } from '@/providers/app';
import { AppRoutes } from '@/routes';

import { APP_ENV } from './config';

APP_ENV !== 'development' && (console.log = () => {});

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
