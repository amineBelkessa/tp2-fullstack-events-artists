import { useEffect, useRef } from "react";

export default function ScrollAmbience() {
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio("/audio/ambience.mp3"); // à mettre dans /public/audio
    audio.loop = true;
    audio.volume = 0.18;

    const onScroll = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      audio
        .play()
        .catch(() => {
          // si le navigateur bloque, on réessaie au prochain scroll/click
          startedRef.current = false;
        });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("click", onScroll, { once: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", onScroll);
      audio.pause();
    };
  }, []);

  return null;
}
