import { useEffect, useRef } from "react";

export default function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio("/audio/ambience.mp3");
    audio.loop = true;
    audio.volume = 0.18; // très subtil
    audioRef.current = audio;

    const startAudio = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      audio
        .play()
        .catch(() => {
          // si bloqué, on réessaiera au prochain event
          startedRef.current = false;
        });
    };

    window.addEventListener("scroll", startAudio, { passive: true });
    window.addEventListener("click", startAudio, { once: true });

    return () => {
      window.removeEventListener("scroll", startAudio);
      window.removeEventListener("click", startAudio);
      audio.pause();
    };
  }, []);

  return null;
}
