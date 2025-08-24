interface ChevronRightProps {
  size?: number;
  className?: string;
  color?: string;
}

const ChevronRight: React.FC<ChevronRightProps> = ({
  size = 24,
  className = "",
  color = "currentColor",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={color}
      className={`${className} shrink-0`}
      style={{ width: size, height: size }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
};

export default ChevronRight;
