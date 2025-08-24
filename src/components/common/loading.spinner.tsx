import { cn } from "../../utils/utils";

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner = ({ className = "" }: LoadingSpinnerProps) => {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      <div className="animate-spin inline-block w-12 h-12 border-4 border-green-800 border-t-transparent rounded-full">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
