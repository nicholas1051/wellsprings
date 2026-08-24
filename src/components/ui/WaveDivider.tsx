interface WaveDividerProps {
  fillFrom?: string;
  fillTo?: string;
  flip?: boolean;
  className?: string;
}

export function WaveDivider({
  fillFrom = "#fcfbf8",
  fillTo = "#ffffff",
  flip = false,
  className,
}: WaveDividerProps) {
  return (
    <div className={`relative w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""} ${className ?? ""}`}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-16 w-full sm:h-20 md:h-24"
        aria-hidden="true"
      >
        <path
          d="M0,40 C240,100 480,0 720,60 C960,120 1200,20 1440,80 L1440,120 L0,120 Z"
          fill={fillTo}
        />
        <path
          d="M0,80 C320,20 640,100 960,40 C1120,10 1280,60 1440,30 L1440,0 L0,0 Z"
          fill={fillFrom}
        />
      </svg>
    </div>
  );
}
