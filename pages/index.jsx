import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [quarnData, setQuarnData] = useState([]);
  useEffect(() => {
    axios("http://api.alquran.cloud/v1/quran/en.asad").then((res) => {
      setQuarnData(res.data.data.surahs);
    });
  }, []);
  return (
    <div className="container mx-auto">
      {quarnData.map((item) => (
        <Link href={`${item.number}`} key={item.number} passHref>
          <div
            className="mt-4 bg-slate-100 p-4 rounded cursor-pointer hover:border-l-4 hover:border-[#009b5a]"
            key={item.number}
          >
            <a key={item.number}>
              {" "}
              <h1 key={item.number}>{item.englishName}</h1>
            </a>
          </div>
        </Link>
      ))}
    </div>
  );
}
