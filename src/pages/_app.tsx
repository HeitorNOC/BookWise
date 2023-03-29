import type { AppProps } from 'next/app';
import { Nunito } from '@next/font/google';
import { globalStyles } from './styles/global';
import { SessionProvider } from 'next-auth/react';

const nunito = Nunito({
  subsets: ['latin', 'latin-ext']
})

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  globalStyles()
  return (
    <SessionProvider session={session}>

      <div
        className={`${nunito.className}`}
      >

        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );



}