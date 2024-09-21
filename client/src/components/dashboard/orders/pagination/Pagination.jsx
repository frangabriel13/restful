import React from 'react';
import s from './Pagination.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    if (currentPage !== 1) {
      onPageChange(1);
    }
  };

  const handleLastPage = () => {
    if (currentPage !== totalPages) {
      onPageChange(totalPages);
    }
  };

  return (
    <div className={s.pagination}>
      <button onClick={handleFirstPage} disabled={currentPage === 1}>
        {'<<'}
      </button>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        {'<'}
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        {'>'}
      </button>
      <button onClick={handleLastPage} disabled={currentPage === totalPages}>
        {'>>'}
      </button>
    </div>
  );
};

export default Pagination;