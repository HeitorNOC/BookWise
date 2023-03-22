import type { AppProps } from 'next/app';
import { Nunito } from '@next/font/google';
import { globalStyles } from './styles/global';

const nunito = Nunito({
  subsets: ['latin', 'latin-ext']
})

export default function MyApp({ Component, pageProps }: AppProps) {
  
    globalStyles()
    return (
      <div
        className={`${nunito.className}`}
      >
        
        <Component {...pageProps} />
      </div>
    );
  

  
}