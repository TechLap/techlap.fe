interface BadgeProps {
  content: string;
  variant?: "default" | "outline" | "solid";
  color?: "gray" | "blue" | "green" | "red" | "yellow" | "purple" | "amber";
  className?: string;
}

const Badge = ({
  content,
  variant = "default",
  color = "gray",
  className = "",
}: BadgeProps) => {
  const getVariantStyles = () => {
    const baseStyles =
      "inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium";

    const colorStyles = {
      gray: {
        default: "bg-gray-100 text-gray-800",
        outline: "border border-gray-800 text-gray-800",
        solid: "bg-gray-800 text-white",
      },
      blue: {
        default: "bg-blue-100 text-blue-800",
        outline: "border border-blue-800 text-blue-800",
        solid: "bg-blue-800 text-white",
      },
      green: {
        default: "bg-green-100 text-green-800",
        outline: "border border-green-800 text-green-800",
        solid: "bg-green-800 text-white",
      },
      red: {
        default: "bg-red-100 text-red-800",
        outline: "border border-red-800 text-red-800",
        solid: "bg-red-800 text-white",
      },
      yellow: {
        default: "bg-yellow-100 text-yellow-800",
        outline: "border border-yellow-800 text-yellow-800",
        solid: "bg-yellow-800 text-white",
      },
      purple: {
        default: "bg-purple-100 text-purple-800",
        outline: "border border-purple-800 text-purple-800",
        solid: "bg-purple-800 text-white",
      },
      amber: {
        default: "bg-amber-100 text-amber-800",
        outline: "border border-amber-800 text-amber-800",
        solid: "bg-amber-800 text-white",
      },
    };

    return `${baseStyles} ${colorStyles[color][variant]} ${className}`;
  };

  return <span className={getVariantStyles()}>{content}</span>;
};

export default Badge;
