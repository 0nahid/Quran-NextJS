import Head from "next/head";
import Link from "next/link";
import ReactAudioPlayer from "react-audio-player";
import { AudionPlayer } from "../../components";

export async function getStaticPaths() {
  const res = await fetch("https://api.quran.sutanlab.id/surah");
  const quranData = await res.json();
  const paths = quranData.data.map((item) => ({
    params: { id: item.number.toString() },
  }));
  // console.log(quranData);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.quran.sutanlab.id/surah/${params.id}`);
  const quranData = await res.json();
  return {
    props: {
      quranData: quranData.data,
    },
  };
}

export default function Details({ quranData }) {
  const handleAudioPlay = () => {
    console.log("Clicked");
  };
  return (
    <>
      <Head>
        <title key={quranData.sequence}>
          {quranData.name.long} || {quranData.name.transliteration.en}
        </title>
      </Head>

      <div className=" p-5 rounded">
        <h1 key={quranData.number} className="text-2xl font-semibold">
          {quranData.name.transliteration.en} -(
          {quranData.name.long}){" "}
        </h1>

        {/* Play button */}
        <button
          key={quranData.number}
          onClick={handleAudioPlay}
          className="bg-[#009b5a] p-2 rounded text-white mt-2"
        >
          Play the {quranData.name.long} ({quranData.name.transliteration.en})
          <ReactAudioPlayer
            controls
            preload="auto"
            key={quranData.number}
            src={`https://github.com/0nahid/Surah-API/blob/main/Surah/${quranData.number}.mp3?raw=true`}
          />
        </button>
        {/* Details */}
        <ol key={quranData.number}>
          {quranData.verses.map((item) => (
            <li
              key={item.number}
              className="mt-4 bg-slate-900 p-4 rounded hover:bg-[#009b5a] list-decimal"
            >
              <h1 className="mb-2" key={item.number}>
                {item.text.arab}
              </h1>
              <h2 key={item.number}>{item.text.transliteration?.en}</h2>
              <AudionPlayer
                key={item.audio.primary}
                audioSrc={item.audio.primary}
              />
            </li>
          ))}
        </ol>

        {/* Navigate to Home */}
        <div key={quranData.number} className="mt-5">
          <Link key={quranData.name.transliteration.id} href="/">
            <a
              key={quranData.name.transliteration.en}
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
