import { setMessages, setActiveMessage } from "ducks";
import { apiServices } from "api";
import { queryWrapper } from "utils";
import { sortMessages } from "utils/getTabSortedMessages";

export const setActualityMessages = ({ cancelToken, data, title }) =>
  queryWrapper({
    cancelToken: cancelToken,
    title: title,
    url: `${apiServices}/messages/actuality`,
    method: "post",
    body: data,
    successCallback: (dispatch, response) => {
      const responseWithChecked = response.data.map((item) => ({
        ...item,
        isChecked: false,
      }));

      dispatch(setMessages(responseWithChecked));
      sortMessages({ messages: responseWithChecked, dispatch: dispatch });
    },
  });

export const setPriorityMessages = ({ cancelToken, data, title }) =>
  queryWrapper({
    cancelToken: cancelToken,
    title: title,
    url: `${apiServices}/messages/priority`,
    method: "post",
    body: data,
    successCallback: (dispatch, response) => {
      const responseWithChecked = response.data.map((item) => ({
        ...item,
        isChecked: false,
      }));

      dispatch(setMessages(responseWithChecked));
      sortMessages({ messages: responseWithChecked, dispatch: dispatch });
    },
  });

export const getMessage = ({ cancelToken, data, title }) =>
  queryWrapper({
    cancelToken: cancelToken,
    title: title,
    url: `${apiServices}/messages/message`,
    method: "post",
    body: data,
    errorMessages: {
      500: { message: "Не удалось загрузить сообщение", type: "danger" },
    },
    successCallback: (dispatch, response) => {
      dispatch(setActiveMessage(response.data));
    },
  });

export const getMessages = ({ cancelToken, successCallbackFromUI, title }) =>
  queryWrapper({
    cancelToken: cancelToken,
    title: title,
    url: `${apiServices}/messages`,
    method: "get",
    errorMessages: {
      500: { message: "Не удалось загрузить сообщения", type: "danger" },
    },
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
