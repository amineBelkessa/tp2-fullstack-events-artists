import React from "react";
import clsx from "clsx";

type BadgeProps = {
  children: React.ReactNode;
  color?: "gray" | "blue" | "green" | "red" | "yellow";
  className?: string;
};

export default function Badge({ children, color = "gray", className }: BadgeProps) {
  const colors = {
    gray: "bg-gray-200 text-gray-800",
    blue: "bg-blue-200 text-blue-800",
    green: "bg-green-200 text-green-800",
    red: "bg-red-200 text-red-800",
    yellow: "bg-yellow-200 text-yellow-800",
  };

  return (
    <span
      className={clsx(
        "px-2 py-1 rounded-md text-xs font-medium",
        colors[color],
        className
      )}
    >
      {children}
    </span>
  );
}
