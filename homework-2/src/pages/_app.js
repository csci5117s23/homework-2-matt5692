/** @jsxImportSource @emotion/react */
import 'purecss/build/pure.css'
import { navbar } from '@/styles/styles'
import Link from 'next/link';
import { ClerkProvider } from '@clerk/nextjs';


export default function App({ Component, pageProps }) {
  return(<>
  <ClerkProvider {...pageProps} >
  <div className="home-menu pure-menu pure-menu-horizontal" css={navbar}>
      <Link href="/todo" className="pure-menu-heading pure-menu-link">Todo</Link>
      <ul className="pure-menu-list">
            <li className="pure-menu-item">
                <Link href="/done" className="pure-menu-link">Done</Link>
            </li>
            <li className="pure-menu-item">
                <Link href="/" className="pure-menu-link">home</Link>
            </li>
      </ul>
  </div>
  <Component {...pageProps} />
  </ClerkProvider>
  </>); 
}
