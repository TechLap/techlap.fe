import { ReactNode } from "react";
import { cn } from "../../utils/utils";

interface TabsProps {
  children: ReactNode;
  className?: string;
}

const Tabs = ({ children, className = "" }: TabsProps) => {
  return (
    <div className={className} data-hs-tabs>
      {children}
    </div>
  );
};

interface TabsListProps {
  children: ReactNode;
  className?: string;
}
const TabsList = ({ children, className = "" }: TabsListProps) => {
  return (
    <div
      aria-label="Tabs"
      role="tablist"
      className={cn(
        "bg-gray-100 hover:bg-gray-200 rounded-lg inline-flex items-center justify-center gap-x-1 px-2",
        className
      )}
    >
      {children}
    </div>
  );
};

interface TabsItemProps {
  id: string;
  title: string;
  icon?: ReactNode;
  active?: boolean;
  className?: string;
}
const TabsItem = ({
  id,
  title,
  icon,
  active = false,
  className = "",
}: TabsItemProps) => {
  return (
    <button
      type="button"
      className={cn(
        "py-2 px-3 text-nowrap inline-flex items-center justify-center gap-x-2 bg-transparent text-sm text-gray-500 hover:text-gray-700 focus:outline-hidden focus:text-gray-700 font-medium rounded-lg hover:hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none",
        "hs-tab-active:bg-white hs-tab-active:text-gray-700",
        active && "active",
        className
      )}
      id={`tabs-${id}-item`}
      aria-selected={active ? "true" : "false"}
      data-hs-tab={`#tabs-${id}`}
      aria-controls={`tabs-${id}`}
      role="tab"
    >
      {icon && <span className="tab-icon">{icon}</span>}
      <span className="tab-title">{title}</span>
    </button>
  );
};

interface TabsContentProps {
  id: string;
  children: ReactNode;
  className?: string;
}
const TabsContent = ({ id, children, className = "" }: TabsContentProps) => {
  return (
    <div
      id={`tabs-${id}`}
      className={cn(className)}
      role="tabpanel"
      aria-labelledby={`tabs-${id}-item`}
    >
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsItem, TabsContent };
