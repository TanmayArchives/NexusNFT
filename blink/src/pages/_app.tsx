import type { AppProps } from 'next/app';
import { AppStateProvider } from '../context/AppStateContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppStateProvider>
      <Component {...pageProps} />
    </AppStateProvider>
  );
}

export default MyApp;
