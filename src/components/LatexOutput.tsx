import { ResetIcon } from "../assets/icons/ResetIcon";
import { CopyButtonIcon } from "../assets/icons/CopyButtonIcon";
import { CheckmarkIcon } from "../assets/icons/CheckmarkIcon";
import { LoadingSpinner } from "../assets/icons/LoadingSpinner";
import LatexRenderer from "./LatexRenderer";
import { useState } from "react";

interface LatexOutputProps {
  latexOutput: string;
  hasPreviousExpression: boolean;
  onReset: () => void;
  isLoading?: boolean;
  isChangingModel?: boolean;
}

export function LatexOutput({
  latexOutput,
  hasPreviousExpression,
  onReset,
  isLoading = false,
  isChangingModel = false,
}: LatexOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(latexOutput);
    setCopied(true);

    // Reset after 1.5 seconds
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="bg-[--bg-primary] p-4 sm:p-6 rounded-xl shadow-lg mb-6 sm:mb-8 min-h-[200px] border border-[--border-color] w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[--text-primary]">
          LaTeX Expression
        </h2>
        {hasPreviousExpression && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 px-3 py-1 bg-[--bg-secondary] hover:opacity-90 text-[--text-primary] rounded-md transition-colors"
            title="Reset conversation"
          >
            <ResetIcon className="w-4 h-4" />
            <span className="text-sm">Reset</span>
          </button>
        )}
      </div>

      {/* Rendered LaTeX */}
      <div className="p-4 bg-[--bg-secondary] rounded-lg min-h-[120px] flex flex-col items-center justify-center mb-3">
        <div className="w-full">
          {isLoading || isChangingModel ? (
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center mb-2">
                <LoadingSpinner className="animate-spin h-5 w-5 text-[var(--color-accent-blue)]" />
                <span className="ml-2 text-[--text-primary]">
                  {isChangingModel
                    ? "Loading LLM model..."
                    : "Converting speech to LaTeX..."}
                </span>
              </div>
            </div>
          ) : latexOutput ? (
            <LatexRenderer latex={latexOutput} />
          ) : (
            <p className="text-[--text-secondary] italic">
              LaTeX rendering will appear here...
            </p>
          )}
        </div>
      </div>

      {/* Raw LaTeX Code */}
      {latexOutput && (
        <div className="relative bg-[--bg-secondary] rounded-lg p-3 mt-2">
          <button
            onClick={handleCopy}
            className={`absolute top-2 left-2 p-1.5 z-10 ${
              copied
                ? "bg-[var(--color-accent-green-light)] text-[var(--color-accent-green)]"
                : "bg-[--bg-primary] hover:opacity-90 text-[--text-primary]"
            } rounded-md transition-all duration-200`}
            title={copied ? "Copied!" : "Copy LaTeX"}
          >
            {copied ? (
              <CheckmarkIcon className="w-5 h-5" />
            ) : (
              <CopyButtonIcon className="w-5 h-5" />
            )}
          </button>
          <div className="overflow-x-auto">
            <pre className="text-sm text-[--text-primary] font-mono pl-10 whitespace-pre">
              {latexOutput}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
