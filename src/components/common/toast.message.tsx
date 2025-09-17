import React from "react";
import { ToastContentProps } from "react-toastify";
import { cn } from "../../utils/utils";

interface CustomToastProps extends Partial<ToastContentProps> {
  message: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  variant?: "default" | "success" | "error" | "warning";
  className?: string;
}

const CustomToast: React.FC<CustomToastProps> = ({
  message,
  title,
  icon,
  variant = "default",
  className,
}) => {
  // Keep only text color per variant; remove bg/border/shadow visuals
  const variantClass = {
    default: "text-gray-800",
    success: "text-green-800",
    error: "text-red-800",
    warning: "text-amber-800",
  }[variant];

  return (
    <div className={cn("flex w-full items-start gap-2", variantClass, className)}>
      {icon && <div className="mt-0.5 shrink-0">{icon}</div>}
      <div className="flex-1 text-sm leading-5">{title ? `${title}: ` : null}{message}</div>
    </div>
  );
};

export default CustomToast;
