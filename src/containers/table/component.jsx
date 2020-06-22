import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Table, Checkbox } from "semantic-ui-react";

import TablePagination from "containers/pagination";

const inlineStyle = { overflow: "visible" };

const TableComponent = ({
  headerCells,
  data,
  compact,
  handlers,
  showPagination,
  handleCheck,
  handleCheckAll,
  ...props
}) => {
  const theme = useSelector((state) => state.theme.theme);

  const colSpan = headerCells.length + 1;
  const isAllChecked =
    data.reduce((acc, item) => acc + Number(item.isChecked), 0) === data.length;
  const tableParams = {
    compact: compact ? "very" : null,
    inverted: theme === "dark",
  };

  let header = [
    <Table.HeaderCell key={0}>
      <Checkbox
        checked={isAllChecked}
        onChange={() => handleCheckAll(!isAllChecked)}
      />
    </Table.HeaderCell>,
    ...headerCells.map((item, index) => {
      const handleSort = handlers.handleSort.bind(item);
      const isSorted = handlers.isSorted.bind(item)();

      return (
        <Table.HeaderCell
          onClick={handleSort}
          sorted={isSorted}
          key={index + 1}
        >
          {item.title}
        </Table.HeaderCell>
      );
    }),
  ];

  const tableData = data.map((item, index) => {
    let cells = [
      <Table.Cell collapsing key={0}>
        <Checkbox
          checked={item.isChecked}
          onChange={() => handleCheck(item._id)}
        />
      </Table.Cell>,
      ...headerCells.map((headerItem, index) => (
        <Table.Cell key={index + 1}>{item[headerItem.accessor]}</Table.Cell>
      )),
    ];

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
      >
        <Table.Header>
          <Table.Row>{header}</Table.Row>
        </Table.Header>

        <Table.Body>{tableData}</Table.Body>

        {showPagination && (
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell style={inlineStyle} colSpan={colSpan}>
                <TablePagination handlers={handlers} {...props} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        )}
      </Table>
    </>
  );
};

export default memo(TableComponent);
