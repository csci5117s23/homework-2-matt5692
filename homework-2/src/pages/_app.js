/** @jsxImportSource @emotion/react */
import 'purecss/build/pure.css'
import { navbar, userButton } from '@/styles/styles'
import Link from 'next/link';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/router';

//public page example from clerk docs https://clerk.com/docs/nextjs/pages-react
const publicPages = ["/", "/404"];

export default function App({ Component, pageProps }) {
  const { pathname } = useRouter();
  const isPublicPage = publicPages.includes(pathname);
  return(<>
  <ClerkProvider {...pageProps} >
  <div className="home-menu pure-menu pure-menu-horizontal" css={navbar}>
      <Link href="/todo" className="pure-menu-heading pure-menu-link">Todo</Link>
      <ul className="pure-menu-list">
            <li className="pure-menu-item">
                <Link href="/done" className="pure-menu-link">Done</Link>
            </li>
            <SignedIn>
              <li className="pure-menu-item">
                <UserButton css={userButton}/>
              </li>
            </SignedIn>
      </ul>
  </div>
  {isPublicPage ? (
    <Component {...pageProps} />
  ) : (
    <>
    <SignedIn>
        <UserButton />
        <Component {...pageProps} />
    </SignedIn>
    <SignedOut>
        <RedirectToSignIn />
    </SignedOut>
    </>
  )}
  </ClerkProvider>
  </>); 
}
