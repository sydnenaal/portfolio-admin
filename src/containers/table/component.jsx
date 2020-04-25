import React, { useContext } from "react";
import { Table } from "semantic-ui-react";

import ThemeContext from "../../contexts/theme";

import TablePagination from "./components/pagination";

const TableComponent = ({
  headerCells,
  data,
  compact,
  showPagination,
  ...props
}) => {
  const theme = useContext(ThemeContext);

  return (
    <>
      <Table
        compact={compact ? "very" : null}
        inverted={theme === "dark"}
        sortable
        celled
        fixed>
        <Table.Header>
          <Table.Row>
            {headerCells.map((item, index) => (
              <Table.HeaderCell
                onClick={item.handleSort.bind(item)}
                sorted={item.isSorted()}
                key={index}>
                {item.title}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((item, index) => (
            <Table.Row key={index}>
              {headerCells.map((headerItem, index) => (
                <Table.Cell key={index}>{item[headerItem.accessor]}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>

        {showPagination && (
          <TablePagination headerCells={headerCells} {...props} />
        )}
      </Table>
    </>
  );
};

export default React.memo(TableComponent);
