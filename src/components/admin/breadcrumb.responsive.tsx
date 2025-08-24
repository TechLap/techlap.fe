import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from "react-router-dom";
import { routes } from "../../App";
const BreadcrumbResponsive = () => {
  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <div className="sticky top-0 inset-x-0 z-[5] bg-white border-y border-gray-200 px-4 sm:px-6 lg:px-8 lg:hidden">
      <div className="flex items-center py-2">
        {/* Navigation Toggle */}
        <button
          type="button"
          className="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-hidden focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="hs-application-sidebar"
          aria-label="Toggle navigation"
          data-hs-overlay="#hs-application-sidebar"
        >
          <span className="sr-only">Toggle Navigation</span>
          <svg
            className="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 3v18" />
            <path d="m8 9 3 3-3 3" />
          </svg>
        </button>
        {/* End Navigation Toggle */}

        {/* Breadcrumb */}
        <ol className="ms-3 flex items-center whitespace-nowrap">
          {breadcrumbs.map(({ breadcrumb, match }, index) => (
            <li
              key={match.pathname}
              className="flex items-center text-sm text-gray-800"
            >
              {index > 1 && (
                <svg
                  className="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
              {index === breadcrumbs.length - 1 ? (
                <span
                  className="font-semibold text-gray-800 truncate"
                  aria-current="page"
                >
                  {breadcrumb}
                </span>
              ) : (
                <Link
                  to={match.pathname}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {breadcrumb}
                </Link>
              )}
            </li>
          ))}
        </ol>
        {/* End Breadcrumb */}
      </div>
    </div>
  );
};

export default BreadcrumbResponsive;
