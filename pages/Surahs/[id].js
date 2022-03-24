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

      <div key={quranData.name.transliteration.en}>
        {/* Name & Navigation */}
        <div
          key={quranData.name.transliter}
          className="flex flex-wrap -mx-2 overflow-hidden"
        >
          <div
            key={quranData.name.transliter}
            className="my-2 px-2 w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2"
          >
            <h1 key={quranData.number} className="text-2xl font-semibold">
              {quranData.name.transliteration.en} -(
              {quranData.name.long})
            </h1>
          </div>

          <div
            key={quranData.name.transliter}
            className="my-2 px-2 w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2"
          >
            <Link key={quranData.name.transliteration.id} href="/">
              <a
                key={quranData.name.transliteration.en}
                className="bg-[#009b5a] p-10 m-10 rounded"
              >
                Back to Home
              </a>
            </Link>
          </div>
        </div>

        {/* Details & Play */}

        <div
          key={quranData.name.transliter}
          className="flex flex-wrap -mx-2 overflow-hidden"
        >
          <div
            key={quranData.name.transliter}
            className="my-2 px-2 w-full overflow-hidden md:w-1/4 bg-[#009b5a] p-3 mt-6 md:mr-3 rounded"
          >
            Play the {quranData.name.long} ({quranData.name.transliteration.en})
            <AudionPlayer
              key={quranData.number}
              audioSrc={`https://github.com/0nahid/Surah-API/blob/main/Surah/${quranData.number}.mp3?raw=true`}
            />
          </div>

          <div
            key={quranData.name.transliter}
            className="my-2 px-2 w-full overflow-hidden md:w-1/4"
          >
            {/* Details */}
            <ol key={quranData.number}>
              {quranData.verses.map((item) => (
                <li
                  key={item.number}
                  className="mt-4 bg-slate-900 p-3 rounded hover:bg-[#009b5a] list-decimal"
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
