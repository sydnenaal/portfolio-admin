import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Button, Input } from "semantic-ui-react";
import { useIntl } from "react-intl";

import "./style.sass";
import { selectActiveTab, selectSortedMessages } from "redux/selectors";

import PageWithHeader from "containers/pageWithHeader";
import { Tab, Content } from "./components/tab";
import Tabs from "containers/tabs";
import WithLoader from "containers/withLoader";

const MailPageComponent = ({
  handleCheck,
  handleCheckAll,
  handleDeleteMessages,
  handleSetImportantMessages,
  handleSetUsualMessages,
  handleReturnMessages,
  checked,
  tabsNames,
}) => {
  const {
    messages: { titles, mail },
  } = useIntl();

  const tabs = useSelector(selectSortedMessages);
  const activeTab = useSelector(selectActiveTab);

  const checkAll = () => handleCheckAll({ setCheck: true });
  const unCheckAll = () => handleCheckAll({ setCheck: false });

  const renderTabs = tabsNames.map((item, index) => (
    <Tab
      key={index}
      locale={mail}
      messagesCounter={tabs[item] ? tabs[item].length.toString() : "0"}
      title={item}
    />
  ));
  const switchButtons = () => {
    switch (activeTab) {
      case "trash":
        return (
          <Button onClick={handleReturnMessages} disabled={checked === 0}>
            {mail.buttons.undoDelete}
          </Button>
        );
      case "important":
        return (
          <Button onClick={handleSetUsualMessages} disabled={checked === 0}>
            {mail.buttons.checkAsNotImportant}
          </Button>
        );
      default:
        return (
          <Button onClick={handleSetImportantMessages} disabled={checked === 0}>
            {mail.buttons.checkAsImportant}
          </Button>
        );
    }
  };

  return (
    <PageWithHeader title={titles.mail}>
      <div className="mailBody">
        <div className="mailActions">
          <div className="buttons">
            <Button onClick={checkAll}>{mail.buttons.checkAll}</Button>

            <Button onClick={unCheckAll}>{mail.buttons.uncheckAll}</Button>

            {switchButtons()}

            <Button onClick={handleDeleteMessages} disabled={checked === 0}>
              {mail.buttons[activeTab === "trash" ? "remove" : "removeToTrash"]}
            </Button>
          </div>

          <div className="search">
            <Input placeholder={mail.searchPlaceholder} icon="search" />
          </div>
        </div>

        <Tabs tabs={renderTabs}>
          <WithLoader>
            <Content handleCheck={handleCheck} />
          </WithLoader>
        </Tabs>
      </div>
    </PageWithHeader>
  );
};

export default memo(MailPageComponent);
