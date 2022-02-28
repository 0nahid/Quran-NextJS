import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-slate-800  text-white">
      <div key="app" className="container mx-auto ">
        <Component key="0" {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
