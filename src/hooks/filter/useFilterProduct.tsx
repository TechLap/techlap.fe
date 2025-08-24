import { useCallback, useState } from "react";
import { IProductFilter } from "../../types/backend";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { apiSearchProduct } from "../../config/api";

interface UseFilterProductProps {
  searchCurrentPage?: number;
  searchPageSize?: number;
  isSearching?: boolean;
  setIsSearching?: (isSearching: boolean) => void;
  priceRange?: {
    min: number;
    max: number;
  };
}

export const useFilterProduct = (
  initialFilters?: Partial<IProductFilter>,
  {
    searchCurrentPage = 1,
    searchPageSize = 10,
    isSearching = false,
    setIsSearching = () => {},
    priceRange = { min: 0, max: 0 },
  }: UseFilterProductProps = {}
) => {
  const defaultFilters: IProductFilter = {
    name: "",
    priceRange: priceRange,
    quantity: 0,
    unit: "",
    category: {
      id: "",
    },
    supplier: {
      id: "",
    },
  };

  const [filters, setFilters] = useState<IProductFilter>({
    ...defaultFilters,
    ...initialFilters,
  });


  const [debouncedFilters] = useDebounce(filters, 500);

  const { data: searchData, error: searchError } = useQuery({
    queryKey: ["searchProducts", debouncedFilters],
    queryFn: () =>
      apiSearchProduct(`page=${searchCurrentPage}&size=${searchPageSize}`, {
        name: debouncedFilters.name,
        quantity: debouncedFilters.quantity,
        unit: debouncedFilters.unit,
        price: debouncedFilters.price,
        ...(debouncedFilters.category?.id
          ? { category: { id: debouncedFilters.category.id } }
          : {}),
        ...(debouncedFilters.supplier?.id
          ? { supplier: { id: debouncedFilters.supplier.id } }
          : {}),
        ...(debouncedFilters.priceRange?.min
          ? {
              priceRange: {
                min: debouncedFilters.priceRange.min,
                max: priceRange.max,
              },
            }
          : {}),
      }),
    enabled: Object.values(debouncedFilters).some(
      (value) => value !== 0 || value !== "" || value !== null
    ),
  });

  const updateFilter = (key: keyof IProductFilter, value: string | number) => {
    let newValue: Partial<IProductFilter> = {};
    if (key === "category") {
      newValue = { category: { id: value as string } };
    } else if (key === "supplier") {
      newValue = { supplier: { id: value as string } };
    } else if (key === "priceRange") {
      newValue = { priceRange: { min: value as number, max: filters.priceRange?.max || 0 } };
    } else {
      newValue = { [key]: value };
    }
    setFilters((prev) => ({ ...prev, ...newValue }));
    setIsSearching(!!value);
  };

  // reset initialState
  const resetFilters = useCallback(() => {
    setFilters({
      ...defaultFilters,
      ...initialFilters,
    });
    setIsSearching(false);
  }, [initialFilters]);

  return {
    filters,
    resetFilters,
    updateFilter,
    searchData,
    searchError,
    isSearching,
  };
};
