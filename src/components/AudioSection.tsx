import { AudioManager } from "./AudioManager";
import { Transcriber } from "../hooks/useTranscriber";

interface AudioSectionProps {
  transcriber: Transcriber;
  onTranscriptReady: (text: string) => void;
  isWhisperModelLoading: boolean;
  hasPreviousExpression: boolean;
}

export function AudioSection({
  transcriber,
  onTranscriptReady,
  isWhisperModelLoading,
  hasPreviousExpression
}: AudioSectionProps) {
  return (
    <div className="w-full bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-purple)] dark:from-[var(--color-dark-bg-primary)] dark:to-[var(--color-accent-purple)] p-4 sm:p-6 md:p-8 rounded-xl shadow-lg text-white text-center mb-4 sm:mb-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">
        {hasPreviousExpression ? "Modify Expression" : "Dictate Math Expression"}
      </h2>
      <AudioManager
        transcriber={transcriber}
        onTranscriptReady={onTranscriptReady}
        isModelLoading={isWhisperModelLoading}
      />
    </div>
  );
}
