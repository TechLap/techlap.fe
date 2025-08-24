
interface RolePermissionAccordionProps {
  title: string;
  content?: {
    route: string;
    method: string;
    id?: string;
  }[];
  isAccordionOpen: {
    [key: string]: boolean;
  };
  handleClickAccordion: (module: string) => void;
  handleCheckedPermission: (permissionId: string) => void;
  handleToggleAllPermissionInModule: (module: string) => void;
  checkedPermission: {
    id: string;
  }[];
}

const RolePermissionAccordion = ({
  title,
  content,
  isAccordionOpen,
  handleClickAccordion,
  handleCheckedPermission,
  checkedPermission,
  handleToggleAllPermissionInModule,
}: RolePermissionAccordionProps) => {

  const methodColor = (method: string) => {
    if (method === "GET") return "text-green-600";
    if (method === "POST") return "text-yellow-600";
    if (method === "DELETE") return "text-red-600";
    return "text-black-600";
  };

  const isAllChecked = content?.every((item) => checkedPermission.some((permission) => permission.id === item.id));

  return (
    <div className="hs-accordion-group [--stop-propagation:true]">
      <div className="hs-accordion bg-white border border-gray-200 -mt-px first:rounded-t-lg last:rounded-b-lg">
        <button
          className={`hs-accordion-toggle text-sm ${
            isAccordionOpen[title]
              ? "text-blue-600"
              : "text-gray-800 hover:text-gray-500"
          } inline-flex items-center gap-x-3 w-full font-medium text-start py-4 px-5 disabled:opacity-50 disabled:pointer-events-none`}
          type="button"
          onClick={() => handleClickAccordion(title)}
        >
          <svg
            className={`${
              isAccordionOpen[title] ? "hidden" : "block"
            } size-3.5`}
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
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
          <svg
            className={`${
              isAccordionOpen[title] ? "block" : "hidden"
            } size-3.5`}
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
            <path d="M5 12h14"></path>
          </svg>
          {title}
          <div className="flex items-center gap-x-3 ml-auto">
            <label
              htmlFor={`hs-basic-with-description-${title}`}
              className="relative inline-block w-11 h-6 cursor-pointer"
            >
              <input
                type="checkbox"
                id={`hs-basic-with-description-${title}`}
                className="peer sr-only"
                onChange={() => handleToggleAllPermissionInModule(title)}
                checked={isAllChecked}
              />
              <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-blue-600 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
              <span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full"></span>
            </label>
          </div>
        </button>
        <div
          className={`hs-accordion-content ${
            isAccordionOpen[title] ? "block" : "hidden"
          } overflow-hidden transition-[height] duration-300`}
        >
          <div className="pb-4 px-5 grid grid-cols-2 gap-x-4 gap-y-2">
            {content?.map((item) => (
              <div className="flex items-center gap-x-2" key={item.id}>
                <input
                  type="checkbox"
                  className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  id={`hs-default-checkbox-${item.id}`}
                  onChange={() => handleCheckedPermission(item.id ?? "")}
                  checked={
                    checkedPermission.some((permission) => permission.id === item.id)
                  }
                />
                <label
                  htmlFor={`hs-default-checkbox-${item.id}`}
                  className={`text-gray-800 text-xs ${methodColor(
                    item.method
                  )}`}
                >
                  {item.route} - {item.method}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolePermissionAccordion;
