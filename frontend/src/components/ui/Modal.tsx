import React from "react";
import clsx from "clsx";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px]">
        {children}

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}
