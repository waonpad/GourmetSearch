import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { appTheme } from '@/style/Theme';

type ViewProps = {
  children: JSX.Element;
};

export const View = ({ children }: ViewProps) => {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
