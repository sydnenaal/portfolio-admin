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

  const [column, setColumn] = useState();
  const [data, setData] = useState(tableData);
  const [direction, setDirection] = useState();
  const [pageSize, changePageSize] = useState(5);
  const [page, changePage] = useState(1);

  const handleChangePageSize = (e, data) => changePageSize(data.value);

  const headerProto = {
    handleSort: function () {
      if (column !== this.name) {
        setColumn(this.name);
        setData(sortBy(data, [this.name]));
        setDirection("ascending");

        return;
      }

      setData(data.reverse());
      setDirection(direction === "ascending" ? "descending" : "ascending");
    },
    isSorted: function () {
      return column === this.name ? direction : null;
    },
  };

  const headerCells = headerNames(columnNames).map((item) => {
    const cell = Object.create(headerProto);
    cell.accessor = item.accessor;
    cell.title = item.title;

    return cell;
  });

  const displayedData = data.slice((page - 1) * pageSize, page * pageSize);

  const { length } = data;

  let pageCount = Math.ceil(length / pageSize);

  length % pageSize !== 0 && pageCount++;

  return (
    <TableComponent
      headerCells={headerCells}
      pageSize={pageSize}
      data={displayedData}
      changePage={changePage}
      page={page}
      pageCount={pageCount}
      handleChangePageSize={handleChangePageSize}
      {...props}
    />
  );
};

export default TableContainer;
