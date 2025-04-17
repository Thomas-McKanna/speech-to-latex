import { useState, useEffect } from "react";
import { useTranscriber } from "./hooks/useTranscriber";
import { ModelSelectionPanel } from "./components/ModelSelectionPanel";
import { LatexOutput } from "./components/LatexOutput";
import { LoadingIndicator } from "./components/LoadingIndicator";
import { ModelLoader } from "./components/ModelLoader";
import { AudioSection } from "./components/AudioSection";
import { useLLMEngine } from "./hooks/useLLMEngine";
import { useConversation } from "./hooks/useConversation";
import { DarkModeToggle } from "./components/DarkModeToggle";
import { GitHubIcon } from "./assets/icons/GitHubIcon";

function App() {
  const [whisperModel, setWhisperModel] = useState("Xenova/whisper-tiny");
  const [isWhisperModelLoading, setIsWhisperModelLoading] = useState(false);
  const [llmModel, setLlmModel] = useState("Llama-3.1-8B-Instruct-q4f32_1-MLC");

  const transcriber = useTranscriber();
  const { engine, loadingStatus, modelLoaded, isChangingModel } =
    useLLMEngine(llmModel);
  const {
    latexOutput,
    isLoading,
    hasPreviousExpression,
    sendToLLM,
    resetConversation,
  } = useConversation(engine);

  // Set the whisper model when it changes in the dropdown
  useEffect(() => {
    const loadModel = async () => {
      setIsWhisperModelLoading(true);
      await transcriber.setModel(whisperModel);
      setIsWhisperModelLoading(false);
    };

    loadModel();
  }, [whisperModel]);

  return (
    <div className="min-h-screen bg-[--bg-primary]">
      <div className="container mx-auto p-4 sm:p-6 flex flex-col items-center max-w-5xl min-w-[800px] lg:min-w-[1000px] xl:min-w-[1200px]">
        <div className="w-full flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-center flex-grow text-[var(--color-accent-blue)] tracking-tight">
            Speech to LaTeX
          </h1>
          <DarkModeToggle />
        </div>

        <ModelLoader loadingStatus={loadingStatus} modelLoaded={modelLoaded} />

        {modelLoaded && (
          <div className="flex flex-col items-center w-full max-w-full">
            {/* LaTeX Rendered Output */}
            <LatexOutput
              latexOutput={latexOutput}
              hasPreviousExpression={hasPreviousExpression}
              onReset={resetConversation}
              isLoading={isLoading}
              isChangingModel={isChangingModel}
            />

            {/* Audio Recording Section */}
            <AudioSection
              transcriber={transcriber}
              onTranscriptReady={sendToLLM}
              isWhisperModelLoading={isWhisperModelLoading}
              hasPreviousExpression={hasPreviousExpression}
            />

            {/* Model Selection Panel */}
            <div className="w-full max-w-full">
              <ModelSelectionPanel
                llmModel={llmModel}
                setLlmModel={setLlmModel}
                whisperModel={whisperModel}
                setWhisperModel={setWhisperModel}
                isChangingLLMModel={isChangingModel}
                isWhisperModelLoading={isWhisperModelLoading}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* GitHub Link */}
      <footer className="w-full py-4 mt-8 flex justify-center">
        <a 
          href="https://github.com/Thomas-McKanna/speech-to-latex" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--color-accent-blue)] transition-colors"
        >
          <GitHubIcon className="h-5 w-5" />
          <span>View on GitHub</span>
        </a>
      </footer>
    </div>
  );
}

export default App;
