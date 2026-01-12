import React from "react";

type SpinnerProps = {
  size?: number;
  className?: string;
};

export default function Spinner({ size = 24, className = "" }: SpinnerProps) {
  return (
    <div
      className={`
        relative inline-flex items-center justify-center
        ${className}
      `}
      style={{ width: size, height: size }}
    >
      {/* glow */}
      <div className="
        absolute inset-0 rounded-full
        bg-white/10 blur-md
      " />

      {/* ring */}
      <div
        className="
          relative
          h-full w-full
          rounded-full
          border-2 border-white/20
          border-t-white
          animate-spin
        "
      />
    </div>
  );
}
