import { useQuery } from "@tanstack/react-query";
import { apiFetchAllBrand } from "../config/api";

interface UseBrandsProps {
    currentPage: number;
    size: number;
}

export const useBrands = ({ currentPage, size }: UseBrandsProps) => {

    const { data: brands, isPending, isPlaceholderData, isError } = useQuery({
        queryKey: [["fetchAllBrands"], currentPage],
        queryFn: () => apiFetchAllBrand(`page=${currentPage}&size=${size}`),
    });

    return { brands, isPending, isPlaceholderData, isError };
}