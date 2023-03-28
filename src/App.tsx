import { AppProvider } from '@/providers/app';
import { AppRoutes } from '@/routes';

import { View } from './View';
import { APP_ENV } from './config';

APP_ENV !== 'development' && (console.log = () => {});

function App() {
  return (
    <View>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </View>
  );
}

export default App;
