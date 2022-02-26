import axios from "axios";
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
      <ol key="0">
        {quarnData.map((item) => (
          <li key={item.number} style={{ listStyleType: "decimal" }}>
            <Link href={`${item.number}`} key={item.number} passHref>
              <div
                className="mt-4 bg-slate-100 p-4 rounded cursor-pointer hover:border-l-4 hover:border-[#009b5a]"
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
