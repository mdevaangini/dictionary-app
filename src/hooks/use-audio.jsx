import { useState, useRef } from "react";

export function useAudio(url) {
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const handleWaiting = useRef(null);
  const handleLoadedData = useRef(null);

  function attachEvents(audio) {
    if (handleWaiting.current !== null) {
      audio.removeEventListener("waiting", handleWaiting.current);
    }

    if (handleLoadedData.current !== null) {
      audio.removeEventListener("loadeddata", handleLoadedData.current);
    }

    handleWaiting.current = () => {
      setIsAudioLoading(true);
    };

    audio.addEventListener("waiting", handleWaiting.current);

    handleLoadedData.current = () => {
      if (audio.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA)
        setIsAudioLoading(false);
    };
    audio.addEventListener("loadeddata", handleLoadedData.current);
  }

  function playAudio() {
    if (!url) return;
    const audio = new Audio(url);
    attachEvents(audio);
    audio.play();
  }

  return { playAudio, isAudioLoading };
}
