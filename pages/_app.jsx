import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="container mx-auto">
      <Component key="0" {...pageProps} />
    </div>
  );
}

export default MyApp;
