import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

import { store } from '../store';
import '../styles/globals.css';
import Header from '../components/Header';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Amazon Clone</title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <div className='bg-gray-100'>
            <Header />
            <Component {...pageProps} />
          </div>
        </Provider>
      </SessionProvider>
    </>
  );
}
