import React from "react";
import { useIntl } from "react-intl";

import { Button } from "semantic-ui-react";

import PageWithHeader from "../../containers/pageWithHeader";
import Card from "../../containers/card";

import "./style.sass";

const MessageCheckPageComponent = ({ handleClickBack }) => {
  const {
    messages: { titles },
  } = useIntl();

  return (
    <PageWithHeader title={titles.mail} subtitle={"read"}>
      <div className="messagePage">
        <div className="messagePage-buttons">
          <Button onClick={handleClickBack}>Назад</Button>

          <Button>В корзину</Button>

          <Button>Отметить как важное</Button>
        </div>

        <Card>
          <div className="messagePage-body">
            <div className="messagePage-Body__date">
              <span>Дата: </span> {"date"}
            </div>
            <div className="messagePage-Body__from">
              <span>От кого: </span>
              {"Derohin"}
            </div>
            <div className="messagePage-Body__theme">
              <span>Тема: </span>
              {"theme"}
            </div>
            <div className="messagePage-Body__text">
              <span>Сообщение: </span>
              {"theme"}
            </div>
          </div>
        </Card>
      </div>
    </PageWithHeader>
  );
};

export default MessageCheckPageComponent;
