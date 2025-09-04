import Filter from "./icons/filter";

interface IProps {
    filters: any;
    onFilterChange: (key: string, value: string) => void;
    id: string;
    placeholder: string;
}

const ButtonFilter = (props: IProps) => {
    const { filters, onFilterChange, id, placeholder } = props;
    return (
        <div className="hs-dropdown [--placement:top] [--auto-close:inside] relative inline-flex">
            <button
              id={`hs-dropdown-filter-${id}`}
              type="button"
              className="hs-dropdown-toggle inline-flex items-center gap-x-2 text-gray-400 shadow-2xs focus:text-gray-400 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown"
            >
              <Filter
                size={12}
                className="text-gray-400 hover:text-gray-800 hover:bg-gray-50 focus:bg-gray-50 rounded-lg"
              />
            </button>

            <div
              className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 mt-2 min-w-60 bg-white shadow-md rounded-lg p-2"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby={`hs-dropdown-filter-${id}`}
            >
              <input
                className="peer py-2.5 sm:py-1 pe-0 ps-2 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 sm:text-xs focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                placeholder={`Lọc theo ${placeholder}`}
                value={filters[id]}
                onChange={(e) => onFilterChange(id, e.target.value)}
              />
            </div>
          </div>
    )
}

export default ButtonFilter;