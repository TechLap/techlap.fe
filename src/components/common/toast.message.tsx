import React from "react";
import { ToastContentProps } from "react-toastify";

interface CustomToastProps extends Partial<ToastContentProps> {
  message: string;
  className?: string;
}

const CustomToast: React.FC<CustomToastProps> = ({ message, className }) => {
  return (
    <div className={`p-4 rounded-lg shadow-lg bg-white text-gray-800 ${className}`}>
      {message}
    </div>
  );
};

export default CustomToast;
