import { setMessages, setActiveMessage } from "redux/actions";
import { queryWrapper, serverPath } from "ducks";
import { sortMessages } from "utils/getTabSortedMessages";

export const setActualityMessages = ({ cancelToken, data }) =>
  queryWrapper({
    cancelToken: cancelToken,
    url: `${serverPath}/messages/actuality`,
    method: "post",
    body: data,
    errorMessage: "Не удалось завершить операцию",
    successCallback: (dispatch, response) => {
      const responseWithChecked = response.data.map((item) => ({
        ...item,
        isChecked: false,
      }));

      dispatch(setMessages(responseWithChecked));
      sortMessages({ messages: responseWithChecked, dispatch: dispatch });
    },
  });

export const setPriorityMessages = ({ cancelToken, data }) =>
  queryWrapper({
    cancelToken: cancelToken,
    url: `${serverPath}/messages/priority`,
    method: "post",
    body: data,
    errorMessage: "Не удалось завершить операцию",
    successCallback: (dispatch, response) => {
      const responseWithChecked = response.data.map((item) => ({
        ...item,
        isChecked: false,
      }));

      dispatch(setMessages(responseWithChecked));
      sortMessages({ messages: responseWithChecked, dispatch: dispatch });
    },
  });

export const getMessage = ({ cancelToken, data }) =>
  queryWrapper({
    cancelToken: cancelToken,
    url: `${serverPath}/messages/message`,
    method: "post",
    body: data,
    errorMessage: "Не удалось загрузить сообщение",
    successCallback: (dispatch, response) => {
      dispatch(setActiveMessage(response.data));
    },
  });

export const getMessages = ({ cancelToken, successCallbackFromUI }) =>
  queryWrapper({
    cancelToken: cancelToken,
    url: `${serverPath}/messages`,
    method: "get",
    errorMessage: "Не удалось загрузить сообщения",
    successCallback: (dispatch, response) => {
      const responseWithChecked = response.data.map((item) => ({
        ...item,
        isChecked: false,
      }));

      dispatch(setMessages(responseWithChecked));
      sortMessages({ messages: responseWithChecked, dispatch: dispatch });

      successCallbackFromUI(responseWithChecked);
    },
  });
