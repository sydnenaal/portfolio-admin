import React from "react";
import { connect } from "react-redux";
import { Button, Input } from "semantic-ui-react";
import { useIntl } from "react-intl";

import "./style.sass";

import PageWithHeader from "../../containers/pageWithHeader";
import { Tab, Content } from "./components/tab";

import Tabs from "../../containers/tabs";

const MailPageComponent = ({
  handleCheck,
  handleCheckAll,
  activeTab,
  checked,
  tabs,
  tabsNames,
}) => {
  const {
    messages: { titles, mail },
  } = useIntl();

  const handlers = {
    checkAll: () => handleCheckAll({ setCheck: true }),
    unCheckAll: () => handleCheckAll({ setCheck: false }),
  };

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

        <Tabs tabs={renderTabs}>
          <Content content={tabs[activeTab]} handleCheck={handleCheck} />
        </Tabs>
      </div>
    </PageWithHeader>
  );
};

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
  tabs: state.messages.tabSortedMessages,
  activeTab: state.messages.activeTab,
});

export default connect(mapStateToProps, null)(React.memo(MailPageComponent));
