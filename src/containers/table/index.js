import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { sortBy } from "lodash";

import TableComponent from "./component";

const reverseDirection = {
  ascending: "descending",
  descending: "ascending",
};

const TableContainer = ({ headerNames, tableData, ...props }) => {
  const {
    messages: {
      table: { columnNames },
    },
  } = useIntl();

  const [column, setColumn] = useState();
  const [direction, setDirection] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [displayData, setDisplayData] = useState(tableData);
  const [pageCount, setPageCount] = useState();

  useEffect(() => {
    setDisplayData(tableData.slice((page - 1) * pageSize, page * pageSize));
    setPageCount(Math.ceil(tableData.length / pageSize));
  }, [tableData, page, pageSize]);

  const handlers = {
    handleChangePageSize: (e, { value }) => {
      setPageSize(value);
      setPage(1);
    },
    handleChangePage: (value) => setPage(value),
    handleChevronLeft: () => page > 1 && setPage(page - 1),
    handleChevronRight: () => page < pageCount && setPage(page + 1),
    isSorted: function () {
      return column === this.accessor ? direction : null;
    },
    handleSort: function () {
      if (column !== this.accessor) {
        setDisplayData(sortBy(displayData, [this.accessor]));
        setColumn(this.accessor);
        setDirection("ascending");
      } else {
        setDisplayData(displayData.reverse());
        setDirection(reverseDirection[direction]);
      }
    },
  };

  const headerCells = headerNames(columnNames);

  return (
    <TableComponent
      headerCells={headerCells}
      pageSize={pageSize}
      data={displayData}
      handlers={handlers}
      pageCount={pageCount}
      page={page}
      {...props}
    />
  );
};

export default TableContainer;
