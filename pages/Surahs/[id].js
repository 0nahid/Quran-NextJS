import Head from "next/head";
import Link from "next/link";
export async function getStaticPaths() {
  const res = await fetch("https://api.quran.sutanlab.id/surah");
  const quarnData = await res.json();
  const paths = quarnData.data.map((item) => ({
    params: { id: item.number.toString() },
  }));
  console.log(quarnData);
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
  return (
    <>
      <Head>
        <title key={quarnData.sequence}>
          {" "}
          {quarnData.name.long} || {quarnData.name.transliteration.en}
        </title>
      </Head>

      <div className=" p-5 rounded">
        <h1 key={quarnData.number}>
          {" "}
          This is a detail page of Surah {quarnData.name.transliteration.en} -(
          {quarnData.name.long}){" "}
        </h1>

        {/* Details */}
        <ol key={quarnData.number}>
          {quarnData.verses.map((item) => (
            <li key={item.number} style={{ listStyleType: "decimal" }}>
              <h1 key={item.number}>{item.text.arab}</h1>
            </li>
          ))}
        </ol>

        {/* Navigate to Home */}
        <div key={quarnData.number} className="mt-5">
          <Link key={quarnData.name.transliteration.id} href="/">
            <a
              key={quarnData.name.transliteration.en}
              className="bg-[#009B5A] p-2 "
            >
              Back to Home
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
