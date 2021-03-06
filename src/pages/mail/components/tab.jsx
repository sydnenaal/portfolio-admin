import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { themeStyle } from "constants/themingStyles";
import { setTab, setMessages, setTabSortedMessages } from "ducks";
import { sortMessages } from "utils";
import {
  selectTheme,
  selectActiveTab,
  selectSortedMessages,
  selectMessages,
} from "selectors";
import Card from "containers/card";
import Message from "./message";
import Pagination from "containers/pagination";

export function Content({ checked, filter }) {
  const dispatch = useDispatch();
  const tabs = useSelector(selectSortedMessages);
  const activeTab = useSelector(selectActiveTab);
  const content = tabs[activeTab];
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState();
  const [displayedMessages, setDisplayedMessages] = useState([]);

  useEffect(() => {
    if (content) {
      const startIndex = (page - 1) * pageSize;
      const finishIndex = page * pageSize;
      const slicedContent = content
        .filter(({ client }) => client.indexOf(filter) !== -1)
        .slice(startIndex, finishIndex);

      setDisplayedMessages(slicedContent);
      setPageCount(Math.ceil(content.length / pageSize));
    }
  }, [content, page, pageSize, filter]);

  function handleChangePageSize(_, { value }) {
    setPageSize(value);
    setPage(1);
  }

  return (
    <Card>
      <>
        <div className="messagesInnerArea">
          {displayedMessages.length > 0 ? (
            displayedMessages.map((item, index) => (
              <Message
                {...item}
                dispatch={dispatch}
                isChecked={checked.includes(item._id)}
                checked={checked}
                index={index}
                key={item._id}
              />
            ))
          ) : (
            <div className="emptyMessage">Empty</div>
          )}
        </div>
        <div className="messagesPagination">
          <Pagination
            handleChangePageSize={handleChangePageSize}
            handleChangePage={setPage}
            pageSize={pageSize}
            page={page}
            pageCount={pageCount}
          />
        </div>
      </>
    </Card>
  );
}

export function Tab({ title, messagesCounter, locale }) {
  const activeTab = useSelector(selectActiveTab);
  const theme = useSelector(selectTheme);
  const messages = useSelector(selectMessages);
  const dispatch = useDispatch();
  const tabStyle = useMemo(() => {
    const activeColor = theme === "dark" ? "white" : "grey";
    const borderColor = activeTab === title ? activeColor : "transparent";

    return { borderBottom: `2px solid ${borderColor}` };
  }, [theme, activeTab, title]);

  function handleClick() {
    const newMessages = messages.map((item) => ({ ...item, isChecked: false }));
    const sorted = sortMessages(newMessages);

    dispatch(setMessages(newMessages));
    dispatch(setTabSortedMessages(sorted));
    dispatch(setTab(title));
  }

  return (
    <div style={tabStyle} className="tab" key={title} onClick={handleClick}>
      <span style={themeStyle[theme]}>{locale.tabs[title]}</span>
      {messagesCounter && (
        <div className="tabMessagesCounter">{messagesCounter}</div>
      )}
    </div>
  );
}
