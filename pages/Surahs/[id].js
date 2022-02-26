import Head from "next/head";
import Link from "next/link";
import ReactAudioPlayer from "react-audio-player";

export async function getStaticPaths() {
  const res = await fetch("https://api.quran.sutanlab.id/surah");
  const quarnData = await res.json();
  const paths = quarnData.data.map((item) => ({
    params: { id: item.number.toString() },
  }));
  // console.log(quarnData);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.quran.sutanlab.id/surah/${params.id}`);
  const quarnData = await res.json();
  return {
    props: {
      quarnData: quarnData.data,
    },
  };
}

export default function Details({ quarnData }) {
  const handleAudioPlay = () => {
    console.log("Clicked");
  };
  return (
    <>
      <Head>
        <title key={quarnData.sequence}>
          {" "}
          {quarnData.name.long} || {quarnData.name.transliteration.en}
        </title>
      </Head>

      <div className=" p-5 rounded">
        <h1 key={quarnData.number} className="text-2xl font-semibold">
          {" "}
          {quarnData.name.transliteration.en} -(
          {quarnData.name.long}){" "}
        </h1>

        {/* Play button */}
        <button
          key={quarnData.number}
          onClick={handleAudioPlay}
          className="bg-[#009b5a] p-2 rounded text-white mt-2"
        >
          Play the {quarnData.name.long} ({quarnData.name.transliteration.en})
          <ReactAudioPlayer
            controls
            preload="auto"
            key={quarnData.number}
            src={`https://github.com/0nahid/Surah-API/blob/main/Surah/${quarnData.number}.mp3?raw=true`}
          />
        </button>
        {/* Details */}
        <ol key={quarnData.number}>
          {quarnData.verses.map((item) => (
            <li
              key={item.number}
              className="mt-4 bg-slate-100 p-4 rounded hover:bg-[#009b5a] list-decimal	"
            >
              <h1 className="mb-2" key={item.number}>
                {item.text.arab}
              </h1>
              <h2 key={item.number}>{item.text.transliteration?.en}</h2>
              <ReactAudioPlayer
                controls
                autoplay
                preload="auto"
                // loop
                key={item.number}
                src={item.audio.primary}
              />
            </li>
          ))}
        </ol>

        {/* Navigate to Home */}
        <div key={quarnData.number} className="mt-5">
          <Link key={quarnData.name.transliteration.id} href="/">
            <a
              key={quarnData.name.transliteration.en}
              className="bg-[#009B5A] p-2 rounded text-white "
            >
              Back to Home
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
