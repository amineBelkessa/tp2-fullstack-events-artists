import { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AppRouter from "./app/AppRouter";
import AmbientAudio from "./components/ambient/AmbientAudio";

export default function App() {
  const [cursor, setCursor] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-neutral-100 overflow-hidden">

      {/* ===== BACKGROUND MASTER ===== */}
      <div className="fixed inset-0 z-0 pointer-events-none">

        {/* Base */}
        <div className="absolute inset-0 bg-black" />

        {/* 🟣 Mesh Gradient Animé */}
        <div className="absolute inset-0 animate-mesh bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.35),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.35),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.35),transparent_45%)] blur-[120px]" />

        {/* 🎥 Light Rays */}
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.04)_30%,transparent_35%,transparent_60%,rgba(255,255,255,0.03)_65%,transparent_70%)] opacity-40" />

        {/* 🌫 Brume */}
        <div className="absolute inset-0 animate-fog bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.035),transparent_70%)]" />

        {/* 🖱 Halo curseur */}
        <div
          className="pointer-events-none absolute h-[480px] w-[480px] rounded-full transition-transform duration-200 ease-out"
          style={{
            transform: `translate(${cursor.x - 240}px, ${cursor.y - 240}px)`,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.14), transparent 60%)",
            filter: "blur(90px)",
          }}
        />

        {/* 🎞 Grain cinéma */}
        <div className="absolute inset-0 noise opacity-[0.08] mix-blend-overlay" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_38%,rgba(0,0,0,0.88))]" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10">
        <Header />
        <AppRouter />
      </div>

      {/* 🎧 AUDIO AMBIANCE */}
      <AmbientAudio />
      <Footer />
    </div>
  );
}
