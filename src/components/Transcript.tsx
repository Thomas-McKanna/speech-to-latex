import { useRef, useEffect } from "react";

import { TranscriberData } from "../hooks/useTranscriber";
import { formatAudioTimestamp } from "../utils/AudioUtils";

interface Props {
  transcribedData: TranscriberData | undefined;
}

export default function Transcript({ transcribedData }: Props) {
  const divRef = useRef<HTMLDivElement>(null);

  const saveBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportTXT = () => {
    const chunks = transcribedData?.chunks ?? [];
    const text = chunks
      .map((chunk) => chunk.text)
      .join("")
      .trim();

    const blob = new Blob([text], { type: "text/plain" });
    saveBlob(blob, "transcript.txt");
  };

  // Scroll to the bottom when the component updates
  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  });

  if (!transcribedData?.chunks?.length) {
    return null;
  }

  return (
    <div className="w-full rounded-lg bg-white shadow-xl shadow-black/5 ring-1 ring-slate-700/10 p-3">
      <h3 className="text-lg font-medium mb-2 text-center">Transcription</h3>

      <div
        ref={divRef}
        className="w-full flex flex-col max-h-[12rem] overflow-y-auto"
      >
        {transcribedData.chunks.map((chunk, i) => (
          <div
            key={`${i}-${chunk.text}`}
            className="w-full flex flex-row mb-2 bg-gray-50 rounded-lg p-2"
          >
            <div className="mr-3 text-xs text-gray-500 pt-0.5">
              {formatAudioTimestamp(chunk.timestamp[0])}
            </div>
            <div>{chunk.text}</div>
          </div>
        ))}
      </div>

      {!transcribedData.isBusy &&
        {
          /* Removed buttons as they're no longer needed */
        }}
    </div>
  );
}
