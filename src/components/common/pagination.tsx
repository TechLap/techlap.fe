interface IPaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  total: number;
}

const Pagination = (props: IPaginationProps) => {
  const { currentPage, setCurrentPage, total } = props;

  return (
    <>
      {/* Pagination */}
      <nav className="flex items-center gap-x-1" aria-label="Pagination">
        <button
          type="button"
          className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-xs rounded-lg text-black-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Previous"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <svg
            className="shrink-0 size-3.5"
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
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </button>
        <div className="flex items-center gap-x-1">
          <span className="min-h-9.5 min-w-9.5 flex justify-center items-center border border-gray-200 text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
            {currentPage}
          </span>
          <span className="min-h-9.5 flex justify-center items-center text-gray-500 py-2 px-1.5 text-sm">
            of
          </span>
          <span className="min-h-9.5 flex justify-center items-center text-gray-500 py-2 px-1.5 text-sm">
            {total}
          </span>
        </div>
        <button
          type="button"
          className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-xs rounded-lg text-black-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Next"
          disabled={currentPage === total}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <svg
            className="shrink-0 size-3.5"
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
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </button>
      </nav>
      {/* End Pagination */}
    </>
  );
};
export default Pagination;
