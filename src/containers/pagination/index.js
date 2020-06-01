import React from "react";

import Component from "./component";

const PaginationContainer = ({ handlers, page, pageCount, ...props }) => {
  const $handlers = {
    ...handlers,
    handleChevronLeft: () => page > 1 && handlers.handleChangePage(page - 1),
    handleChevronRight: () =>
      page < pageCount && handlers.handleChangePage(page + 1),
  };
  return (
    <Component
      handlers={$handlers}
      page={page}
      pageCount={pageCount}
      {...props}
    />
  );
};

export default PaginationContainer;
