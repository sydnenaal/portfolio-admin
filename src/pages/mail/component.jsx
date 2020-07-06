import React, { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { Button, Input } from "semantic-ui-react";
import { useIntl } from "react-intl";

import "./style.sass";
import { selectActiveTab, selectSortedMessages } from "selectors";

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

  const checkAll = useCallback(() => handleCheckAll({ setCheck: true }), [
    handleCheckAll,
  ]);
  const unCheckAll = useCallback(() => handleCheckAll({ setCheck: false }), [
    handleCheckAll,
  ]);

  const removeMessage = useMemo(
    () => (activeTab === "trash" ? "remove" : "removeToTrash"),
    [activeTab]
  );

  const renderTabs = tabsNames.map((item, index) => {
    const tab = tabs[item];
    const messagesCounter = tab ? tab.length.toString() : "0";

    return (
      <Tab
        key={index}
        locale={mail}
        messagesCounter={messagesCounter}
        title={item}
      />
    );
  });

  let buttonInfo = useMemo(() => {
    switch (activeTab) {
      case "trash":
        return {
          handler: handleReturnMessages,
          message: mail.buttons.undoDelete,
        };
      case "important":
        return {
          handler: handleSetUsualMessages,
          message: mail.buttons.checkAsUsual,
        };
      default:
        return {
          handler: handleSetImportantMessages,
          message: mail.buttons.checkAsImportant,
        };
    }
  }, [
    activeTab,
    mail,
    handleReturnMessages,
    handleSetUsualMessages,
    handleSetImportantMessages,
  ]);

  return (
    <PageWithHeader title={titles.mail}>
      <div className="mailBody">
        <div className="mailActions">
          <div className="buttons">
            <Button onClick={checkAll}>{mail.buttons.checkAll}</Button>

            <Button onClick={unCheckAll}>{mail.buttons.uncheckAll}</Button>

            <Button onClick={buttonInfo.handler} disabled={checked === 0}>
              {buttonInfo.message}
            </Button>

            <Button onClick={handleDeleteMessages} disabled={checked === 0}>
              {mail.buttons[removeMessage]}
            </Button>
          </div>

          <div className="search">
            <Input placeholder={mail.searchPlaceholder} icon="search" />
          </div>
        </div>

        <Tabs tabs={renderTabs}>
          <WithLoader title="getMessages">
            <Content handleCheck={handleCheck} />
          </WithLoader>
        </Tabs>
      </div>
    </PageWithHeader>
  );
};

export default memo(MailPageComponent);
