import React, { useState } from "react";
import { useIntl } from "react-intl";
import { sortBy } from "lodash";

import TableComponent from "./component";

const TableContainer = ({ headerNames, tableData, ...props }) => {
  const {
    messages: {
      table: { columnNames },
    },
  } = useIntl();

  const [state, setState] = useState({
    column: null,
    direction: null,
    pageSize: 5,
    page: 1,
  });

  const { column, direction, pageSize, page } = state;

  let displayedData = tableData.slice((page - 1) * pageSize, page * pageSize);

  const { length } = tableData;

  let pageCount = Math.ceil(length / pageSize);

  length % pageSize !== 0 && pageCount++;

  const handlers = {
    handleChangePageSize: (e, { value }) =>
      setState({ ...state, pageSize: value }),
    handleChangePage: (value) => setState({ ...state, page: value }),
  };

  const headerProto = {
    handleSort: function () {
      if (column !== this.accessor) {
        displayedData = sortBy(tableData, [this.accessor]);
        setState({
          ...state,
          column: this.accessor,
          direction: "ascending",
        });

        return;
      }

      displayedData = tableData.reverse();
      setState({
        ...state,

        direction: direction === "ascending" ? "descending" : "ascending",
      });
    },
    isSorted: function () {
      return column === this.accessor ? direction : null;
    },
  };

  const headerCells = headerNames(columnNames).map((item) => {
    const cell = Object.create({ ...headerProto });
    cell.accessor = item.accessor;
    cell.title = item.title;

    return cell;
  });

  return (
    <TableComponent
      headerCells={headerCells}
      pageSize={pageSize}
      data={displayedData}
      changePage={handlers.handleChangePage}
      page={page}
      pageCount={pageCount}
      handleChangePageSize={handlers.handleChangePageSize}
      {...props}
    />
  );
};

export default TableContainer;
