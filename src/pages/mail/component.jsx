import React, { useContext } from "react";
import { Button, Input, Tab } from "semantic-ui-react";
import { useIntl } from "react-intl";

import "./style.sass";

import PageWithHeader from "../../containers/pageWithHeader";
import ThemeContext from "../../contexts/theme";
import ThemeStyle from "../../constants/themingStyles";

import Message from "./components/message";
import Pane from "./components/pane";

const panesNames = ["all", "unread", "read", "important", "trash"];

const MailPageComponent = ({
  messages,
  loading,
  handleCheck,
  handleCheckAll,
  activeTab,
  setActiveTab,
  tabFilter,
  checked,
  ...props
}) => {
  const theme = useContext(ThemeContext);

  const {
    messages: { titles, mail },
  } = useIntl();

  const getPane = (title, array) =>
    Pane({
      loading: loading,
      locale: mail,
      setActiveTab: setActiveTab,
      title: title,
      messagesCounter: array && array.length.toString(),
      style: ThemeStyle[theme],
      content:
        array &&
        array.map((item, index) => (
          <Message
            {...item}
            handleCheck={handleCheck}
            index={index}
            key={index}
          />
        )),
    });

  const handlers = {
    checkAll: () => handleCheckAll({ setCheck: true }),
    unCheckAll: () => handleCheckAll({ setCheck: false }),
  };

  const panes = panesNames.map((item) =>
    getPane(item, messages.filter(tabFilter[item]))
  );

  return (
    <PageWithHeader title={titles.mail} {...props}>
      <div className="mailBody">
        <div className="mailActions">
          <div className="buttons">
            <Button onClick={handlers.checkAll}>{mail.buttons.checkAll}</Button>

            <Button onClick={handlers.unCheckAll}>
              {mail.buttons.uncheckAll}
            </Button>

            <Button disabled={checked === 0}>
              {mail.buttons.checkAsImportant}
            </Button>

            <Button disabled={checked === 0}>
              {mail.buttons[activeTab === "trash" ? "remove" : "removeToTrash"]}
            </Button>
          </div>

          <div className="search">
            <Input placeholder={mail.searchPlaceholder} icon="search" />
          </div>
        </div>

        <Tab
          style={{ width: "100%" }}
          menu={{
            secondary: true,
            pointing: true,
          }}
          panes={panes}
        />
      </div>
    </PageWithHeader>
  );
};

export default MailPageComponent;
