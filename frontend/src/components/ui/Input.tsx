import React from "react";
import clsx from "clsx";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

      <input
        className={clsx(
          "w-full rounded-md border px-3 py-2 bg-white text-gray-900",
          "focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none",
          error && "border-red-500",
          className
        )}
        {...props}
      />

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
