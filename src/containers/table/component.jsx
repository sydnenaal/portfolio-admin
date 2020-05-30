import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Table } from "semantic-ui-react";

import TablePagination from "../pagination/component";

const inlineStyle = { overflow: "visible" };

const TableComponent = ({
  headerCells,
  data,
  compact,
  handlers,
  showPagination,
  ...props
}) => {
  const theme = useSelector((state) => state.theme.theme);

  const colSpan = headerCells.length;

  const tableParams = {
    compact: compact ? "very" : null,
    inverted: theme === "dark",
  };

  const header = headerCells.map((item, index) => {
    const handleSort = handlers.handleSort.bind(item);
    const isSorted = handlers.isSorted.bind(item)();

    return (
      <Table.HeaderCell onClick={handleSort} sorted={isSorted} key={index}>
        {item.title}
      </Table.HeaderCell>
    );
  });

  const tableData = data.map((item, index) => {
    const cells = headerCells.map((headerItem, index) => (
      <Table.Cell key={index}>{item[headerItem.accessor]}</Table.Cell>
    ));

    return <Table.Row key={index}>{cells}</Table.Row>;
  });

  return (
    <>
      <Table
        compact={tableParams.compact}
        inverted={tableParams.inverted}
        sortable
        selectable
        celled
        fixed
      >
        <Table.Header>
          <Table.Row>{header}</Table.Row>
        </Table.Header>

        <Table.Body>{tableData}</Table.Body>

        {showPagination && (
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell style={inlineStyle} colSpan={colSpan}>
                <TablePagination
                  headerCells={headerCells}
                  handlers={handlers}
                  {...props}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        )}
      </Table>
    </>
  );
};

export default memo(TableComponent);
