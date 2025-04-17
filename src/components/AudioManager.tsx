import { useState, useEffect } from "react";
import Constants from "../utils/Constants";
import { Transcriber } from "../hooks/useTranscriber";
import Progress from "./Progress";
import AudioRecorder from "./AudioRecorder";

export function AudioManager({
  transcriber,
  onTranscriptReady,
  isModelLoading,
}: {
  transcriber: Transcriber;
  onTranscriptReady?: (text: string) => void;
  isModelLoading?: boolean;
}) {
  const [isRecording, setIsRecording] = useState(false);

  const processAudioRecording = async (data: Blob) => {
    if (!data) return;

    const fileReader = new FileReader();

    fileReader.onloadend = async () => {
      try {
        const audioCTX = new AudioContext({
          sampleRate: Constants.SAMPLING_RATE,
        });
        const arrayBuffer = fileReader.result as ArrayBuffer;
        const decoded = await audioCTX.decodeAudioData(arrayBuffer);

        // Start transcription immediately
        transcriber.start(decoded);
      } catch (error) {
        console.error("Error processing audio:", error);
      }
    };

    fileReader.readAsArrayBuffer(data);
  };

  // When transcription is complete, pass the text to parent component
  useEffect(() => {
    if (onTranscriptReady && transcriber.output && !transcriber.isBusy) {
      const text = transcriber.output.chunks
        .map((chunk) => chunk.text)
        .join(" ")
        .trim();

      if (text) {
        onTranscriptReady(text);
      }
    }
  }, [transcriber.output, transcriber.isBusy]);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4 transform scale-125">
            <AudioRecorder
              isRecording={isRecording}
              onRecordingToggle={(blob) => {
                setIsRecording(!isRecording);
                if (blob) {
                  transcriber.onInputChange();
                  processAudioRecording(blob);
                }
              }}
              disabled={isModelLoading || transcriber.isModelLoading}
            />
          </div>

          {(isModelLoading ||
            transcriber.isModelLoading ||
            transcriber.isBusy) && (
            <div className="text-sm mt-2 text-center font-medium px-3 py-1 rounded-full shadow-sm bg-[--bg-secondary] text-[--text-primary]">
              {isModelLoading || transcriber.isModelLoading
                ? "Loading model..."
                : transcriber.isBusy
                ? "Transcribing..."
                : ""}
            </div>
          )}
        </div>
      </div>

      {transcriber.progressItems.length > 0 && (
        <div className="mt-6 w-full max-w-md mx-auto bg-[--bg-secondary] p-4 rounded-lg shadow-md border border-[--border-color]">
          <label className="block mb-2 text-sm font-medium text-[--text-primary]">
            Loading model files... (only run once)
          </label>
          {transcriber.progressItems.map((data) => (
            <div key={data.file} className="mb-1">
              <Progress text={data.file} percentage={data.progress} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
