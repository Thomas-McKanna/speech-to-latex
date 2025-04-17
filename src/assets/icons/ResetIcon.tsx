interface ResetIconProps {
  className?: string;
}

export function ResetIcon({ className = "" }: ResetIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 2v6h6"></path>
      <path d="M3 8L8 3"></path>
      <path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path>
      <path d="M21 22v-6h-6"></path>
      <path d="M21 16l-5 5"></path>
      <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
    </svg>
  );
}
