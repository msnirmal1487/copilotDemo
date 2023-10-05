import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme'; // Replace with the path to your Material-UI theme configuration file
import { ComponentType } from 'react';
import { ContextProvider } from '../contexts/UserContext';

interface MyAppProps {
    Component: ComponentType;
    pageProps: any;
  }
  
function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ContextProvider>
      <CssBaseline />
      <Component {...pageProps} />
      </ContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;