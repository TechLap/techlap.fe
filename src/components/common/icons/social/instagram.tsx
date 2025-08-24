interface InstagramProps {
  className?: string;
  size?: number;
  color?: string;
}

const Instagram = ({
  className,
  size = 24,
  color = "#000",
}: InstagramProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} shrink-0`}
    >
      <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
};

export default Instagram;
