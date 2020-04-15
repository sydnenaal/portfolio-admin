import React from "react";
import { useIntl } from "react-intl";
import { Table, Dropdown, Menu, Icon } from "semantic-ui-react";

import { friendOptions } from "../../../constants/tableConstants";

const TablePagination = ({
  headerCells,
  handleChangePageSize,
  pageSize,
  changePage,
  pageCount,
  page,
}) => {
  const {
    messages: { table },
  } = useIntl();

  const handlers = {
    handleChevronLeft: () => page > 1 && changePage(page - 1),
    handleChevronRight: () => page < pageCount && changePage(page + 1),
  };

  const buttons = [];

  if (pageCount < 6) {
    for (let i = 1; i <= pageCount; i++) {
      buttons.push(i);
    }
  }

  if (pageCount >= 6) {
    if (page < 3) {
      for (let i = 1; i <= 3; i++) {
        buttons.push(i);
      }
    } else if (page > pageCount - 2) {
      for (let i = pageCount - 4; i <= pageCount; i++) {
        buttons.push(i);
      }
    } else {
      for (let i = page - 2; i <= page; i++) {
        buttons.push(i);
      }
    }
  }

  if (page < pageCount - 2) {
    buttons.push("...");
    buttons.push(pageCount);
  }

  return (
    <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell
          style={{ overflow: "visible" }}
          colSpan={headerCells.length}>
          <div className="tableFooter">
            <span>
              {table.rows}
              <Dropdown
                inline
                onChange={handleChangePageSize}
                options={friendOptions}
                value={pageSize}
              />
            </span>

            <Menu floated="right" pagination>
              <Menu.Item
                icon
                onClick={handlers.handleChevronLeft}
                cursor="pointer">
                <Icon name="chevron left" />
              </Menu.Item>

              {buttons.map((item, index) => {
                return item === "..." ? (
                  <Menu.Item key="index" disabled>
                    ...
                  </Menu.Item>
                ) : (
                  <Menu.Item
                    key={index}
                    active={page === item}
                    onClick={() => changePage(item)}>
                    {item}
                  </Menu.Item>
                );
              })}

              <Menu.Item
                icon
                onClick={handlers.handleChevronRight}
                cursor="pointer">
                <Icon name="chevron right" />
              </Menu.Item>
            </Menu>
          </div>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  );
};

export default TablePagination;
