interface GradientIconProps {
  path: string;
  className?: string;
  viewBox?: string;
}

export const GradientIcon = ({ path, viewBox, className }: GradientIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`${viewBox ? viewBox : "0 0 512 512"}`}
    className={className}
  >
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#7806BA", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#EE4266", stopOpacity: 1 }} />
      </linearGradient>
    </defs>

    <path fill="url(#grad1)" d={path} />
  </svg>
);