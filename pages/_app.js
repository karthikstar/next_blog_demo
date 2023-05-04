// `pages/_app.js`
import '../styles/globals.css'
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// CSS Modules are useful for component-level styles. But if you want some CSS to be loaded by every page, Next.js has support for that as well.

// To load global CSS to your application, create a file called pages/_app.js with the following content:

// The default export of _app.js is a top-level React component that wraps all the pages in your application. 

// In Next.js, you can add global CSS files by importing them from pages/_app.js. You cannot import global CSS anywhere else.

