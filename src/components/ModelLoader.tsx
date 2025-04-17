interface ModelLoaderProps {
  loadingStatus: string;
  modelLoaded: boolean;
}

export function ModelLoader({ loadingStatus, modelLoaded }: ModelLoaderProps) {
  if (modelLoaded) return null;
  
  return (
    <div className="flex flex-col items-center justify-center flex-grow w-full bg-[--bg-primary] p-8 rounded-xl shadow-lg border border-[--border-color]">
      <div className="text-xl text-[--text-primary] text-center font-medium mb-4">
        {loadingStatus}
      </div>
      <div className="w-full max-w-md h-3 bg-[--bg-secondary] rounded-full overflow-hidden">
        <div
          className={`h-full bg-[var(--color-accent-blue)] rounded-full ${
            !loadingStatus.includes("%") ? "animate-pulse" : ""
          }`}
          style={{
            width: loadingStatus.includes("%")
              ? loadingStatus.match(/\d+/)?.[0] + "%"
              : "100%",
            opacity: loadingStatus.includes("%") ? 1 : 0.7,
          }}
        ></div>
      </div>
    </div>
  );
}
