import React from "react";
import { Sparkles } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center py-16 px-6 border border-dashed border-neutral-300 rounded-2xl bg-card-bg/30"
      style={{ borderRadius: "16px" }}
    >
      <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center mb-4">
        <Sparkles className="w-5 h-5 text-sky-800" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-bold text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-700 text-sm max-w-md">{description}</p>
    </div>
  );
}
