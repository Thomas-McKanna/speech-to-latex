import { ModelSelector } from "./ModelSelector";
import { DEFAULT_MODELS } from "../utils/Constants";

interface ModelSelectionPanelProps {
  llmModel: string;
  setLlmModel: (model: string) => void;
  whisperModel: string;
  setWhisperModel: (model: string) => void;
  isChangingLLMModel: boolean;
  isWhisperModelLoading: boolean;
}

export function ModelSelectionPanel({
  llmModel,
  setLlmModel,
  whisperModel,
  setWhisperModel,
  isChangingLLMModel,
  isWhisperModelLoading
}: ModelSelectionPanelProps) {
  return (
    <div className="w-full bg-[--bg-primary] p-5 rounded-lg shadow-md border border-[--border-color] mb-6">
      <h2 className="text-xl font-semibold mb-4 text-[--text-primary]">Model Selection</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full">
          <ModelSelector
            label="LLM Model"
            model={llmModel}
            onChange={setLlmModel}
            disabled={isChangingLLMModel}
          >
            {/* Group models by family */}
            {Object.entries(
              DEFAULT_MODELS.reduce((acc, model) => {
                const family = model.family;
                if (!acc[family]) {
                  acc[family] = [];
                }
                acc[family].push(model);
                return acc;
              }, {} as Record<string, typeof DEFAULT_MODELS>)
            ).map(([family, models]) => (
              <optgroup key={family} label={family}>
                {models.map((modelOption) => (
                  <option key={modelOption.name} value={modelOption.name}>
                    {modelOption.display_name}{" "}
                    {modelOption.size ? `(${modelOption.size})` : ""}
                    {modelOption.quantization
                      ? `- ${modelOption.quantization}`
                      : ""}
                  </option>
                ))}
              </optgroup>
            ))}
          </ModelSelector>
        </div>
        <div className="w-full">
          <ModelSelector 
            label="Whisper Model"
            model={whisperModel} 
            onChange={setWhisperModel}
            disabled={isWhisperModelLoading}
          >
            <option value="Xenova/whisper-tiny">Whisper Tiny (41MB)</option>
            <option value="Xenova/whisper-base">Whisper Base (77MB)</option>
            <option value="Xenova/whisper-small">Whisper Small (249MB)</option>
            <option value="distil-whisper/distil-medium.en">Distil Medium (402MB)</option>
          </ModelSelector>
        </div>
      </div>
    </div>
  );
}
