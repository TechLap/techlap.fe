import { Filter } from "./icons";

interface SelectFilterProps {
    id: string;
    onFilterChange: (key: string, value: string) => void;
    defaultOption: string;
    data: any;
}


const SelectFilter = (props: SelectFilterProps) => {
    const { id, onFilterChange, defaultOption, data } = props;
    return (
        <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-left] [--strategy:absolute] relative inline-flex">
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
              className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mt-2 min-w-40 bg-white shadow-md rounded-lg p-2"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby={`hs-dropdown-filter-${id}`}
            >
              <div className="relative">
                <select
                  data-hs-select='{
              "placeholder": "Lọc theo tiêu chí",
              "optionAllowEmptyOption": true,
"toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
"toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-blue-500 rounded-lg text-start text-xs focus:outline-hidden",
"dropdownClasses": "mt-2 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto",
"optionClasses": "py-2 px-4 w-full text-xs text-gray-800 cursor-pointer hover:bg-blue-50 rounded-lg focus:outline-hidden focus:bg-blue-50",
"optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"hidden hs-selected:block\"></span></div>"
}'
                  onChange={(e) => {
                    onFilterChange(id, e.target.value);
                  }}
                >
                  <option value="">Tất cả {defaultOption}</option>
                  {data?.data?.data?.result?.map((item: any) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <div className="absolute top-1/2 end-2.5 -translate-y-1/2">
                  <svg
                    className="shrink-0 size-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m7 15 5 5 5-5"></path>
                    <path d="m7 9 5-5 5 5"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
    )
}

export default SelectFilter;