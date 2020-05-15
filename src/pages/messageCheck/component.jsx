import React from "react";
import { connect } from "react-redux";
import { useIntl } from "react-intl";
import { Button, Loader } from "semantic-ui-react";

import PageWithHeader from "../../containers/pageWithHeader";
import { dateParse } from "../../utils";
import Card from "../../containers/card";

import "./style.sass";

const MessageCheckPageComponent = ({
  handleClickBack,
  activeMessage = {},
  loading,
}) => {
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
            {loading ? (
              <Loader active inline="centered" />
            ) : (
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
            )}
          </div>
        </Card>
      </div>
    </PageWithHeader>
  );
};

const mapStateToProps = (state) => ({
  loading: state.appState.isLoading,
  activeMessage: state.messages.activeMessage,
});

export default connect(mapStateToProps, null)(MessageCheckPageComponent);
