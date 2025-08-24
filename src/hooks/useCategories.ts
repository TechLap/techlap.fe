import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiFetchAllCategory } from "../config/api";

interface UseCategoriesProps {
    currentPage: number;
    size: number;
}

export const useCategories = ({ currentPage, size }: UseCategoriesProps) => {

    const { data: categories, isPending, isPlaceholderData, isError } = useQuery({
        queryKey: ["fetchAllCategories", currentPage],
        queryFn: () => apiFetchAllCategory(`page=${currentPage}&size=${size}`),
        placeholderData: keepPreviousData,
    });

    return { categories, isPending, isPlaceholderData, isError };
}