import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Quran() {
  const [quarnData, setQuarnData] = useState([]);
  useEffect(() => {
    axios("https://api.quran.sutanlab.id/surah").then((res) => {
      setQuarnData(res.data.data);
    });
  }, []);
  return (
    <>
      <Head>
        <title key={quarnData.number}>القرآن al-Qurʾān </title>
      </Head>
      <ol key="0">
        {quarnData.map((item) => (
          <li key={item.number} style={{ listStyleType: "decimal" }}>
            <Link href={`Surahs/${item.number}`} key={item.number} passHref>
              <div
                className="mt-4 bg-slate-100 p-4 rounded cursor-pointer hover:bg-[#009b5a] hover:text-white"
                key={item.number}
              >
                <a key={item.number}>
                  {" "}
                  <h1 key={item.number} className="font-bold">
                    {item.name.long} ( {item.name.transliteration.en} ){" "}
                  </h1>
                </a>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
