/** @jsxImportSource @emotion/react */
import 'purecss/build/pure.css'
import { navbar } from '@/styles/styles'
import Link from 'next/link';

export default function App({ Component, pageProps }) {
  return(<>
  <div className="home-menu pure-menu pure-menu-horizontal" css={navbar}>
      <Link href="/" className="pure-menu-heading pure-menu-link">Home</Link>
      <ul className="pure-menu-list">
            <li className="pure-menu-item">
                <Link href="/" className="pure-menu-link">Todo</Link>
            </li>
            <li className="pure-menu-item">
                <Link href="/" className="pure-menu-link">Done</Link>
            </li>
      </ul>
  </div>
  <Component {...pageProps} />
  </>); 
}
