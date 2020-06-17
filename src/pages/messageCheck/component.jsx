import React from "react";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { Button } from "semantic-ui-react";

import PageWithHeader from "containers/pageWithHeader";
import WithLoader from "containers/withLoader";
import { dateParse } from "utils";
import Card from "containers/card";

import { selectActiveMessage } from "redux/selectors";

import "./style.sass";

const MessageCheckPageComponent = ({
  handleClickBack,
  handleDelete,
  handleSetPriority,
}) => {
  const {
    messages: { titles },
  } = useIntl();

  const activeMessage = useSelector(selectActiveMessage);

  return (
    <PageWithHeader title={titles.mail} subtitle={"read"}>
      <div className="messagePage">
        <div className="messagePage-buttons">
          <Button onClick={handleClickBack}>Назад</Button>
          <Button onClick={handleDelete}>В корзину</Button>
          <Button onClick={handleSetPriority}>Отметить как важное</Button>
        </div>

        <Card>
          <div className="messagePage-body">
            <WithLoader>
              <div>
                <div className="messagePage-Body__date">
                  <span>Дата: </span>
                  {activeMessage && dateParse(activeMessage.date)}
                </div>
                <div className="messagePage-Body__from">
                  <span>От кого: </span>
                  {activeMessage && activeMessage.client}
                </div>
                <div className="messagePage-Body__theme">
                  <span>Тема: </span>
                  {activeMessage && activeMessage.title}
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
};

export default MessageCheckPageComponent;
