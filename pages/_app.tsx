import '../styles/globals.css'
import type { AppProps } from 'next/app'

// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'

import Head from "next/head";
import Link from 'next/link';
import { authService } from '../services/container';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link href='/'>
  <a className="navbar-brand">BookStore</a>
      </Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
    <li className="nav-item">
        <Link href='/user'>
          <a className="nav-link">User</a>
        </Link>
      </li>
      <li className="nav-item active">
        <Link href='/store'>
          <a className="nav-link">Store</a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href='/login'>
          <a className="nav-link">Login</a>
        </Link>
      </li>
      <li className="nav-item">
          <a className="nav-link" onClick={authService.logout}>Logout</a>
      </li>
    </ul>
  </div>
</nav>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
