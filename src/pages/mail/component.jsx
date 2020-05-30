import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Button, Input } from "semantic-ui-react";
import { useIntl } from "react-intl";

import "./style.sass";
import { selectActiveTab, selectSortedMessages } from "redux/selectors";

import PageWithHeader from "containers/pageWithHeader";
import { Tab, Content } from "./components/tab";
import Tabs from "containers/tabs";

const MailPageComponent = ({
  handleCheck,
  handleCheckAll,
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

  return (
    <PageWithHeader title={titles.mail}>
      <div className="mailBody">
        <div className="mailActions">
          <div className="buttons">
            <Button onClick={checkAll}>{mail.buttons.checkAll}</Button>

            <Button onClick={unCheckAll}>{mail.buttons.uncheckAll}</Button>

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

        <Tabs tabs={renderTabs}>
          <Content content={tabs[activeTab]} handleCheck={handleCheck} />
        </Tabs>
      </div>
    </PageWithHeader>
  );
};

export default memo(MailPageComponent);
