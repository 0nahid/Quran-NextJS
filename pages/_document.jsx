import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head key="title">
          <link key="next" rel="manifest" href="/manifest.json" />
          <link key="rel" rel="apple-touch-icon" href="/icon.png"></link>
          <meta key="description" name="theme-color" content="#fff" />
        </Head>
        <body key="body">
          <Main key="main" />
          <NextScript key="nextscript" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
