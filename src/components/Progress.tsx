export default function Progress({
  text,
  percentage,
}: {
  text: string;
  percentage: number;
}) {
  percentage = percentage ?? 0;
  return (
    <div className="mt-0.5 w-full relative text-sm text-white bg-[--bg-secondary] border-1 border-[--border-color] rounded-lg text-left overflow-hidden">
      <div
        className="top-0 h-full bg-[var(--color-accent-blue)] whitespace-nowrap px-2"
        style={{ width: `${percentage}%` }}
      >
        {text} ({`${percentage.toFixed(2)}%`})
      </div>
    </div>
  );
}
