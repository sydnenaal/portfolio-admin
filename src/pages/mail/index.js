import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { NotificationManager } from "react-notifications";
import MainPageComponent from "./component";

import { getMessages } from "../../ducks";

import { setAppState } from "../../redux/actions";

const tabFilter = {
  all: (item) => !item.isDeleted,
  read: (item) => item.isRead && !item.isDeleted,
  unread: (item) => !item.isRead && !item.isDeleted,
  important: (item) => item.isImportant && !item.isDeleted,
  trash: (item) => item.isDeleted,
};

const helpUserNotify = () => {
  const isShow = localStorage.getItem("mailNotify");

  if (!isShow) {
    localStorage.setItem("mailNotify", "showed");
    NotificationManager.info(
      "Воспользуйтесь меню быстрого доступа, кликнув по сообщению правой кнопкой мыши",
      "Подсказка",
      25000
    );
  }
};

const tabsNames = ["all", "unread", "read", "important", "trash"];

const MailPageContainer = ({ setAppState, activeTab }) => {
  const [checked, setChecked] = useState(0);
  const [messages, setMessages] = useState([]);
  const [tabs, setTabs] = useState([]);

  const countChecked = (array) => {
    setChecked(
      array.reduce((accum, item) =>
        typeof accum === "object"
          ? accum.isChecked + item.isChecked
          : accum + item.isChecked
      )
    );
  };

  const handleCheck = (id) => {
    const checkedMessages = messages.map((item) => ({
      ...item,
      isChecked: item.id === id ? !item.isChecked : item.isChecked,
    }));

    setMessages(checkedMessages);
    countChecked(checkedMessages);
  };

  const handleCheckAll = ({ setCheck }) => {
    const checkedMessages = messages.map((item) => ({
      ...item,
      isChecked: tabFilter[activeTab](item) ? setCheck : item.isChecked,
    }));

    setMessages(checkedMessages);
    countChecked(checkedMessages);
  };

  const fetchMessages = async (source) => {
    setAppState(true);
    const response = await getMessages({
      cancelToken: source.token,
    });

    if (response) {
      const responseWithChecked = response.map((item) => ({
        ...item,
        isChecked: false,
      }));

      const tabs = {};
      tabsNames.forEach((item) => {
        tabs[item] = responseWithChecked.filter(tabFilter[item]);
      });

      setMessages(responseWithChecked);
      helpUserNotify();
      setTabs(tabs);
    }
    setAppState(false);
  };

  useEffect(() => {
    let source = axios.CancelToken.source();

    fetchMessages(source);

    return () => {
      source.cancel();
    };
  }, []);

  return (
    <MainPageComponent
      tabs={tabs}
      tabsNames={tabsNames}
      messages={messages}
      handleCheckAll={handleCheckAll}
      handleCheck={handleCheck}
      checked={checked}
    />
  );
};

const mapStateToProps = (state) => ({
  activeTab: state.messages.activeTab,
});

const mapDispatchToProps = { setAppState: setAppState };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(MailPageContainer));
