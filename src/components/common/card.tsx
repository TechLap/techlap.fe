import React from "react";
import { cn } from "../../utils/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
  }
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
  }
>(({ className, children, ...props }, ref) => {
  return <div ref={ref} className={cn("p-6 flex flex-col space-y-1.5", className)} {...props}>{children}</div>;
});

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
  }
>(({ className, children, ...props }, ref) => {
  return <div ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props}>{children}</div>;
});

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
  }
>(({ className, children, ...props }, ref) => {
  return <div ref={ref} className={cn("p-6 pt-0", className)} {...props}>{children}</div>;
});

export { Card, CardContent, CardHeader, CardTitle};
