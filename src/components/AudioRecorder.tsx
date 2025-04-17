import { useState, useEffect, useRef } from "react";
import { MicrophoneIcon } from "../assets/icons/MicrophoneIcon";
import { StopIcon } from "../assets/icons/StopIcon";
import { formatAudioTimestamp } from "../utils/AudioUtils";
import { webmFixDuration } from "../utils/BlobFix";

function getMimeType() {
  const types = [
    "audio/webm",
    "audio/mp4",
    "audio/ogg",
    "audio/wav",
    "audio/aac",
  ];
  for (let i = 0; i < types.length; i++) {
    if (MediaRecorder.isTypeSupported(types[i])) {
      return types[i];
    }
  }
  return undefined;
}

export default function AudioRecorder(props: {
  isRecording: boolean;
  onRecordingToggle: (blob?: Blob) => void;
  disabled?: boolean;
}) {
  const [duration, setDuration] = useState(0);
  const { isRecording } = props;

  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startTimeRef = useRef<number>(0);

  // Initialize or stop the media recorder when isRecording changes
  useEffect(() => {
    const startRecording = async () => {
      startTimeRef.current = Date.now();
      chunksRef.current = [];

      try {
        if (!streamRef.current) {
          streamRef.current = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
        }

        const mimeType = getMimeType();
        const mediaRecorder = new MediaRecorder(streamRef.current, {
          mimeType,
        });

        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.addEventListener("dataavailable", async (event) => {
          console.log(
            "MediaRecorder data available:",
            event.data.size,
            "bytes"
          );
          if (event.data.size > 0) {
            chunksRef.current.push(event.data);
          }
        });

        mediaRecorder.addEventListener("stop", async () => {
          console.log("MediaRecorder stopped");
          const recordingDuration = Date.now() - startTimeRef.current;
          console.log("Recording duration:", recordingDuration, "ms");

          if (chunksRef.current.length === 0) {
            console.error("No audio data recorded");
            props.onRecordingToggle();
            return;
          }

          // Received a stop event
          let blob = new Blob(chunksRef.current, { type: mimeType });
          console.log("Created blob:", blob.size, "bytes, type:", blob.type);

          if (mimeType === "audio/webm") {
            try {
              blob = await webmFixDuration(blob, recordingDuration, blob.type);
              console.log("Fixed webm duration");
            } catch (error) {
              console.error("Error fixing webm duration:", error);
            }
          }

          props.onRecordingToggle(blob);
        });

        mediaRecorder.start(1000); // Collect data every second for better reliability
        setDuration(0);
      } catch (error) {
        console.error("Error accessing microphone:", error);
        props.onRecordingToggle(); // Toggle back to not recording
      }
    };

    const stopRecording = () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        mediaRecorderRef.current.stop(); // set state to inactive
        setDuration(0);
      }
    };

    if (isRecording) {
      startRecording();
    } else if (mediaRecorderRef.current) {
      stopRecording();
    }

    return () => {
      if (!isRecording && streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [isRecording]);

  // Timer effect for recording duration
  useEffect(() => {
    if (isRecording) {
      const timer = setInterval(() => {
        setDuration((prevDuration) => prevDuration + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isRecording]);

  return (
    <button
      type="button"
      onClick={() => props.onRecordingToggle()}
      disabled={props.disabled}
      className={`p-3 rounded-full flex items-center justify-center shadow-sm transition-all duration-200 ${
        isRecording
          ? "bg-red-500 text-white ring-4 ring-red-200 dark:ring-red-900"
          : props.disabled
          ? "bg-gray-400 text-white cursor-not-allowed"
          : "bg-[var(--color-accent-blue)] text-white hover:opacity-90 hover:scale-105"
      }`}
    >
      {isRecording ? <StopIcon /> : <MicrophoneIcon />}
    </button>
  );
}
