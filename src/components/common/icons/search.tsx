import React from "react";

interface SearchIconProps {
  size?: number;
  className?: string;
  color?: string;
  onClick?: () => void;
}

const SearchIcon: React.FC<SearchIconProps> = ({
  size = 24,
  className = "",
  color = "currentColor",
  onClick,
}) => {
  return (
    <svg
      className={`${className} shrink-0`}
      style={{ width: size, height: size }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={onClick}
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </svg>
  );
};

export default SearchIcon;
