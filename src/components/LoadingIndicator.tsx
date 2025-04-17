import { LoadingSpinner } from "../assets/icons/LoadingSpinner";

interface LoadingIndicatorProps {
  isLoading: boolean;
  isChangingModel: boolean;
}

export function LoadingIndicator({ isLoading, isChangingModel }: LoadingIndicatorProps) {
  if (!isLoading && !isChangingModel) return null;
  
  return (
    <div className="flex justify-center mt-3">
      <div className="text-center text-[--text-primary] bg-[--bg-primary] px-4 py-2 rounded-full shadow-md border border-[--border-color]">
        <LoadingSpinner className="animate-spin inline-block mr-2 h-5 w-5 text-[var(--color-accent-blue)]" />
        {isChangingModel
          ? "Loading LLM model..."
          : "Converting speech to LaTeX..."}
      </div>
    </div>
  );
}
