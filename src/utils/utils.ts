import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Tạo className cho badge status của product
 * @param status - Trạng thái của sản phẩm
 * @returns className string cho badge outline
 */
export function getProductStatusBadgeClass(status: string): string {
  const baseStyles = "inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium";
  
  const statusStyles = {
    ACTIVE: "border border-blue-800 text-blue-800",
    INACTIVE: "border border-amber-800 text-amber-800", 
    OUT_OF_STOCK: "border border-red-800 text-red-800",
    DISCONTINUED: "border border-purple-800 text-purple-800"
  };

  return `${baseStyles} ${statusStyles[status as keyof typeof statusStyles] || statusStyles.INACTIVE}`;
}
