import React from "react";
import { useIntl } from "react-intl";
import { Dropdown, Menu, Icon } from "semantic-ui-react";

import { paginationOptions } from "constants/tableConstants";

const TablePagination = ({ pageSize, handlers, pageCount, page }) => {
  const {
    messages: { table },
  } = useIntl();
  console.log(handlers);

  const {
    handleChangePageSize,
    handleChangePage,
    handleChevronLeft,
    handleChevronRight,
  } = handlers;

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
      console.log("there");
      for (let i = pageCount - 4; i <= pageCount; i++) {
        buttons.push(i);
      }
    } else {
      for (let i = page - 1; i <= page + 1; i++) {
        buttons.push(i);
      }
    }
  }

  if (pageCount > 5 && page < pageCount - 2) {
    buttons.push("...");
    buttons.push(pageCount);
  }

  return (
    <div className="tableFooter">
      <span>
        {table.rows}
        <Dropdown
          inline
          onChange={handleChangePageSize}
          options={paginationOptions}
          value={pageSize}
        />
      </span>

      <Menu size="mini" floated="right" pagination>
        <Menu.Item icon onClick={handleChevronLeft} cursor="pointer">
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
              onClick={() => handleChangePage(item)}
            >
              {item}
            </Menu.Item>
          );
        })}

        <Menu.Item icon onClick={handleChevronRight} cursor="pointer">
          <Icon name="chevron right" />
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default TablePagination;
