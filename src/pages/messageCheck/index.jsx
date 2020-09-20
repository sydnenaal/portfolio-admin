import React, { useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import { Button } from "semantic-ui-react";

import PageWithHeader from "containers/pageWithHeader";
import WithLoader from "containers/withLoader";
import { dateParse } from "utils";
import Card from "containers/card";
import { selectActiveMessage } from "selectors";
import { useRequest } from "hooks";
import { setActiveMessage } from "ducks";
import { getMessage, setPriorityMessages, setActualityMessages } from "api";

import "./style.sass";

function MessageCheckPageComponent() {
  const {
    messages: {
      titles,
      mail: { buttons },
    },
  } = useIntl();

  const activeMessage = useSelector(selectActiveMessage);
  const history = useHistory();
  const { message } = useParams();
  const dispatch = useDispatch();
  const queryWrapper = useRequest();

  const handleClickBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleDelete = useCallback(() => {
    const data = { messages: [message], action: true };

    dispatch(setActualityMessages({ data }));
    history.goBack();
  }, [history, dispatch, message]);

  const handleSetPriority = useCallback(() => {
    const data = { messages: [message], action: true };

    dispatch(setPriorityMessages({ data }));
    history.goBack();
  }, [history, dispatch, message]);

  useEffect(() => {
    const data = { _id: message };
    const params = { ...getMessage, body: { data }, title: "getMessage" };

    function handleSuccess(response) {
      const { data } = response;

      dispatch(setActiveMessage(data));
    }

    dispatch(queryWrapper(params, handleSuccess));
  }, [dispatch, message, queryWrapper]);

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
