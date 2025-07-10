import type { PaginationTypes } from "../types/types";
import './Pagination.css';

const Pagination = ({ 
  totalDevices, 
  devicesPerPage, 
  currentPage, 
  paginate 
}: PaginationTypes) => {
  const pageNumbers = Math.ceil(totalDevices / devicesPerPage);

  // pages less than 1 will not get rendered.
  if (pageNumbers <= 1) return null;

  return (
    <div className="pagination-container">
      <div className="pagination">
        <button
          onClick={() => paginate(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          &laquo;
        </button>

        {/* page numbers */}
        {Array.from({ length: pageNumbers }).map((_, i) => {
          const pageNumber = i + 1;
          if (pageNumbers > 10 && 
              Math.abs(pageNumber - currentPage) > 2 &&
              pageNumber !== 1 && 
              pageNumber !== pageNumbers) {
            return pageNumber === 2 || pageNumber === pageNumbers - 1 ? 
              <span key={i} className="ellipsis">...</span> : null;
          }
          
          return (
            <button
              key={i}
              onClick={() => paginate(pageNumber)}
              className={currentPage === pageNumber ? 'active' : ''}
              aria-current={currentPage === pageNumber ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() => paginate(Math.min(pageNumbers, currentPage + 1))}
          disabled={currentPage === pageNumbers}
          aria-label="Next page"
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default Pagination;