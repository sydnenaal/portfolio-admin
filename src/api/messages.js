import { apiServices } from "api";

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

export const getMessage = {
  url: `${apiServices}/messages/message`,
  method: "post",
  errorMessages: {
    500: { message: "Не удалось загрузить сообщение", type: "danger" },
  },
};

export const getMessages = {
  url: `${apiServices}/messages`,
  method: "get",
  errorMessages: {
    500: { message: "Не удалось загрузить сообщения", type: "danger" },
  },
};
