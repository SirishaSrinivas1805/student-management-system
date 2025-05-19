function Pagination({ totalPages, currentPage, fun }) {
  const maxVisiblePages = 5;

  // Group start/end
  const startPage = Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Navigation handlers
  const goToPrevGroup = () => {
    if (startPage > 1) {
      fun(startPage - 1);
    }
  };

  const goToNextGroup = () => {
    if (endPage < totalPages) {
      fun(endPage + 1);
    }
  };


  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">

        {/* << Group Previous */}
        <li className={`page-item ${startPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={goToPrevGroup} disabled={startPage === 1}>
            &laquo;
          </button>
        </li>

        {/* Page Numbers */}
        {pages.map((page) => (
          <li key={page} className={`page-item ${page === currentPage ? "active" : ""}`}>
            <button className="page-link" onClick={() => fun(page)}>
              {page}
            </button>
          </li>
        ))}

        {/* >> Group Next */}
        <li className={`page-item ${endPage === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={goToNextGroup} disabled={endPage === totalPages}>
            &raquo;
          </button>
        </li>

      </ul>
    </nav>
  );
}

export default Pagination;
