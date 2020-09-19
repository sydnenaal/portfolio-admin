import React from "react";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { Button } from "semantic-ui-react";

import PageWithHeader from "containers/pageWithHeader";
import WithLoader from "containers/withLoader";
import { dateParse } from "utils";
import Card from "containers/card";

import { selectActiveMessage } from "selectors";

import "./style.sass";

function MessageCheckPageComponent({
  handleClickBack,
  handleDelete,
  handleSetPriority,
}) {
  const {
    messages: {
      titles,
      mail: { buttons },
    },
  } = useIntl();

  const activeMessage = useSelector(selectActiveMessage);

  return (
    <PageWithHeader title={titles.mail} subtitle={"read"}>
      <div className="messagePage">
        <div className="messagePage-buttons">
          <Button onClick={handleClickBack}>{buttons.goBack}</Button>
          <Button onClick={handleDelete}>{buttons.removeToTrash}</Button>
          <Button onClick={handleSetPriority}>
            {buttons.checkAsImportant}
          </Button>
        </div>

        <Card>
          <div className="messagePage-body">
            <WithLoader title="getMessage">
              <div>
                <div className="messagePage-Body__date">
                  <span>Дата: </span>
                  {activeMessage && dateParse(activeMessage.date)}
                </div>
                <div className="messagePage-Body__from">
                  <span>От кого: </span>
                  {activeMessage && activeMessage.client}
                </div>
                <div className="messagePage-Body__email">
                  <span>Почта: </span>
                  {activeMessage && activeMessage.email}
                </div>
                <div className="messagePage-Body__text">
                  <span>Сообщение: </span>
                  {activeMessage && activeMessage.text}
                </div>
              </div>
            </WithLoader>
          </div>
        </Card>
      </div>
    </PageWithHeader>
  );
}

export default MessageCheckPageComponent;
