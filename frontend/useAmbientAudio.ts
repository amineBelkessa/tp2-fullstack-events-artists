import { useEffect, useRef, useState } from "react";

export function useAmbientAudio(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    const unlock = () => {
      if (!enabled) {
        audio.play().then(() => {
          audio.volume = 0.08;
          setEnabled(true);
        }).catch(() => {});
      }
      window.removeEventListener("click", unlock);
      window.removeEventListener("keydown", unlock);
    };

    window.addEventListener("click", unlock);
    window.addEventListener("keydown", unlock);

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  return audioRef;
}
