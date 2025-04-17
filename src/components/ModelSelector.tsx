import { ReactNode } from "react";

interface ModelSelectorProps {
  label: string;
  model: string;
  onChange: (model: string) => void;
  disabled?: boolean;
  children: ReactNode;
}

export function ModelSelector({
  label,
  model,
  onChange,
  disabled = false,
  children,
}: ModelSelectorProps) {
  return (
    <div>
      <label className="block mb-1 text-[--text-primary]">{label}</label>
      <select
        className="w-full p-2 border border-[--border-color] rounded-md bg-[--bg-secondary] text-[--text-primary]"
        value={model}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        {children}
      </select>
    </div>
  );
}
