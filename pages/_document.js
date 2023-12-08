import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-gb">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/vercel.svg"></link>
          {/* <title>THE DRONING COMPANY</title> */}
          <meta name="theme-color" content="#fff" />
          <link rel="alternate" type="application/rss+xml" title="THE DRONING COMPANY RSS FEED" href="/feed" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script defer src="/cookieconsent/cookieconsent.js"></script>
          <script defer src="/cookieconsent/cookieconsent-init.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
