import Head from "next/head";
import Link from "next/link";
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
  return (
    <>
      <Head>
        <title key={quranData.sequence}>
          {quranData.name.long} || {quranData.name.transliteration.en}
        </title>
      </Head>

      <div className="p-5 rounded relative">
        <div
          className="flex mt-5 flex-wrap overflow-hidden sm:-mx-1 fixed top-0 left-0 right-0 bg-slate-900 p-5"
          key={quranData.number}
        >
          <div
            key={quranData.number}
            className="w-full overflow-hidden sm:my-1 sm:px-1 md:w-1/2 lg:w-1/2 xl:w-1/2"
          >
            <h1 key={quranData.number} className="text-2xl font-semibold">
              {quranData.name.transliteration.en} -(
              {quranData.name.long})
            </h1>
          </div>
          {/* Navigate to Home */}
          <div
            key={quranData.number}
            className="w-full overflow-hidden sm:my-1 sm:px-1 md:w-1/2 lg:w-1/2 xl:w-1/2"
          >
            <Link key={quranData.name.transliteration.id} href="/">
              <a
                key={quranData.name.transliteration.en}
                className="bg-[#009B5A] p-4 rounded-xl text-white "
              >
                Back to Home
              </a>
            </Link>
          </div>
        </div>

        <div
          key={quranData.name.transliteration.en}
          className="md:grid md:grid-cols-3 md:grid-rows-2 md:gap-2 mt-10 mb-10"
        >
          <div
            key={quranData.name.transliteration.en}
            className="md:row-span-2"
          >
            {/* Play button */}
            <div
              key={quranData.name.transliter}
              className="bg-[#009b5a] p-5 m-5 rounded"
            >
              Play the {quranData.name.long} (
              {quranData.name.transliteration.en})
              <AudionPlayer
                key={quranData.number}
                src={`https://github.com/0nahid/Surah-API/blob/main/Surah/${quranData.number}.mp3?raw=true`}
              />
            </div>
          </div>
          <div
            key={quranData.name.transliteration.en}
            className="md:col-start-2 md:col-span-2"
          >
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
          </div>
        </div>
      </div>
    </>
  );
}
