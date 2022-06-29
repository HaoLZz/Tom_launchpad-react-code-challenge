import React from 'react';
import Pagination from '@mui/material/Pagination';

export default function UniversitiesPagination({
  currentPage = 1,
  totalPages = 2,
  setCurrentPage,
}) {
  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      shape="rounded"
      onChange={(_, page) => {
        setCurrentPage(page);
      }}
    />
  );
}
