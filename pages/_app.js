import '../styles/globals.css';
import { useEffect } from 'react';
import { loadStateFromLocalStorage } from '../utils/localStorage';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    loadStateFromLocalStorage();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;