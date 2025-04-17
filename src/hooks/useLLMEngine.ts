import { useState, useEffect } from "react";
import * as webllm from "@mlc-ai/web-llm";
import { DEFAULT_MODELS } from "../utils/Constants";

export interface LLMEngineState {
  engine: webllm.MLCEngine | null;
  loadingStatus: string;
  modelLoaded: boolean;
  isChangingModel: boolean;
}

export function useLLMEngine(modelName: string): LLMEngineState {
  const [engine, setEngine] = useState<webllm.MLCEngine | null>(null);
  const [loadingStatus, setLoadingStatus] = useState("Loading model...");
  const [modelLoaded, setModelLoaded] = useState(false);
  const [isChangingModel, setIsChangingModel] = useState(false);

  useEffect(() => {
    async function initializeEngine() {
      try {
        setLoadingStatus("Initializing WebLLM engine...");
        setModelLoaded(false);
        setIsChangingModel(true);

        // Find the selected model in DEFAULT_MODELS
        const selectedModel = DEFAULT_MODELS.find(
          (model) => model.name === modelName
        );

        if (!selectedModel) {
          throw new Error(`Model ${modelName} not found in available models`);
        }

        console.log("Loading model:", selectedModel.name);

        // Track the highest progress value we've seen
        let highestProgress = 0;

        // Use the model directly without custom appConfig
        const newEngine = await webllm.CreateMLCEngine(selectedModel.name, {
          initProgressCallback: (progress) => {
            // Only update if the new progress is higher than what we've seen before
            if (progress.progress > highestProgress) {
              highestProgress = progress.progress;
              setLoadingStatus(
                `Loading model (only slow first time): ${Math.round(
                  highestProgress * 100
                )}%`
              );
            } else {
              // If progress seems to go backward, just report the stage without percentage
              setLoadingStatus(`${progress.text || "Processing..."}`);
            }
          },
        });

        setEngine(newEngine);
        setModelLoaded(true);
        setLoadingStatus("Model loaded successfully!");
      } catch (error) {
        console.error("Failed to initialize WebLLM engine:", error);
        setLoadingStatus(`Error loading model: ${error}`);
      } finally {
        setIsChangingModel(false);
      }
    }

    initializeEngine();
  }, [modelName]);

  return {
    engine,
    loadingStatus,
    modelLoaded,
    isChangingModel,
  };
}
