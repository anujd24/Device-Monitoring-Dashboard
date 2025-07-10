import type { PaginationTypes } from "../types/types";

const Pagination = ({ totalDevices, devicesPerPage, currentPage, paginate }:PaginationTypes) => {
  const pageNumbers = Math.ceil(totalDevices / devicesPerPage);

  return (
    <div className="pagination">
      {Array.from({ length: pageNumbers }).map((_, i) => (
        <button
          key={i}
          onClick={() => paginate(i + 1)}
          className={currentPage === i + 1 ? 'active' : ''}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;