import React from "react";
import clsx from "clsx";

type CardProps = {
  className?: string;
  children: React.ReactNode;
};

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-white shadow-sm border border-gray-200 rounded-lg p-4",
        className
      )}
    >
      {children}
    </div>
  );
}
