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
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.7.1/css/all.css"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
            rel="stylesheet"
          />
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
