/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { v4 } from "uuid";

export const AudionPlayer = ({ audioSrc }) => {
  const [surah, setSurah] = React.useState(null);
  const [play, setPlay] = React.useState(false);

  React.useEffect(() => {
    const audio = new Audio(audioSrc);
    setSurah(audio);
  }, [audioSrc]);

  function handlePlay() {
    setPlay((prev) => !prev);
  }

  function handleRestart() {
    setPlay(true);
    surah.pause();
    surah.currentTime = 0;
    surah.play();
  }

  function playSurah() {
    if (!surah) return;
    if (play) surah.play();
    else surah.pause();
  }

  React.useEffect(() => {
    playSurah();
  }, [play]);

  return (
    <div key={v4()}>
      <button key={v4()} className="p-4 rounded" onClick={handlePlay}>
        {!play ? "Play" : "Pause"}
      </button>
      <button key={v4()} className="p-4 rounded" onClick={handleRestart}>
        Restart
      </button>
    </div>
  );
};
