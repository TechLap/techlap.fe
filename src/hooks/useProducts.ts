import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiFetchAllProduct } from "../config/api";

interface UseProductsProps {
    currentPage: number;
    size: number;
}

export const useProducts = ({ currentPage, size }: UseProductsProps) => {
    const { data: products, isPending, isPlaceholderData, isError } = useQuery({
        queryKey: ["fetchAllProducts", currentPage],
        queryFn: () => apiFetchAllProduct(`page=${currentPage}&size=${size}`),
        placeholderData: keepPreviousData,
    });

    return { products, isPending, isPlaceholderData, isError };
}