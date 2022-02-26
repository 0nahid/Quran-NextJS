import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-gray-50">
      <div key="null" className="container mx-auto ">
        <Component key="0" {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
