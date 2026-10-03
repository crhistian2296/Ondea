type SpinnerProps = {
  className?: string;
  "aria-hidden"?: boolean;
};

export function Spinner({
  className = "",
  "aria-hidden": ariaHidden,
}: SpinnerProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label={ariaHidden ? undefined : "Loading"}
      aria-hidden={ariaHidden}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="32"
        strokeDashoffset="12"
      />
    </svg>
  );
}
